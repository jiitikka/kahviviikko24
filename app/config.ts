/**
 * Planned for a later release, both off for the first one:
 * - PErKY ry section and its nav links — the association is not founded yet.
 * - Accessibility and "Auki nyt" filters — per-café accessibility and
 *   opening-hours data does not exist yet.
 */
export const SHOW_PERKY = false;
export const SHOW_ADVANCED_FILTERS = false;

/**
 * Nothing loads while an id is missing. These are inlined at build time, so
 * changing one in Amplify needs a redeploy — and an unset var means the tool
 * stays off, which is what keeps dev and branch previews out of the stats.
 */
const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;

export const ANALYTICS = {
  umamiSrc: process.env.NEXT_PUBLIC_UMAMI_SRC ?? null,
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? null,
  // Digits only, so a misconfigured build variable cannot reshape the script
  // URL it is interpolated into (see finding 3 in SECURITY-AUDIT.md).
  hotjarId: hotjarId && /^\d+$/.test(hotjarId) ? hotjarId : null,
};
