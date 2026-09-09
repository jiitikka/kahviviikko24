'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from './ui/Button';
import { useTicketDialog } from './TicketDialogProvider';

const StampCard = () => {
  const [stamps, setStamps] = useState(0);

  const hint =
    stamps >= 10
      ? 'Kortti täynnä — kaksi ilmaista kahvia!'
      : stamps >= 5
        ? 'Viisi leimaa: seuraava kahvi on ilmainen.'
        : 'Kokeile: leimaa kortti hiirellä.';

  return (
    <div
      onMouseLeave={() => setStamps(0)}
      aria-hidden="true"
      className="box-border flex w-full max-w-[380px] flex-col gap-4 rounded-2xl border-rule border-coffee bg-cream p-[clamp(18px,3vw,24px)]"
      style={{
        boxShadow: '10px 12px 0 var(--coffee-coral)',
        transform: 'rotate(-3deg)',
      }}
    >
      <div className="flex items-start justify-between gap-3 border-b-rule border-dashed border-coffee pb-3">
        <span className="flex flex-col gap-[2px]">
          <span className="font-display text-[19px] font-extrabold tracking-[-0.02em] text-coffee">
            Epäkantiskortti
          </span>
          <span className="font-body text-[13px] text-coffee opacity-70">
            Joka viides kahvi ilmaiseksi
          </span>
        </span>
        <Image
          src="/brand/papu-musta-halkeama.svg"
          alt=""
          width={24}
          height={24}
          className="w-6 flex-none"
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, i) => {
          const stamped = i < stamps;
          const free = i === 4 || i === 9;
          return (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onMouseEnter={() => setStamps(i + 1)}
              onClick={() => setStamps(i + 1)}
              style={{
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                cursor: 'pointer',
                borderRadius: '50%',
                border: free
                  ? '1.5px solid var(--coffee-black)'
                  : '1.5px dashed var(--coffee-black)',
                background: stamped
                  ? 'var(--coffee-coral)'
                  : free
                    ? 'var(--coffee-coral-pale)'
                    : 'transparent',
                transition: 'background 160ms ease, transform 160ms ease',
                transform: stamped ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {stamped ? (
                <Image
                  src="/brand/papu-yksivari-musta.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-[60%]"
                />
              ) : (
                <span className="font-display text-[13px] font-bold text-coffee opacity-70">
                  {i + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t-rule border-dashed border-coffee pt-3">
        <span className="font-body text-[13px] leading-[1.5] text-coffee opacity-70">
          {hint}
        </span>
        <span className="whitespace-nowrap font-display text-[13px] font-extrabold uppercase tracking-[0.08em] text-coral-text">
          {stamps}/10
        </span>
      </div>
    </div>
  );
};

const Hero = () => {
  const ticket = useTicketDialog();

  return (
    <section className="tkv-gutter relative flex flex-wrap items-center gap-[clamp(36px,5vw,64px)] overflow-hidden pb-[clamp(52px,10vw,88px)] pt-[clamp(56px,11vw,96px)]">
      <Image
        src="/brand/blob-left.png"
        alt=""
        width={320}
        height={320}
        priority
        className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[min(30vw,320px)]"
      />
      <Image
        src="/brand/blob-right.png"
        alt=""
        width={300}
        height={300}
        priority
        className="pointer-events-none absolute top-0 z-0 h-auto w-[min(28vw,300px)]"
        style={{ right: -60 }}
      />

      <div className="flex min-w-0 flex-1 basis-[520px] flex-col gap-5">
        <div
          className="relative z-[1] self-start bg-coral-pale px-4 py-2 font-display text-[12px] font-medium uppercase tracking-[0.16em] text-coffee"
          style={{ borderRadius: '32px 20px 30px 22px / 18px 32px 20px 30px' }}
        >
          1.–11.10.2026 · Tampere
        </div>

        <h1 className="relative z-[1] m-0 max-w-[760px] font-display text-[clamp(38px,9vw,84px)] font-extrabold leading-[0.98] tracking-[-0.02em] text-coffee">
          Tampereen kahviviikko
        </h1>

        <p
          className="relative z-[1] mx-0 mb-0 mt-1 self-start py-[2px] font-body text-[clamp(19px,4.6vw,24px)] italic text-coffee"
          style={{ borderBottom: '2.5px solid var(--coffee-coral)' }}
        >
          parempaa kahvia kansalle
        </p>

        <p className="relative z-[1] mx-0 mb-0 mt-2 max-w-[520px] font-body text-[17px] leading-[1.65] text-coffee">
          18 kahvilaa: osa Tampereen sydämessä, osa ympäri Pirkanmaata.
          Parempaa kahvia, kahviaiheisia tapahtumia ja epäkantiskortti, joka
          palkitsee eri kahviloiden kiertämisestä.
        </p>

        <div className="relative z-[1] mt-4 flex flex-wrap gap-[14px]">
          <Button
            variant="coral"
            size="lg"
            onClick={() =>
              document
                .getElementById('ohjelma')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Katso kahviviikon ohjelma
          </Button>
          <Button variant="outline" size="lg" onClick={ticket.open}>
            Mistä epäkantiskortin saa?
          </Button>
        </div>
      </div>

      <div className="relative z-[1] hidden min-w-[280px] shrink basis-[380px] grow-0 justify-center min-[820px]:flex">
        <StampCard />
      </div>
    </section>
  );
};

export default Hero;
