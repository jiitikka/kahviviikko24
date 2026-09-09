'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';

type Item = { value: string; label: string };

type Props = {
  items: Item[];
  active: string;
  onChange: (value: string) => void;
};

const Tabs = ({ items, active, onChange }: Props) => {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const el = refs.current[active];
    if (!el) return;

    const update = () => setBar({ left: el.offsetLeft, width: el.offsetWidth });
    update();

    if (typeof ResizeObserver === 'undefined' || !el.parentNode) return;
    const ro = new ResizeObserver(update);
    ro.observe(el.parentNode as Element);
    return () => ro.disconnect();
  }, [active, items]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        gap: 4,
        borderBottom: '1.5px solid var(--coffee-black)',
        fontFamily: 'var(--font-display)',
      }}
    >
      {items.map((it) => (
        <button
          key={it.value}
          ref={(el) => {
            refs.current[it.value] = el;
          }}
          onClick={() => onChange(it.value)}
          aria-pressed={active === it.value}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: '-0.01em',
            color: active === it.value ? 'var(--coffee-black)' : '#8a7f78',
            transition: 'var(--transition-interactive)',
          }}
        >
          {it.label}
        </button>
      ))}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -1.5,
          height: 2.5,
          background: 'var(--coffee-coral)',
          left: bar ? bar.left : 0,
          width: bar ? bar.width : 0,
          opacity: bar ? 1 : 0,
          transition:
            'left var(--duration-slide) var(--ease-slide), width var(--duration-slide) var(--ease-slide), opacity var(--duration-fast) var(--ease-default)',
        }}
      />
    </div>
  );
};

export default Tabs;
