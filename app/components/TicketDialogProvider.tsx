'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import Dialog from './ui/Dialog';
import Button from './ui/Button';
import IconButton, { CloseIcon } from './ui/IconButton';

const TicketDialogContext = createContext<{ open: () => void }>({
  open: () => {},
});

export const useTicketDialog = () => useContext(TicketDialogContext);

const TicketDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <TicketDialogContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog open={open} onClose={close} label="Epäkantiskortti">
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="m-0 font-display text-[24px] font-extrabold tracking-[-0.02em] text-coffee [text-wrap:pretty]">
              Kortin saat mistä tahansa mukana olevasta kahvilasta
            </h3>
            <IconButton
              icon={CloseIcon}
              label="Sulje"
              size="sm"
              onClick={close}
            />
          </div>
          <p className="m-0 font-body text-[15px] leading-[1.6] text-coffee">
            Käy missä tahansa mukana olevassa kahvilassa ja kysy korttia
            tiskiltä ensimmäisen ostoksesi yhteydessä — saat sen ilmaiseksi
            mukaan ja samalla ensimmäisen leiman.
          </p>
          <p className="m-0 font-body text-[15px] leading-[1.6] text-coffee">
            Kortteja on tarjolla Kahviviikon aikana niin kauan kuin niitä
            riittää.
          </p>
          <div className="flex justify-end">
            <Button onClick={close}>Selvä</Button>
          </div>
        </div>
      </Dialog>
    </TicketDialogContext.Provider>
  );
};

export default TicketDialogProvider;
