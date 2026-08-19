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

> **Hosting dependency — checked, and satisfied.** `headers()` in
> `next.config.mjs` is implemented by the **Next.js server at request time**. It
> is honoured on Amplify's compute platform and **silently ignored** when an app
> is hosted as purely static files (S3 + CloudFront). Every route here
> prerenders to static HTML, so the distinction mattered and is invisible at
> build time.
>
> Production responses were inspected and carry `X-Powered-By: Next.js`,
> `X-Nextjs-Cache`, `X-Nextjs-Prerender` and `X-Nextjs-Stale-Time` — headers only
> the Next.js server emits. The app therefore runs on the compute platform and
> these headers will apply. No Amplify custom-headers configuration is needed.
>
> Should the app ever be moved to static hosting, this entire finding silently
> reverts, and the header set would have to be re-added via Amplify console →
> Hosting → Custom headers.

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
across the 8.x line.

The tree now contains exactly one `postcss`, and the lockfile has a single entry.
Verified afterwards that the CSS pipeline is unharmed: the Typekit `@import`, the
Tailwind preflight reset, compiled utility classes, brand colours, and the
`next/font` face all survive into the built bundle.

Severity stays Low for *this* site: postcss runs at build time over CSS in this
repository, and the source-map advisories need attacker-controlled CSS to reach
the parser. Worth patching properly regardless, and it clears the alert.

### 4b. `nanoid` infinite loop — High (advisory) — fixed

GHSA-2v37-7h3g-55p8 / **CVE-2026-67213**: custom generators loop indefinitely
when size is zero, `<3.3.18`. `nanoid` is a transitive dependency of `postcss`,
so it arrived here through the CSS toolchain and never reaches the browser.

Note that the postcss fix above *moved* this dependency (3.3.11 → 3.3.16) without
clearing it — 3.3.16 is still inside the vulnerable range. Fixed by a
`resolutions` entry pinning `^3.3.18`.

### 4c. Stale transitive build tooling — Low to High (advisories) — fixed

Reacting to Dependabot mail one package at a time was missing things, so the
whole lockfile was checked against the npm advisory database by exact resolved
version, rather than by re-resolving the tree (a fresh resolve reports far fewer
problems, because it silently picks newer versions than the lockfile pins —
which is exactly how the items below stayed invisible).

That found 25 advisories across seven more packages, every one of them stale
build tooling reachable only through `next`'s bundler and the eslint toolchain:

| Package | Was | Now |
| --- | --- | --- |
| `@babel/core` | 7.28.5 | 7.29.7 |
| `ajv` | 6.12.6 | 6.15.0 |
| `brace-expansion` | 1.1.12, 2.0.2 | 1.1.18, 5.0.9 |
| `flatted` | 3.3.3 | 3.4.4 |
| `js-yaml` | 4.1.1 | 4.3.1 |
| `minimatch` | 3.1.2, 9.0.5 | 3.1.5, 10.2.6 |
| `picomatch` | 2.3.1, 4.0.3 | 2.3.2, 4.0.5 |

All are ReDoS, DoS, prototype-pollution or arbitrary-file-read issues in tooling
that runs at build time over this repository's own files; none ships to visitors.
Every one was already permitted by the ranges in `package.json`, so a plain
`yarn upgrade` cleared them with no semver changes.

### 4d. `next` upgraded 16.1.0 → 16.3.1 — fixes `sharp` — fixed

An earlier draft of this report listed the `sharp` libvips CVEs
(CVE-2026-33327 / 33328 / 35590 / 35591) as unfixable, because `next` 16.1.0
pinned `sharp` to `^0.34.4` and forcing 0.35.x would have crossed a 0.x major.

That was solved upstream: `next` 16.3.1 widens the range to `^0.35.3`, which is
patched. 16.3.1 satisfies the `^16.1.0` already declared in `package.json`, so
this is a lockfile refresh rather than a semver change. `eslint-config-next` was
moved from its exact `16.1.0` pin to `16.3.1` to match.

