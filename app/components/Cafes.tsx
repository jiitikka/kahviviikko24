'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CAFES,
  DISTRICTS,
  type A11yFeature,
  type Cafe,
  type District,
} from '@/app/data/cafes';
import { SHOW_ADVANCED_FILTERS } from '@/app/config';

const CafeMap = dynamic(() => import('./CafeMap'), { ssr: false });

/** Organic tile shapes, cycled across the grid. */
const SHAPES = [
  '58% 42% 47% 53% / 52% 46% 54% 48%',
  '44% 56% 62% 38% / 47% 58% 42% 53%',
  '52% 48% 38% 62% / 60% 44% 56% 40%',
  '63% 37% 55% 45% / 42% 55% 45% 58%',
  '47% 53% 44% 56% / 55% 40% 60% 45%',
];

const A11Y_OPTS: { key: A11yFeature; label: string }[] = [
  { key: 'step', label: 'Esteetön käynti' },
  { key: 'wc', label: 'Saavutettava wc' },
  { key: 'space', label: 'Tilaa pyörätuolille' },
];

type Feature = A11yFeature | 'near' | 'open';

const isOpenNow = (cafe: Cafe) => {
  if (!cafe.hours) return false;
  const now = new Date();
  const slot = cafe.hours[(now.getDay() + 6) % 7];
  if (!slot) return false;
  const t = now.getHours() + now.getMinutes() / 60;
  return t >= slot[0] && t < slot[1];
};

const distanceKm = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) => {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

const chipStyle = (active: boolean, mobile: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-display)',
  fontWeight: active ? 700 : 500,
  fontSize: 13,
  color: 'var(--coffee-black)',
  background: active ? 'var(--coffee-coral)' : 'transparent',
  border: '1.5px solid var(--coffee-black)',
  borderRadius: 999,
  padding: mobile ? '9px 10px' : '7px 14px',
  minHeight: 36,
  cursor: 'pointer',
  transition: 'background 140ms ease',
  ...(mobile
    ? { flex: '1 1 140px', minWidth: 0, justifyContent: 'center' }
    : {}),
});

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  padding: '9px 12px',
  minHeight: 40,
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: 'var(--coffee-black)',
};

const boxStyle = (active: boolean): React.CSSProperties => ({
  width: 15,
  height: 15,
  flexShrink: 0,
  border: '1.5px solid var(--coffee-black)',
  background: active ? 'var(--coffee-coral)' : 'transparent',
  transition: 'background 120ms ease',
});

const ChevronIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 11 11"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M2.5 4 5.5 7.2 8.5 4" />
  </svg>
);

const NearIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M12.5 1.5 8.6 12.4 7 8.2 2.8 6.6Z" />
  </svg>
);

