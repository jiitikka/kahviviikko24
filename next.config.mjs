/** @type {import('next').NextConfig} */

// Content Security Policy.
//
// 'unsafe-inline' is required in script-src because the analytics consent gate
// in app/layout.tsx and app/scripts/HotjarSnippet.tsx runs as inline <Script>
// tags, and Next.js emits inline hydration scripts. Replacing it with a nonce
// would mean rendering every page through middleware, which this otherwise
// static marketing site does not need. The remaining directives still block
// framing, form hijacking, plugin content, and any script or connection
// destination outside the allow-list below.
const contentSecurityPolicy = [
  "default-src 'self'",
  // Google Analytics (gtag) and Hotjar.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://static.hotjar.com https://script.hotjar.com",
  // Tailwind and next/image emit inline style attributes; app/globals.css
  // imports an Adobe Typekit stylesheet from use.typekit.net, which in turn
  // pulls a tracking stylesheet (p.css) from p.typekit.net — both origins are
  // needed or the chained request is blocked.
  "style-src 'self' 'unsafe-inline' https://use.typekit.net https://p.typekit.net",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.hotjar.com",
  // next/font/google self-hosts its fonts at build time; Typekit serves its
  // own font files from use.typekit.net / p.typekit.net.
  "font-src 'self' data: https://use.typekit.net https://p.typekit.net",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com",
  // The participating-cafes map embed, plus Hotjar's helper frame.
  "frame-src https://www.google.com https://maps.google.com https://vars.hotjar.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    // Redundant with frame-ancestors above, kept for older browsers.
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
];

const nextConfig = {
  // Do not advertise the framework in responses.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
