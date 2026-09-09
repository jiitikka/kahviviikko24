'use client';

import { useState } from 'react';
import { CONTACT_EMAIL_DISPLAY, FAQS } from '@/app/data/content';

const Faq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="ukk"
      className="tkv-gutter tkv-section-y flex flex-wrap items-start gap-x-[clamp(40px,6vw,88px)] gap-y-5 border-t-rule border-coffee bg-cream"
    >
      <div className="flex min-w-[260px] flex-1 basis-[300px] flex-col items-start gap-4">
        <span className="tkv-label">Usein kysytyt kysymykset</span>
        <h2 className="tkv-h2 text-coffee [text-wrap:pretty]">Hyvä kysymys.</h2>
        <p className="m-0 max-w-[34ch] font-body text-[16px] leading-[1.6] text-coffee [text-wrap:pretty]">
          Jos vastaus jäi puuttumaan, kysy suoraan: {CONTACT_EMAIL_DISPLAY}.
          Päivitämme listaa viikon lähestyessä.
        </p>
      </div>

      <div className="flex min-w-[280px] flex-1 basis-[520px] flex-col">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b-rule border-coffee">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-between border-none bg-transparent py-4 text-left font-display text-[17px] font-bold text-coffee"
              >
                {item.q}
                <span className="text-[20px] text-coral-text">
                  {isOpen ? '–' : '+'}
                </span>
              </button>
              {isOpen && (
                <p className="mx-0 mb-4 mt-0 font-body text-[15px] leading-[1.6] text-coffee">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
