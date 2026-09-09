import localFont from 'next/font/local';

export const bricolage = localFont({
  src: './fonts/BricolageGrotesque-Variable.woff2',
  weight: '500 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
});

export const literata = localFont({
  src: [
    { path: './fonts/Literata-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Literata-Italic.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-body',
});
