/**
 * Planned for a later release, both off for the first one:
 * - PErKY ry section and its nav links — the association is not founded yet.
 * - Accessibility and "Auki nyt" filters — per-café accessibility and
 *   opening-hours data does not exist yet.
 */
export const SHOW_PERKY = false;
export const SHOW_ADVANCED_FILTERS = false;

/** Nothing loads while an id is missing. */
export const ANALYTICS = {
  umamiSrc: process.env.NEXT_PUBLIC_UMAMI_SRC ?? null,
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? null,
  hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID ?? null,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? null,
};
