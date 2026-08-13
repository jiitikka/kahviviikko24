# Security audit — kahviviikko24

Date: 2026-08-13. Scope: the whole repository at commit `381f30b`, plus its
dependency tree and git history.

> **Status:** these fixes live on `claude/security-audit-yllqpx`. Dependabot
> alerts are raised against the default branch, so any open alert stays open
> until this is merged into `main`.

## What this application is

A statically prerendered Next.js 16 marketing site for an event. It has **no
forms, no API routes, no server actions, no database, no authentication, and no
cookies of its own**. The only untrusted input it processes is the visitor's own
`localStorage` consent value. That removes most of the usual web attack surface
(injection, authz, SSRF, session handling) before the audit starts, so the
findings below concentrate on the two things this site actually does: serve
static HTML, and load four third-party origins.

Third-party origins the site contacts: Google Tag Manager / Analytics, Hotjar,
Google Maps (embedded iframe), and Adobe Typekit (webfont stylesheet).

## Findings

### 1. No security response headers — Medium — fixed

`next.config.mjs` was empty, so the site was served with no
`Content-Security-Policy`, no framing protection, no `X-Content-Type-Options`,
no `Referrer-Policy`, and no HSTS, while advertising the framework via
`X-Powered-By`.

The concrete consequence was clickjacking: any third party could frame the site
and overlay it. Absent a CSP, a compromise of any of the four third-party
origins above (or of the build) would also have had a completely free hand in
the page.

Fixed in `next.config.mjs`: a CSP allow-listing exactly the origins in use,
plus `X-Frame-Options: DENY`, `nosniff`, `strict-origin-when-cross-origin`,
a `Permissions-Policy` denying camera/microphone/geolocation/payment/USB,
`Strict-Transport-Security`, and `poweredByHeader: false`.

**Known limitation:** `script-src` still needs `'unsafe-inline'`, because the
consent gate and Next's own hydration payload are inline scripts. Removing it
means switching to per-request nonces, which requires routing every response
through middleware — a real cost for a site that is otherwise fully static. The
policy still constrains script *origins*, framing, form targets, plugin content,
and connection destinations, so it is worth having in this form. Revisit if the
site ever gains dynamic rendering.

### 2. Analytics consent had no effect until a page reload — Medium (consent correctness) — fixed

Both loaders (`app/layout.tsx`, `app/scripts/HotjarSnippet.tsx`) watched only
the `storage` event. Per spec, `storage` fires in *other* tabs, never in the tab
that made the change. Clicking "Hyväksyn" therefore wrote `localStorage` and
dismissed the banner, but neither Google Analytics nor Hotjar ever loaded until
the visitor happened to reload.

This failed in the safe direction — less tracking, not more — so it is a
correctness defect rather than a vulnerability. It is included because it meant
the consent mechanism as a whole was not doing what the privacy statement says
it does.

Fixed by introducing a shared `app/consent.ts` and dispatching a same-tab
`CustomEvent` on choice, which both loaders and the banner now subscribe to.

### 3. Unvalidated environment variable interpolated into an inline script — Low — fixed

`app/scripts/HotjarSnippet.tsx` spliced `process.env.NEXT_PUBLIC_HOTJAR_ID`
directly into the body of an inline `<script>`. Any value that is not a bare
number would have been injected as executable JavaScript on every page of the
site.

Severity is Low because the value is set by whoever controls the build, not by a
visitor — this is defence in depth against a misconfigured or tampered build
variable, not a live hole. It is still a textbook injection sink and cheap to
close: the id is now rejected unless it matches `/^\d+$/`.

### 4. Vulnerable `postcss` — every copy in the tree — Low — fixed

Three advisories applied: GHSA-qx2v-qp2m-jg93 (XSS via unescaped `</style>`,
`<8.5.10`), GHSA-6g55-p6wh-862q (arbitrary file read via attacker-controlled
`sourceMappingURL`, `<=8.5.11`, **CVE-2026-45623** — this is the one Dependabot
alerts on), and GHSA-r28c-9q8g-f849 (path traversal in source-map auto-loading,
`<=8.5.17`).

`postcss` appeared in the tree **three** times, all of them affected:

| Copy | Was | Introduced by |
| --- | --- | --- |
| `node_modules/postcss` | 8.5.6 | direct devDependency `^8.5.6` |
| `node_modules/tailwindcss/node_modules/postcss` | 8.5.6 | `tailwindcss` → `^8.4.47` |
| `node_modules/next/node_modules/postcss` | 8.4.31 | `next` → exact pin `8.4.31` |

