export const FAQS = [
  {
    q: 'Mikä epäkantiskortti on ja miten se toimii?',
    a: 'Kortti kulkee mukana kahvilasta kahvilaan. Joka ostetusta kahvi- tai teejuomasta saat leiman, ja joka viides juoma on ilmainen.',
  },
  {
    q: 'Onko tapahtumat maksullisia?',
    a: 'Suurin osa kahviviikon tapahtumista — kierrokset, cuppingit, avoimet ovet — on ilmaisia. Yksittäiset erikoistapahtumat voivat olla maksullisia, ja se näkyy aina ohjelmassa etukäteen.',
  },
  {
    q: 'Tarvitseeko ilmoittautua etukäteen?',
    a: 'Ei yleensä. Osa pienemmistä tilaisuuksista täyttyy paikan päällä ensin tulleiden kesken — jos paikkoja on rajoitetusti, se mainitaan ohjelmassa.',
  },
  {
    q: 'Kuka järjestää kahviviikon?',
    a: 'Vapaaehtoisten tiimi Pirkanmaan erikoiskahviyhdistys PErKY ry:n taustalla. Mukana myös pirkanmaalaiset pienpaahtimot Kahwe, Pirkanmaan Paahtimo, Mokkamestarit ja Siemasu.',
  },
];

export const TICKET_STEPS = [
  'Mene kahvilaan ja osta kahvi- tai teejuoma',
  'Ostetusta juomasta saat leiman epäkantiskorttiin',
  'Toista sama eri kahviloissa',
  'Joka viides kahvi tai tee on ilmainen',
];

/**
 * ratio = logo width/height, h = optically balanced height. A wide wordmark
 * gets a lower box than a round mark; do not normalise these to one height.
 */
export const PARTNERS = [
  { name: 'Kahwe Roastery', url: 'https://www.kahwe.fi', logo: '/logos/kahwe.webp', ratio: 400 / 229, h: 56 },
  { name: 'Mokkamestarit', url: 'https://www.mokkamestarit.fi', logo: '/logos/mokkamestarit.webp', ratio: 1, h: 64 },
  { name: 'Pikkupaahtimo PIPA', url: 'https://pikkupaahtimopipa.fi/', logo: '/logos/pipa.webp', ratio: 1, h: 64 },
  { name: 'Pirkanmaan Paahtimo', url: 'https://pirkanmaanpaahtimo.fi', logo: '/logos/pirkanmaan-paahtimo.webp', ratio: 135 / 160, h: 62 },
  { name: 'Siemasu Coffee Roastery', url: 'https://www.siemasu.coffee', logo: '/logos/siemasu.webp', ratio: 400 / 138, h: 46 },
];

export const PERKY_FACTS = [
  { value: '2026', label: 'Yhdistys perustettiin' },
  { value: '11', label: 'Päivää ohjelmaa lokakuussa' },
  { value: '5', label: 'Paahtimoa yhteistyössä' },
];

export const NAV_LINKS = [
  { href: '#mika-on', label: 'Kahviviikosta' },
  { href: '#epakantiskortti', label: 'Epäkantiskortti' },
  { href: '#ohjelma', label: 'Ohjelma' },
  { href: '#kahvilat', label: 'Kahvilat' },
];

export const CONTACT_EMAIL = 'tampereenkahviviikko@gmail.com';
/** Written with (at) on the page to keep the address away from scrapers. */
export const CONTACT_EMAIL_DISPLAY = 'tampereenkahviviikko (at) gmail.com';