const Cafes = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [districts, setDistricts] = useState<District[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [geo, setGeo] = useState<{ lat: number; lng: number } | null>(null);
  const [geoNote, setGeoNote] = useState('');
  const [menu, setMenu] = useState<'district' | 'a11y' | null>(null);
  const [menuSide, setMenuSide] = useState<'left' | 'right'>('left');
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const mobile = !isDesktop;

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 820);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[aria-expanded]') && !target.closest('[data-menu-panel]')) {
        setMenu(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      setMenu(null);
      triggerRef.current?.focus();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menu]);

  const requestGeo = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoNote('Selaimesi ei tue sijaintia.');
      return;
    }
    setGeoNote('Haetaan sijaintia…');
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setGeo({ lat: p.coords.latitude, lng: p.coords.longitude });
        setFeatures((f) => (f.includes('near') ? f : [...f, 'near']));
        setGeoNote('');
      },
      () =>
        setGeoNote(
          'Sijaintia ei saatu — voit suodattaa kaupunginosan mukaan.'
        ),
      { timeout: 8000 }
    );
  }, []);

  const toggleFeature = (key: Feature) => {
    if (key === 'near' && !features.includes('near')) {
      requestGeo();
      return;
    }
    setFeatures((f) =>
      f.includes(key) ? f.filter((x) => x !== key) : [...f, key]
    );
  };

  const toggleDistrict = (d: District) =>
    setDistricts((list) =>
      list.includes(d) ? list.filter((x) => x !== d) : [...list, d]
    );

  const openMenu = (which: 'district' | 'a11y', el: HTMLButtonElement) => {
    const rect = el.getBoundingClientRect();
    const width = Math.min(280, window.innerWidth - 40);
    triggerRef.current = el;
    setMenuSide(rect.left + width <= window.innerWidth - 12 ? 'left' : 'right');
    setMenu((m) => (m === which ? null : which));
  };

  const filtered = useMemo(() => {
    let list = CAFES.map((cafe, index) => ({
      cafe,
      index,
      dist: undefined as number | undefined,
    })).sort((a, b) => a.cafe.name.localeCompare(b.cafe.name, 'fi'));

    if (districts.length) {
      list = list.filter(({ cafe }) => districts.includes(cafe.district));
    }
    for (const key of ['step', 'wc', 'space'] as A11yFeature[]) {
      if (features.includes(key)) {
        list = list.filter(({ cafe }) => cafe.a11y.includes(key));
      }
    }
    if (features.includes('open')) {
      list = list.filter(({ cafe }) => isOpenNow(cafe));
    }
    if (features.includes('near') && geo) {
      list = list
        .map((o) => ({
          ...o,
          dist: distanceKm(geo, { lat: o.cafe.lat, lng: o.cafe.lng }),
        }))
        .sort((a, b) => (a.dist ?? 0) - (b.dist ?? 0));
    }
    return list;
  }, [districts, features, geo]);

  const anyFilter = districts.length > 0 || features.length > 0;
  const districtCount =
    districts.length + (features.includes('near') ? 1 : 0);
  const a11yCount = A11Y_OPTS.filter((o) => features.includes(o.key)).length;

  const emptyMessage = filtered.length
    ? ''
    : features.includes('open') && !districts.length && features.length === 1
      ? 'Yksikään kahvila ei ole juuri nyt auki'
      : 'Yksikään kahvila ei vastaa valittuja suodattimia';

  const menuPanelStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    zIndex: 1000,
    left: menuSide === 'right' ? 'auto' : 0,
    right: menuSide === 'right' ? 0 : 'auto',
    minWidth: 230,
    maxWidth: 'min(280px, calc(100vw - 40px))',
    maxHeight: 'min(60vh, 420px)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--coffee-cream)',
    border: '1.5px solid var(--coffee-black)',
    borderRadius: 'var(--radius-sm)',
    padding: '4px 0',
    overflow: 'hidden auto',
  };

  const menuButtonStyle = (
    active: boolean,
    open: boolean
  ): React.CSSProperties => ({
    ...chipStyle(active, mobile),
    width: mobile ? '100%' : 'auto',
    display: mobile ? 'flex' : 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: active
      ? 'var(--coffee-coral)'
      : open
        ? 'var(--coffee-cream)'
        : 'transparent',
  });

  const filterSlotStyle: React.CSSProperties = mobile
    ? { position: 'relative', flex: '1 1 140px', minWidth: 0, display: 'flex' }
    : { position: 'relative' };

  return (
    <section
      id="kahvilat"
      className="tkv-gutter tkv-section-y flex flex-col gap-5 border-t-rule border-coffee bg-cream"
    >
      <div className="flex flex-wrap items-end justify-between gap-[clamp(20px,4vw,48px)]">
        <div className="flex min-w-0 flex-1 basis-[420px] flex-col items-start gap-5">
          <span className="tkv-label">Mukana olevat kahvilat</span>
          <h2 className="tkv-h2 text-coffee">
            Epäkantiskortti käy näissä kahviloissa
          </h2>
          <p className="m-0 max-w-[640px] font-body text-[16px] leading-[1.65] text-coffee">
            Kahviloita on ympäri kantakaupunkia — keskustassa, Tammelassa,
            Pyynikillä ja Pispalassa — ja mukaan mahtuu myös kahviloita
            Kangasalta ja Akaan Viialasta. Lista täydentyy syyskuun aikana.
          </p>

          <div
            ref={wrapRef}
            style={
              mobile
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 10,
                    width: '100%',
                    marginTop: 4,
                  }
                : {
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    flexWrap: 'wrap',
                  }
            }
          >
            <div
              style={
                mobile
                  ? {
                      order: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      width: '100%',
                    }
                  : {
                      display: 'flex',
                      gap: 8,
                      flexWrap: 'wrap',
                      justifyContent: 'flex-end',
                    }
              }
            >
              <span style={filterSlotStyle}>
                <button
                  onClick={(e) => openMenu('district', e.currentTarget)}
                  aria-expanded={menu === 'district'}
                  style={menuButtonStyle(districtCount > 0, menu === 'district')}
                >
                  {districtCount ? `Sijainti (${districtCount})` : 'Sijainti'}
                  <ChevronIcon />
                </button>
                {menu === 'district' && (
                  <span
                    data-menu-panel=""
                    role="group"
                    aria-label="Rajaa sijainnin mukaan"
                    style={menuPanelStyle}
                  >
                    <button
                      onClick={() => toggleFeature('near')}
                      aria-pressed={features.includes('near')}
                      style={{
                        ...rowStyle,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: features.includes('near')
                          ? 'var(--coffee-coral-deep)'
                          : 'var(--coffee-black)',
                        background: features.includes('near')
                          ? 'var(--coffee-coral)'
                          : 'transparent',
                        borderBottom: '1.5px solid var(--coffee-black)',
                      }}
                    >
                      <NearIcon />
                      Lähellä minua
                    </button>
                    {DISTRICTS.map((d) => (
                      <button
                        key={d}
                        onClick={() => toggleDistrict(d)}
                        aria-pressed={districts.includes(d)}
                        style={rowStyle}
                      >
                        <span style={boxStyle(districts.includes(d))} />
                        {d}
                      </button>
                    ))}
                  </span>
                )}
              </span>

              {SHOW_ADVANCED_FILTERS && (
                <>
                  <span style={filterSlotStyle}>
                    <button
                      onClick={(e) => openMenu('a11y', e.currentTarget)}
                      aria-expanded={menu === 'a11y'}
                      style={menuButtonStyle(a11yCount > 0, menu === 'a11y')}
                    >
                      {a11yCount
                        ? `Saavutettavuus (${a11yCount})`
                        : 'Saavutettavuus'}
                      <ChevronIcon />
                    </button>
                    {menu === 'a11y' && (
                      <span
                        data-menu-panel=""
                        role="group"
                        aria-label="Rajaa saavutettavuuden mukaan"
                        style={menuPanelStyle}
                      >
                        {A11Y_OPTS.map((o) => (
                          <button
                            key={o.key}
                            onClick={() => toggleFeature(o.key)}
                            aria-pressed={features.includes(o.key)}
                            style={rowStyle}
                          >
                            <span style={boxStyle(features.includes(o.key))} />
                            {o.label}
                          </button>
                        ))}
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => toggleFeature('open')}
                    aria-pressed={features.includes('open')}
                    style={chipStyle(features.includes('open'), mobile)}
                  >
                    Auki nyt
                  </button>
                </>
              )}
            </div>

            {/* On desktop the count sits between the filters and the view
                toggle, centred in whatever space is left. */}
            <span
              style={
                mobile
                  ? { order: 3, fontSize: 14, textAlign: 'center' }
                  : { flex: '1 1 auto', fontSize: 14, textAlign: 'center' }
              }
            >
              {`Näytetään ${filtered.length} / ${CAFES.length} kahvilaa`}
            </span>

            {geoNote && (
              <p
                style={{
                  order: mobile ? 4 : 'unset',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: 'var(--coffee-coral-text)',
                }}
              >
                {geoNote}
              </p>
            )}

            <div
              style={
                mobile
                  ? {
                      order: 1,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 10,
                      alignItems: 'center',
                      width: '100%',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--coffee-black)',
                    }
                  : {
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 14,
                      alignItems: 'baseline',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--coffee-black)',
                    }
              }
            >
              {anyFilter && (
                <button
                  onClick={() => {
                    setDistricts([]);
                    setFeatures([]);
                  }}
                  className="cursor-pointer border-none bg-transparent p-0 font-display text-[14px] font-bold text-coral-text underline"
                >
                  Tyhjennä suodattimet
                </button>
              )}
              <span
                style={
                  mobile
                    ? { display: 'flex', gap: 8, width: '100%' }
                    : { marginLeft: 'auto', display: 'flex', gap: 8 }
                }
              >
                <button
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  style={chipStyle(view === 'grid', mobile)}
                >
                  Ruudukko
                </button>
                <button
                  onClick={() => setView('map')}
                  aria-pressed={view === 'map'}
                  style={chipStyle(view === 'map', mobile)}
                >
                  Kartta
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {view === 'map' && (
        <div className="mt-2 h-[clamp(320px,52vh,520px)] w-full">
          <CafeMap cafes={filtered.map(({ cafe }) => cafe)} />
        </div>
      )}

      {emptyMessage && (
        <p className="m-0 mt-2 font-display text-[17px] font-bold leading-[1.4] text-coffee">
          {emptyMessage}
        </p>
      )}

      {view === 'grid' && (
        <div className="mt-2 flex flex-wrap justify-center gap-[clamp(16px,3vw,30px)]">
          {filtered.map(({ cafe, index, dist }) => (
            <a
              key={cafe.name}
              href={cafe.site}
              target="_blank"
              rel="noopener"
              title={cafe.name}
              className="tkv-cafe-tile flex cursor-pointer flex-col items-center gap-[10px] no-underline"
            >
              <span
                className="tkv-cafe-blob flex flex-shrink-0 items-center justify-center"
                style={{
                  background: cafe.fill,
                  border: '1.5px solid var(--coffee-black)',
                  borderRadius: SHAPES[index % SHAPES.length],
                  transition:
                    'border-radius 400ms cubic-bezier(.4,0,.2,1), background 200ms ease',
                }}
              >
                {/* Logos are not square: cap the height and let the width flex.
                    Both are percentages of the blob so they track its size. */}
                <span
                  style={{
                    width: '78%',
                    height: '52%',
                    flexShrink: 0,
                    pointerEvents: 'none',
                    backgroundImage: `url("${cafe.logo}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
              </span>
              <span className="text-center font-display text-[13px] font-bold leading-[1.3] text-coffee [text-wrap:pretty]">
                {cafe.name}
              </span>
              {typeof dist === 'number' && (
                <span className="font-body text-[12px] text-coral-text">
                  {dist < 1
                    ? `${Math.round(dist * 1000)} m`
                    : `${dist.toFixed(1)} km`}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cafes;
