'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Button from '../ui/Button';

const Check = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 6.5l2.6 2.6L10 3.5"
      stroke="#1A1614"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CategoryProps = {
  title: string;
  description: string;
  checked: boolean;
  onToggle?: () => void;
};

const Category = ({ title, description, checked, onToggle }: CategoryProps) => {
  const body = (
    <>
      <span
        className="mt-[3px] flex h-[17px] w-[17px] flex-none items-center justify-center border-rule border-coffee"
        style={{
          background: onToggle
            ? checked
              ? 'var(--coffee-coral)'
              : 'transparent'
            : 'var(--coffee-black)',
          opacity: onToggle ? 1 : 0.45,
        }}
      >
        {onToggle && checked && <Check />}
      </span>
      <span className="flex flex-col gap-[3px]">
        <span className="font-display text-[15px] font-extrabold text-coffee">
          {title}
        </span>
        <span className="font-body text-[14px] leading-[1.55] text-coffee opacity-75">
          {description}
        </span>
      </span>
    </>
  );

  if (!onToggle) {
    return <div className="flex items-start gap-3 py-[10px]">{body}</div>;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="flex cursor-pointer items-start gap-3 border-none bg-transparent py-[10px] text-left"
    >
      {body}
    </button>
  );
};

type Props = {
  settingsOpen: boolean;
  stats: boolean;
  behavior: boolean;
  onOpenSettings: () => void;
  onToggleStats: () => void;
  onToggleBehavior: () => void;
  onAcceptAll: () => void;
  onReject: () => void;
  onSave: () => void;
};

const ConsentBanner = ({
  settingsOpen,
  stats,
  behavior,
  onOpenSettings,
  onToggleStats,
  onToggleBehavior,
  onAcceptAll,
  onReject,
  onSave,
}: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // The banner is the first thing a visitor has to deal with, and it sits at
  // the end of the document — without this it is 60+ tab stops away.
  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => lastFocused.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center p-[clamp(12px,3vw,24px)]">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby="consent-title"
        tabIndex={-1}
        className="pointer-events-auto flex max-h-[78vh] w-full max-w-[720px] flex-col gap-[14px] overflow-auto rounded-[14px] border-rule border-coffee bg-cream p-[clamp(18px,3vw,24px)]"
        style={{ boxShadow: '0 14px 40px rgba(26, 22, 20, 0.28)' }}
      >
        <div className="flex items-start gap-3">
          <Image
            src="/brand/papu-musta-halkeama.svg"
            alt=""
            width={22}
            height={22}
            className="mt-[2px] w-[22px] flex-none"
          />
          <div className="flex min-w-0 flex-col gap-2">
            <h2
              id="consent-title"
              className="m-0 font-display text-[clamp(18px,3vw,21px)] font-extrabold tracking-[-0.02em] text-coffee"
            >
              Evästeet ja kävijätiedot
            </h2>
            <p className="m-0 font-body text-[15px] leading-[1.6] text-coffee [text-wrap:pretty]">
              Käytämme välttämättömiä evästeitä sivuston toimintaan.
              Suostumuksellasi käytämme myös tilasto- ja analytiikkatyökaluja
              (Umami, Hotjar ja Microsoft Clarity) sivuston kehittämiseen. Voit
              muuttaa valintaasi milloin tahansa.
            </p>
            <Link
              href="/tietosuojaseloste"
              className="self-start font-body text-[14px]"
            >
              Lue tietosuojaseloste
            </Link>
          </div>
        </div>

        {settingsOpen && (
          <div className="flex flex-col gap-[2px] border-y-rule border-coffee py-3">
            <Category
              title="Välttämättömät"
              description="Sivuston toiminta ja evästevalintasi muistaminen. Aina käytössä."
              checked
            />
            <Category
              title="Tilastointi"
              description="Umami: kävijämäärät ja se, mitkä sivut kiinnostavat. Evästeetön ja itse ylläpidetty."
              checked={stats}
              onToggle={onToggleStats}
            />
            <Category
              title="Käytön analytiikka"
              description="Hotjar ja Microsoft Clarity: klikkaukset ja lämpökartat, joilla parannamme sivustoa."
              checked={behavior}
              onToggle={onToggleBehavior}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-[10px]">
          <Button variant="coral" onClick={onAcceptAll}>
            Hyväksy kaikki
          </Button>
          <Button variant="outline" onClick={onReject}>
            Vain välttämättömät
          </Button>
          {settingsOpen ? (
            <Button variant="outline" onClick={onSave}>
              Tallenna valinnat
            </Button>
          ) : (
            <button
              type="button"
              onClick={onOpenSettings}
              className="ml-auto cursor-pointer border-none bg-transparent py-2 font-body text-[14px] text-coffee underline"
            >
              Asetukset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