Bumping the direct dependency to `^8.5.18` fixed only the first. The other two
are fixed with a yarn `resolutions` override, which is safe here because
8.4.31 → 8.5.25 is a minor bump *within major 8*: postcss keeps its API stable
across the 8.x line. (The same trick is deliberately **not** applied to `sharp`
below, where the bump would cross a 0.x major.)

The tree now contains exactly one `postcss`, hoisted at 8.5.25, and the lockfile
has a single entry. Verified afterwards that the CSS pipeline is unharmed: the
Typekit `@import`, the Tailwind preflight reset, compiled utility classes, brand
colours, and the `next/font` face all survive into the built bundle.

Severity stays Low for *this* site: postcss runs at build time over CSS in this
repository, and the source-map advisories need attacker-controlled CSS to reach
the parser. Worth patching properly regardless, and it clears the alert.

### 5. Unused `@next/third-parties` dependency — Low — fixed

`GoogleAnalytics` was imported in `app/layout.tsx` but never rendered — the
hand-rolled consent-gated loader is used instead. The dependency was pure
supply-chain surface with no function, and one bad merge away from being
rendered and loading analytics without consent. Removed from `package.json`.

### 6. Hotjar script mounted outside `<body>` — Low — fixed

`<HotjarSnippet/>` sat between `</body>` and `</html>`, which is invalid
document structure and leaves its handling to browser error recovery. Moved
inside `<body>`.

### 7. Map iframe hardening — Informational — fixed

The Google Maps embed in `app/components/CafeMap.tsx` had no `title`,
`referrerPolicy`, or `loading`. Added all three. A `sandbox` attribute was
deliberately *not* added: Google My Maps needs `allow-scripts` plus
`allow-same-origin` to function, which together neutralise most of the point of
sandboxing a cross-origin frame, and the CSP `frame-src` directive already
restricts what may be framed here.

## Accepted risks (no action available)

- **`sharp` 0.34.5** — inherits four libvips CVEs (CVE-2026-33327/33328/35590/
  35591). It is an optional dependency of `next` pinned to `^0.34.4`; forcing
  0.35.x via a resolution risks breaking image optimisation and was not done.
  Exposure is limited: Next's image optimizer only accepts local paths or
  configured `remotePatterns`, and no remote patterns are configured, so the
  only images reaching sharp are the ones in `public/`. Upgrade when `next`
  widens its range.
- **Adobe Typekit stylesheet** (`app/globals.css:1`) is a fourth third-party
  origin, loaded on every page and able to see every visitor. It is now
  explicitly allow-listed in the CSP rather than silently permitted. Self-hosting
  the font via `next/font` would remove the origin entirely — worth considering,
  but it is a design change, not a fix.

## Checked and clean

- **Secrets** — no credentials, keys, or tokens in the working tree or across
  all 44 commits of history. `.gitignore` correctly excludes `.env*.local` and
  `*.pem`. The Google site-verification token in `app/layout.tsx` and the GA
  measurement ID are public identifiers by design, not secrets.
- **XSS sinks** — no `dangerouslySetInnerHTML`, `innerHTML`, `eval`,
  `document.write`, or `javascript:` URLs anywhere in `app/`.
- **Link handling** — every external link is a hardcoded `https://` URL from a
  literal in the source; none use `target="_blank"`, so there is no
  reverse-tabnabbing exposure and no `rel="noopener"` gap.
- **Untrusted input** — the consent value read from `localStorage` is compared
  against a fixed set of strings and never interpolated into markup or script.
- **`next` itself** — no advisories against 16.1.0 other than the transitive
  ones above.

## Verification

- Exactly one `postcss` (8.5.25) resolves in the tree, and the built CSS bundle
  was diffed for the Typekit import, Tailwind reset, utility classes, brand
  colours and font faces after the override.
- `yarn build` and `yarn lint` both pass. (`yarn lint` also failed on `main`,
  on a pre-existing `react-hooks/set-state-in-effect` error in
  `ConsentBanner.tsx`; the consent rewrite in finding 2 replaced that effect
  with `useSyncExternalStore`, which clears it.)
- Headers confirmed on the wire against `next start` for both `/` and
  `/privacy`; `X-Powered-By` confirmed absent.
- The consent gate was driven in headless Chromium across three states, with
  all requests to Google/Hotjar domains intercepted and counted, and the page
  scrolled to force lazily-loaded subresources:

  | State | Tracker requests | Result |
  | --- | --- | --- |
  | Fresh visit, no choice made | 0 | pass |
  | After "En hyväksy" (reject) | 0 | pass |
  | After "Hyväksyn" (accept), same tab, no reload | 1 (googletagmanager) | pass |

  Zero CSP violations were reported for the full page in any of the three
  states. This test found the Typekit origin of the "accepted risks" section,
  which static reading of the components had missed.
