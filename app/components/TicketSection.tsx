'use client';

import Image from 'next/image';
import Button from './ui/Button';
import { CAFES } from '@/app/data/cafes';
import { TICKET_STEPS } from '@/app/data/content';
import { useTicketDialog } from './TicketDialogProvider';

const FreeDot = () => (
  <span
    className="block h-[34%] w-[34%] rounded-full"
    style={{ background: 'var(--coffee-coral-deep)' }}
  />
);

const TicketSection = () => {
  const ticket = useTicketDialog();

  return (
    <section
      id="epakantiskortti"
      className="tkv-surface-dark tkv-gutter tkv-section-y flex flex-wrap items-center justify-between gap-[clamp(32px,5vw,56px)]"
    >
      <div className="max-w-[460px] flex-1 basis-[400px]">
        <div className="tkv-label">Epäkantiskortti</div>
        <h2 className="tkv-h2 mb-4 mt-2 text-cream">
          Joka viides kahvi on ilmainen
        </h2>
        <p className="m-0 mb-[18px] font-body text-[15px] leading-[1.6] text-cream opacity-85">
          Kortin saa mukaan ilmaiseksi mistä tahansa mukana olevasta kahvilasta
          — ei etukäteisilmoittautumista, ei sovellusta.
        </p>
        <ol className="m-0 mb-[22px] flex list-none flex-col gap-2 p-0">
          {TICKET_STEPS.map((step) => (
            <li
              key={step}
              className="flex gap-[10px] font-body text-[15px] leading-[1.5] text-cream"
            >
              <span className="text-coral">→</span>
              {step}
            </li>
          ))}
        </ol>
        {/* Column below 820px so the button stretches to the full width. */}
        <div className="flex flex-col min-[820px]:block">
          <Button variant="coral" size="lg" onClick={ticket.open}>
            Mistä kortin saa?
          </Button>
        </div>
      </div>

      <div
        className="flex shrink basis-[400px] grow-0 flex-col gap-[14px] rounded-md border-rule border-coffee bg-cream p-[clamp(18px,3vw,26px)]"
        style={{ transform: 'rotate(-1.2deg)' }}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/brand/papu-musta-halkeama.svg"
            alt=""
            width={20}
            height={20}
            className="w-5 flex-shrink-0"
          />
          <span className="font-display text-[15px] font-extrabold tracking-[-0.02em] text-coffee">
            Epäkantiskortti
          </span>
          <span className="ml-auto font-display text-[10px] font-medium uppercase tracking-[0.16em] text-coral-text">
            2026
          </span>
        </div>

        <div className="font-body text-[13px] leading-[1.5] text-coffee">
          Joka viides kahvi on ilmainen
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }, (_, i) => {
            const isFree = (i + 1) % 5 === 0;
            const stamped = i < 3;
            return (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: isFree
                    ? '1.5px solid var(--coffee-coral-text)'
                    : '1.2px dashed var(--coffee-coral-text)',
                  background: isFree ? 'var(--coffee-coral)' : 'transparent',
                }}
              >
                {stamped && (
                  <Image
                    src="/brand/papu-yksivari-musta.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="h-[60%] w-[60%] object-contain"
                  />
                )}
                {isFree && <FreeDot />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-body text-[12px] leading-[1.4] text-coffee">
          <span
            className="flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full"
            style={{
              border: '1.5px solid var(--coffee-coral-text)',
              background: 'var(--coffee-coral)',
            }}
          >
            <FreeDot />
          </span>
          Ilmainen kahvijuoma
        </div>

        <div className="flex items-baseline justify-between border-t-rule border-coffee pt-[10px] font-body text-[11px] text-coffee">
          <span>{CAFES.length} kahvilaa</span>
          <span>Voimassa 18.10.2026 asti</span>
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
