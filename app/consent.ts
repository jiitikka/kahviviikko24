// Single source of truth for the analytics consent gate.
//
// The key is read from three places: the banner that writes it, and the two
// inline loader scripts (Google Analytics in app/layout.tsx, Hotjar in
// app/scripts/HotjarSnippet.tsx) that refuse to load anything until it says
// "accepted".
export const CONSENT_STORAGE_KEY = "tkv24-analytics-consent-v1";

// The `storage` event only fires in *other* tabs, so the tab where the visitor
// actually clicked needs its own notification.
export const CONSENT_EVENT = "tkv24-consent-change";

export type ConsentState = "unknown" | "accepted" | "rejected";
