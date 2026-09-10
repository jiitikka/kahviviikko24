/** @type {import('next').NextConfig} */

// Content Security Policy.
//
// 'unsafe-inline' is required in script-src because Next.js emits inline
// hydration scripts. Replacing it with a nonce would mean rendering every page
// through middleware, which this otherwise static marketing site does not need.
// The remaining directives still block framing, form hijacking, plugin content,
// and any script or connection destination outside the allow-list below.
//
// The 2026 redesign narrowed this list: Google Analytics and the Adobe Typekit
// stylesheet are gone, the Google Maps iframe was replaced by a Leaflet map,
// and the fonts are self-hosted — so those origins are no longer allow-listed.
const contentSecurityPolicy = [
  "default-src 'self'",
  // Umami (statistics) plus Hotjar and Microsoft Clarity (behaviour
  // analytics), all three consent-gated.
  "script-src 'self' 'unsafe-inline' https://cloud.umami.is https://static.hotjar.com https://script.hotjar.com https://www.clarity.ms https://*.clarity.ms",
  // Tailwind, next/image and this site's inline style objects emit inline
  // style attributes. Fonts are self-hosted, so no third-party origin here.
  "style-src 'self' 'unsafe-inline'",
  // OpenStreetMap serves the Leaflet tiles for the Kahvilat map view.
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://*.hotjar.com https://*.clarity.ms",
  "font-src 'self' data:",
  // Umami serves its script from cloud.umami.is but posts events to
  // gateway.umami.is — omit the gateway and it silently collects nothing.
  // Clarity beacons to per-region subdomains (c.clarity.ms, e.clarity.ms, …),
  // so the wildcard is load-bearing, not tidiness.
  "connect-src 'self' https://cloud.umami.is https://gateway.umami.is https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://*.clarity.ms",
  // Hotjar's helper frame. The site itself no longer embeds any iframe.
  "frame-src https://vars.hotjar.com",
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
    // geolocation stays enabled for this origin: the Kahvilat "Lähellä minua"
    // filter sorts cafés by distance and needs navigator.geolocation.
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=(), usb=()',
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
  async redirects() {
    return [
      { source: '/privacy', destination: '/tietosuojaseloste', permanent: true },
    ];
  },
};

export default nextConfig;
