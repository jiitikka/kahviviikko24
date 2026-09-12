import { PARTNERS } from '@/app/data/content';

const Partners = () => (
  <section className="tkv-gutter flex flex-wrap items-center gap-x-[clamp(32px,4vw,64px)] gap-y-6 border-t-rule border-coffee bg-white py-[clamp(40px,8vw,56px)]">
    <div className="flex min-w-[220px] shrink basis-[280px] grow-0 flex-col items-start gap-4">
      <span className="tkv-label">Yhteistyössä</span>
      <h2 className="tkv-h2 text-coffee">Kumppanit</h2>
      <p className="m-0 max-w-[620px] font-body text-[16px] leading-[1.65] text-coffee">
        Kahviviikon mahdollistavat viisi tamperelaista pienpaahtimoa: Kahwe,
        Mokkamestarit, Pikkupaahtimo Pipa, Pirkanmaan paahtimo ja Siemasu sekä
        kahviklubi Kaffekaveri.
      </p>
    </div>

    {/* The gap was tuned when there were five logos; six no longer fit on one
        desktop row without it coming in a little. */}
    <div className="flex min-w-[260px] flex-1 basis-[420px] flex-wrap items-center justify-start gap-[clamp(20px,2.6vw,40px)] min-[820px]:justify-end">
      {PARTNERS.map((partner) => (
        <a
          key={partner.name}
          href={partner.url}
          target="_blank"
          rel="noopener"
          title={partner.name}
          aria-label={partner.name}
          className="tkv-partner-logo flex min-w-0 shrink basis-auto grow-0 items-center justify-center no-underline"
        >
          {/* The box locks to the logo's own aspect ratio so a wide wordmark
              does not sit in a square with dead space around it. */}
          <span
            style={{
              width: Math.round(partner.h * partner.ratio),
              maxWidth: '100%',
              aspectRatio: String(partner.ratio),
              flexShrink: 1,
              minWidth: 0,
              backgroundImage: `url("${partner.logo}")`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </a>
      ))}
    </div>
  </section>
);

export default Partners;
