'use client';

import { useState } from 'react';
import Button from './ui/Button';
import Dialog from './ui/Dialog';
import IconButton, { CloseIcon } from './ui/IconButton';
import { CONTACT_EMAIL, PERKY_FACTS } from '@/app/data/content';

const Perky = () => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="peky"
      className="tkv-surface-dark tkv-gutter tkv-section-y flex flex-wrap items-start gap-[clamp(28px,5vw,56px)]"
    >
      <div className="flex min-w-0 flex-1 basis-[380px] flex-col items-start gap-[18px]">
        <span className="tkv-label">Kahviviikon takana</span>
        <h2 className="tkv-h2 max-w-[620px] text-cream">
          Pirkanmaan erikoiskahviyhdistys PErKY ry
        </h2>
        <p className="m-0 max-w-[620px] font-body text-[19px] italic leading-[1.5] text-coral">
          yhdistys, ei yritys — kaikki tehdään talkoilla
        </p>
        <p className="m-0 max-w-[620px] font-body text-[16px] leading-[1.65] text-cream">
          PErKY ry kokoaa yhteen pirkanmaalaiset kahvilat, paahtimot ja kahvista
          kiinnostuneet ihmiset. Yhdistys järjestää kahviviikon lisäksi
          cuppingeja, paahtimovierailuja ja tapaamisia pitkin vuotta.
        </p>
        <p className="m-0 max-w-[620px] font-body text-[16px] leading-[1.65] text-cream">
          Jäseneksi voi liittyä kuka tahansa — ammattilaisuutta ei vaadita,
          riittää että kahvi kiinnostaa.
        </p>
        <div className="mt-1 flex flex-wrap gap-3">
          <Button variant="coral" onClick={() => setOpen(true)}>
            Liity jäseneksi
          </Button>
        </div>
      </div>

      <div className="flex shrink basis-[300px] grow-0 flex-col gap-[14px]">
        {PERKY_FACTS.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1 pb-[14px]"
            style={{ borderBottom: '1.5px solid var(--coffee-coral)' }}
          >
            <span className="font-display text-[27px] font-extrabold tracking-[-0.02em] text-cream">
              {fact.value}
            </span>
            <span className="font-body text-[14px] leading-[1.5] text-cream">
              {fact.label}
            </span>
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        label="Liity PErKY ry:n jäseneksi"
      >
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="m-0 font-display text-[24px] font-extrabold tracking-[-0.02em] text-coffee [text-wrap:pretty]">
              Liity PErKY ry:n jäseneksi
            </h3>
            <IconButton
              icon={CloseIcon}
              label="Sulje"
              size="sm"
              onClick={() => setOpen(false)}
            />
          </div>
          <p className="m-0 font-body text-[15px] leading-[1.6] text-coffee">
            Jäsenyys on avoin kaikille kahvista kiinnostuneille. Jäsenet
            pääsevät mukaan cuppingeihin, paahtimovierailuille ja kahviviikon
            järjestämistöihin.
          </p>
          <p className="m-0 font-body text-[15px] leading-[1.6] text-coffee">
            Laita viestiä osoitteeseen{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, niin
            kerromme lisää.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>Selvä</Button>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default Perky;
