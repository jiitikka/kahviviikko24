'use client';

import React from 'react';

const sizes = { sm: 32, md: 40, lg: 48 };

const variants = {
  outline: {
    background: 'transparent',
    border: '1.5px solid var(--coffee-black)',
    color: 'var(--coffee-black)',
  },
  solid: {
    background: 'var(--coffee-black)',
    border: '1.5px solid var(--coffee-black)',
    color: 'var(--coffee-cream)',
  },
  coral: {
    background: 'var(--coffee-coral)',
    border: '1.5px solid var(--coffee-black)',
    color: 'var(--coffee-black)',
  },
};

type Props = {
  icon: React.ReactNode;
  label: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({
  icon,
  label,
  variant = 'outline',
  size = 'md',
  onClick,
}: Props) => {
  const [hover, setHover] = React.useState(false);
  const dim = sizes[size];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: dim,
        height: dim,
        borderRadius: 'var(--radius-sm)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: hover ? 0.85 : 1,
        transition: 'opacity .12s ease',
        ...variants[variant],
      }}
    >
      {icon}
    </button>
  );
};

export const CloseIcon = (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M2.5 2.5 L12.5 12.5" />
    <path d="M12.5 2.5 L2.5 12.5" />
  </svg>
);

export default IconButton;
