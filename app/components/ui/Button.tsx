'use client';

import React from 'react';

type Variant = 'primary' | 'coral' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: '8px 14px', fontSize: 13 },
  md: { padding: '11px 20px', fontSize: 15 },
  lg: { padding: '14px 26px', fontSize: 16 },
};

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'var(--coffee-black)',
    color: 'var(--coffee-cream)',
    border: '1.5px solid var(--coffee-black)',
  },
  coral: {
    background: 'var(--coffee-coral)',
    color: 'var(--coffee-black)',
    border: '1.5px solid var(--coffee-black)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--coffee-black)',
    border: '1.5px solid var(--coffee-black)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--coffee-coral-text)',
    border: '1.5px solid transparent',
  },
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
}: Props) => {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'opacity .12s ease',
        opacity: disabled ? 0.4 : hover ? 0.85 : 1,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {children}
    </button>
  );
};

export default Button;
