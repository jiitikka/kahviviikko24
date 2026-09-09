'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_EMAIL_DISPLAY, NAV_LINKS } from '@/app/data/content';
import { SHOW_PERKY } from '@/app/config';
import { useConsent } from './consent/ConsentProvider';

const dim = 'rgba(247, 243, 238, 0.62)';

const Footer = () => {
  const consent = useConsent();

  return (
    <footer className="tkv-surface-dark tkv-gutter flex flex-col gap-[clamp(28px,5vw,44px)] pb-[clamp(24px,4vw,32px)] pt-[clamp(44px,8vw,72px)] font-body text-[15px] text-cream">
      <div className="flex flex-wrap items-start gap-[clamp(28px,5vw,56px)]">
        <div className="flex min-w-[150px] shrink basis-[200px] grow-0 flex-col gap-[14px]">
          <span className="font-display text-[17px] font-extrabold tracking-[-0.01em] text-cream">
            Kahviviikko
          </span>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="no-underline">
                {l.label}
              </a>
            ))}
            {SHOW_PERKY && (
              <a href="#peky" className="no-underline">
                Tule mukaan
              </a>
            )}
          </div>
        </div>

        <div className="flex min-w-[200px] shrink basis-[340px] grow-0 flex-col gap-[14px]">
          <span className="font-display text-[17px] font-extrabold tracking-[-0.01em] text-cream">
            Yhteystiedot
          </span>
          <div className="flex flex-col gap-2">
            <span className="[overflow-wrap:anywhere]">
              {CONTACT_EMAIL_DISPLAY}
            </span>
          </div>
        </div>

        <div className="flex min-w-[130px] shrink basis-[160px] grow-0 flex-col gap-[14px]">
          <span className="font-display text-[17px] font-extrabold tracking-[-0.01em] text-cream">
            Seuraa
          </span>
          <div className="flex flex-col gap-2">
            <a
              href="https://instagram.com/tampereenkahviviikko"
              className="no-underline"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/tampereenkahviviikko"
              className="no-underline"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="flex min-w-[200px] flex-1 basis-[220px] flex-col items-end gap-[6px]">
          <a
            href="#"
            aria-label="Takaisin sivun alkuun"
            className="flex items-center gap-[10px] no-underline"
          >
            <Image
              src="/brand/papu-yksivari-valkoinen.svg"
              alt=""
              width={26}
              height={26}
              className="w-[26px] flex-none"
            />
            <span className="whitespace-nowrap font-display text-[clamp(16px,2vw,19px)] font-extrabold leading-[1.2] tracking-[-0.02em] text-cream">
              Tampereen kahviviikko
            </span>
          </a>
          <span className="text-[14px]" style={{ color: 'rgba(247, 243, 238, 0.72)' }}>
            1.–11.10.2026
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 pt-[clamp(18px,3vw,24px)] text-[13px]"
        style={{ borderTop: '1px solid rgba(247, 243, 238, 0.18)', color: dim }}
      >
        <span>© 2026 Pirkanmaan erikoiskahviyhdistys ry.</span>
        <span className="flex flex-wrap gap-[18px]">
          <Link href="/tietosuojaseloste" style={{ color: dim }}>
            Tietosuojaseloste
          </Link>
          <button
            type="button"
            onClick={consent.openSettings}
            className="cursor-pointer border-none bg-transparent p-0 font-body text-[13px] underline"
            style={{ color: dim }}
          >
            Evästeasetukset
          </button>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