`sharp` now resolves to 0.35.3 and there are no remaining advisories anywhere in
the tree.

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

## Accepted risks

- **The two `resolutions` overrides are a maintenance debt.** `postcss` and
  `nanoid` are pinned above what `next` and `tailwindcss` ask for. That is
  correct today, but it means this project is running those two packages at
  versions its own dependencies have not tested against, and the pins will
  silently keep applying after upstream catches up. Drop each entry once
  `next`/`tailwindcss` declare ranges that already exclude the vulnerable
  versions.
- **`next` precompiles some dependencies into `next/dist/compiled/`**, including
  its own copy of `nanoid` and ten `postcss-*` plugins. These are bundled
  source, not lockfile entries, so neither `resolutions` nor Dependabot can
  reach them — an alert on those would have to come from `next` itself. Not a
  live concern here (build-time code over this repo's own files), but it is the
  blind spot in all of the dependency work above.
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
- **Whole dependency tree** — all 422 packages in `yarn.lock` were checked
  against the npm advisory database *at their exact locked versions*: zero
  advisories remain.

## Verification

- Dependency checking must be done against the resolved versions in
  `yarn.lock`, not by re-resolving `package.json`. Re-resolving quietly picks
  newer versions than the lockfile pins and under-reports: it showed "0
  vulnerabilities" at a point when the real tree still had 25. The repeatable
  check is to POST the lockfile's `{name: [versions]}` map to
  `https://registry.npmjs.org/-/npm/v1/security/advisories/bulk`.
- Exactly one `postcss` resolves in the tree, and the built CSS bundle was
  checked for the Typekit import, Tailwind reset, utility classes, brand colours
  and font faces after the override and again after the `next` upgrade.
- `yarn build` and `yarn lint` both pass. (`yarn lint` also failed on `main`,
  on a pre-existing `react-hooks/set-state-in-effect` error in
  `ConsentBanner.tsx`; the consent rewrite in finding 2 replaced that effect
  with `useSyncExternalStore`, which clears it.)
- Headers confirmed on the wire against `next start` for both `/` and
  `/privacy`; `X-Powered-By` confirmed absent. This proves the config is
  correct, **not** that production serves it — see the deployment caveat under
  finding 1, which must be re-checked against the deployed URL.
- There is no CI on this repository (zero check runs configured) and the
  Amplify pipeline deploys automatically on merge to `main`, so this local
  verification is the only gate this change passes through.
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

- **Known blind spot in that test.** This sandbox's network policy blocks
  outbound requests to `use.typekit.net` and `www.google.com`, so the Typekit
  stylesheet and the Maps embed never actually loaded during the browser run.
  Any CSP violation that only occurs *downstream* of those origins could not
  surface. Exactly one such case was later found by reading production response
  headers: `use.typekit.net/yni4vft.css` chains to a tracking stylesheet at
  `p.typekit.net/p.css`, which the first version of `style-src` would have
  blocked. `p.typekit.net` is now allow-listed for both `style-src` and
  `font-src`. The residual risk is the same class of chained request behind the
  Google Maps iframe; `frame-src` covers the iframe itself, and content loaded
  *inside* a cross-origin frame is governed by Google's own policy rather than
  this one, so no further directive is expected to be needed — but the CSP
  should be re-checked in a real browser against the deployed site.

## Post-deploy checklist

The hosting question under finding 1 is **resolved**: production responses carry
`X-Powered-By: Next.js`, `X-Nextjs-Cache` and `X-Nextjs-Prerender`, so the app
runs on Amplify's compute platform and `next.config.mjs` headers are honoured.
No Amplify custom-headers configuration is required.

After the first deploy, load the site in a browser with the console open and
confirm there are no `Content Security Policy` violations — specifically that
the Typekit webfonts still render and the cafes map still displays. Those are
the two third-party surfaces the CSP constrains, and the two the sandboxed test
could not fully exercise.
