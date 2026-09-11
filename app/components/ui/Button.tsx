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

// A disabled button drops its variant's colours entirely. Fading the coral
// fill to 40% left the label too faint to read, and there is only ever one
// thing being said — this cannot be used — so it should look the same
// whichever variant asked for it. Grey on cream clears 4.9:1.
const disabledStyle: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--coffee-gray)',
  border: '1.5px solid var(--coffee-gray-line)',
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  /** Renders an anchor instead, for actions that are really navigation. */
  href?: string;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  href,
}: Props) => {
  const [hover, setHover] = React.useState(false);

  const style: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'default' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    textDecoration: 'none',
    transition: 'opacity .12s ease',
    opacity: !disabled && hover ? 0.85 : 1,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(disabled ? disabledStyle : null),
  };

  const hoverProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  // A disabled link is a contradiction: there is no way to stop an anchor
  // being followed short of dropping the href, so render the real button and
  // let it carry the disabled state.
  if (href && !disabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        {...hoverProps}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...hoverProps}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
