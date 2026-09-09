'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { ANALYTICS } from '@/app/config';
import ConsentBanner from './ConsentBanner';

const CONSENT_KEY = 'tkv-consent-v1';

export type Consent = { stats: boolean; behavior: boolean };

const listeners = new Set<() => void>();
/** Fallback for browsers that block storage, so a choice still applies. */
let memory: string | null = null;

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
};

const getSnapshot = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? memory;
  } catch {
    return memory;
  }
};

const write = (consent: Consent) => {
  const raw = JSON.stringify({ ...consent, ts: Date.now() });
  memory = raw;
  try {
    localStorage.setItem(CONSENT_KEY, raw);
  } catch {
    // Blocked storage: the in-memory snapshot carries the choice instead.
  }
  listeners.forEach((notify) => notify());
};

const loadScript = (src: string, attrs: Record<string, string> = {}) => {
  if (document.querySelector(`script[data-tkv="${src}"]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.setAttribute('data-tkv', src);
  Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
  document.head.appendChild(script);
};

const applyConsent = ({ stats, behavior }: Consent) => {
  const a = ANALYTICS;
  if (stats && a.umamiSrc && a.umamiWebsiteId) {
    loadScript(a.umamiSrc, { 'data-website-id': a.umamiWebsiteId });
  }
  if (behavior) {
    if (a.hotjarId) {
      (window as unknown as { _hjSettings: unknown })._hjSettings = {
        hjid: Number(a.hotjarId),
        hjsv: 6,
      };
      loadScript(`https://static.hotjar.com/c/hotjar-${a.hotjarId}.js?sv=6`);
    } else if (a.clarityId) {
      loadScript(`https://www.clarity.ms/tag/${a.clarityId}`);
    }
  }
};

const ConsentContext = createContext<{ openSettings: () => void }>({
  openSettings: () => {},
});

export const useConsent = () => useContext(ConsentContext);

const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const [reopened, setReopened] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>({ stats: false, behavior: false });

  const stored = useMemo<Consent | null>(() => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return { stats: !!parsed.stats, behavior: !!parsed.behavior };
    } catch {
      return null;
    }
  }, [raw]);

  useEffect(() => {
    if (stored) applyConsent(stored);
  }, [stored]);

  const commit = useCallback(
    (next: Consent) => {
      // A script already in the document cannot be unloaded, so a withdrawal
      // needs a reload for collection to stop immediately as the policy says.
      const revoked =
        (stored?.stats && !next.stats) || (stored?.behavior && !next.behavior);
      write(next);
      setReopened(false);
      setSettingsOpen(false);
      if (revoked) window.location.reload();
    },
    [stored]
  );

  const openSettings = useCallback(() => {
    setDraft({ stats: stored?.stats ?? false, behavior: stored?.behavior ?? false });
    setSettingsOpen(true);
    setReopened(true);
  }, [stored]);

  const value = useMemo(() => ({ openSettings }), [openSettings]);
  const bannerOpen = !stored || reopened;

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {bannerOpen && (
        <ConsentBanner
          settingsOpen={settingsOpen}
          stats={draft.stats}
          behavior={draft.behavior}
          onOpenSettings={() => setSettingsOpen(true)}
          onToggleStats={() => setDraft((d) => ({ ...d, stats: !d.stats }))}
          onToggleBehavior={() =>
            setDraft((d) => ({ ...d, behavior: !d.behavior }))
          }
          onAcceptAll={() => commit({ stats: true, behavior: true })}
          onReject={() => commit({ stats: false, behavior: false })}
          onSave={() => commit(draft)}
        />
      )}
    </ConsentContext.Provider>
  );
};

export default ConsentProvider;
