'use client';

import Image from 'next/image';
import { useState } from 'react';
import { NAV_LINKS } from '@/app/data/content';
import { SHOW_PERKY } from '@/app/config';

const links = SHOW_PERKY
  ? [...NAV_LINKS, { href: '#peky', label: 'PErKY ry' }, { href: '#ukk', label: 'UKK' }]
  : [...NAV_LINKS, { href: '#ukk', label: 'UKK' }];

const bar = (transform: string): React.CSSProperties => ({
  display: 'block',
  width: 20,
  height: 1.5,
  background: 'var(--coffee-black)',
  transition: 'transform 220ms cubic-bezier(.4,0,.2,1), opacity 160ms ease',
  transform,
});

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b-rule border-coffee bg-cream">
      <div className="tkv-gutter flex items-center justify-between gap-4 py-4">
        <a
          href="#"
          aria-label="Takaisin sivun alkuun"
          className="tkv-link-plain flex min-w-0 items-center gap-[10px]"
        >
          <Image
            src="/brand/papu-musta-halkeama.svg"
            alt="Tampereen kahviviikko"
            width={24}
            height={24}
            className="w-6 flex-shrink-0"
          />
          <span className="truncate whitespace-nowrap font-display text-[clamp(15px,3.6vw,17px)] font-extrabold tracking-[-0.02em] text-coffee">
            Tampereen kahviviikko
          </span>
        </a>

        <nav className="hidden gap-[30px] font-display text-[14px] font-bold min-[820px]:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="tkv-link-plain">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Valikko"
          aria-expanded={open}
          className="flex h-[46px] w-[46px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-sm border-rule border-coffee bg-transparent p-0 min-[820px]:hidden"
        >
          <span style={bar(open ? 'translateY(6.5px) rotate(45deg)' : 'none')} />
          <span style={{ ...bar('none'), opacity: open ? 0 : 1 }} />
          <span style={bar(open ? 'translateY(-6.5px) rotate(-45deg)' : 'none')} />
        </button>
      </div>

      <nav
        className="overflow-hidden min-[820px]:hidden"
        style={{
          maxHeight: open ? links.length * 56 + 16 : 0,
          opacity: open ? 1 : 0,
          transition:
            'max-height 300ms cubic-bezier(.4,0,.2,1), opacity 200ms ease',
        }}
      >
        <div className="tkv-gutter flex flex-col pb-4 font-display text-[17px] font-bold">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-t-rule border-coffee py-[14px] text-coffee no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;
