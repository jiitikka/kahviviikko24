export type Event = {
  time: string;
  title: string;
  /** Venue + address. Must be geocodable — the map link is built from it. */
  place: string;
  desc: string;
  badge: string;
  needsSignup?: boolean;
};

export type Day = {
  label: string;
  events: Event[];
};

/** Keys are in tab order. The tab row hides itself while only one day exists. */
export const DAYS: Record<string, Day> = {
  to: {
    label: 'To 1.10',
    events: [
      {
        time: 'Torstai klo 11–13',
        title: 'Kahvipäivä: julkinen maistatus Ratinan kauppakeskuksessa',
        place: 'Ratinan tapahtuma-aukio, Tampere',
        desc: 'Kahviviikon avaus. Pirkanmaan pienpaahtimot — Kahwe, Mokkamestarit, Pikkupaahtimo Pipa, Pirkanmaan Paahtimo ja Siemasu — tarjoavat matalan kynnyksen maistiaisia ohikulkijoille.',
        badge: 'Vapaa pääsy',
      },
    ],
  },
};
