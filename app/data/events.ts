export type Event = {
  time: string;
  title: string;
  /** Venue + address. Must be geocodable — the map link is built from it. */
  place: string;
  desc: string;
  /** Price or admission, as an outlined pill. Omit while it is undecided. */
  badge?: string;
  /** Where to sign up, if the event takes registrations. */
  signupUrl?: string;
  signupLabel?: string;
};

export type Day = {
  label: string;
  events: Event[];
};

/**
 * Grouped by day so a tabbed view can return once the programme is bigger.
 * While it is small, Schedule renders every day's events in one row, which is
 * why each event's `time` carries its own date.
 */
export const DAYS: Record<string, Day> = {
  to: {
    label: 'To 1.10',
    events: [
      {
        time: 'Torstai 1.10. klo 11–13',
        title: 'Kahvipäivä: julkinen maistatus Ratinan kauppakeskuksessa',
        place: 'Ratinan tapahtuma-aukio, Tampere',
        desc: 'Kahviviikon avaus. Pirkanmaan pienpaahtimot — Kahwe, Mokkamestarit, Pikkupaahtimo Pipa, Pirkanmaan Paahtimo ja Siemasu — tarjoavat matalan kynnyksen maistiaisia ohikulkijoille.',
        badge: 'Vapaa pääsy',
      },
    ],
  },
  la: {
    label: 'La 3.10',
    events: [
      {
        time: 'Lauantai 3.10. klo 11–16',
        title: 'Kahwe x Pispala Clothing -t-paidan julkkarit',
        // No street address to hand yet, so the map link searches for the
        // roastery by name. Swap in the address once it is confirmed.
        place: 'Kahwe Roastery, Tampere',
        desc: 'Kahwe ja Pispala Clothing julkistavat yhteistyöpaitansa aamukahvien merkeissä. Lisätietoja seuraa lähempänä tapahtumaa.',
      },
    ],
  },
  ke: {
    label: 'Ke 7.10',
    events: [
      {
        time: 'Keskiviikko 7.10. klo 18 alkaen',
        title: 'PPI x CCF Latte Art Throwdown',
        place: 'Pitkän Päivän Ilta, Tammelan puistokatu 37, Tampere',
        desc: 'Pitkän Päivän Ilta ja Coffee Competitions Finland järjestävät latte art throwdown -kilpailun osana kahviviikkoa, yhteistyössä Oatlyn kanssa. Katsojille vapaa pääsy. Kilpailijoiden osallistumismaksu on 5 € CCF:n Premium- ja Affiliate-jäsenille ja 8 € muille.',
        badge: 'Katsojille vapaa pääsy',
        signupUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSfctSmO4k-hNSFEAT97ZwhzIwUCNCiZafbrX3Gy7V67_5DZFQ/viewform',
        signupLabel: 'Ilmoittaudu kilpailuun',
      },
    ],
  },
};
