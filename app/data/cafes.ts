export type District =
  | 'Keskusta'
  | 'Tammela'
  | 'Pyynikki'
  | 'Pispala'
  | 'Hiedanranta'
  | 'Kangasala'
  | 'Akaa';

export type A11yFeature = 'step' | 'wc' | 'space';

/** Mon–Sun; each day is [open, close] in decimal hours, or null when closed. */
export type OpeningHours = ([number, number] | null)[];

export type Cafe = {
  name: string;
  fill: string;
  logo: string;
  district: District;
  lat: number;
  lng: number;
  a11y: A11yFeature[];
  hours: OpeningHours | null;
  area: string;
  blurb: string;
  site: string;
};

export const DISTRICTS: District[] = [
  'Keskusta',
  'Tammela',
  'Pyynikki',
  'Pispala',
  'Hiedanranta',
  'Kangasala',
  'Akaa',
];

export const CAFES: Cafe[] = [
  {
    name: 'Café Karalis',
    fill: '#ffffff',
    logo: '/logos/karalis.webp',
    district: 'Keskusta',
    lat: 61.49958,
    lng: 23.75669,
    a11y: [],
    hours: null,
    area: 'Kuninkaankatu 15, Tampere',
    blurb: 'Sardinialainen caffetteria.',
    site: 'https://karalis.fi/fi/',
  },
  {
    name: 'Cafe Nöösi',
    fill: '#ffffff',
    logo: '/logos/noosi.webp',
    district: 'Keskusta',
    lat: 61.50129,
    lng: 23.76849,
    a11y: ['step'],
    hours: [[9, 18], [9, 18], [9, 18], [9, 18], [9, 19], [10, 18], null],
    area: 'Satakunnankatu 7, Tampere',
    blurb:
      '1960–70-luvun modernismia ja Bauhausin funktionalismia kanavoiva tamperelaiskahvila. Listalla ranskalaisia herkkuja, muun muassa kolmea eri crème brûléeta.',
    site: 'https://www.cafenoosi.fi/',
  },
  {
    name: 'Cafe Pispala',
    fill: '#ffffff',
    logo: '/logos/pispala.webp',
    district: 'Pispala',
    lat: 61.50151,
    lng: 23.71509,
    a11y: ['step', 'wc'],
    hours: [[9, 17], [9, 17], [9, 17], [9, 17], [9, 18], [10, 18], [10, 17]],
    area: 'Pispankatu 30, Tampere',
    blurb:
      'Pispalan mäkien katukuvaan kuuluva kahvila, tuttu paikallisten aamukahveilta. Osa Ohana Restaurants -perhettä.',
    site: 'https://www.ohanarestaurants.com',
  },
  {
    name: "Roy's Cafe",
    fill: '#ffffff',
    logo: '/logos/roys.webp',
    district: 'Kangasala',
    lat: 61.47234,
    lng: 23.99115,
    a11y: ['step', 'wc', 'space'],
    hours: [[8, 17], [8, 17], [8, 17], [8, 17], [8, 17], [9, 15], null],
    area: 'Lentolantie 2, Kangasala',
    blurb: 'Pieni tunnelmallinen kahvila Kangasalan Lentolassa.',
    site: 'https://www.facebook.com/royscafee',
  },
  {
    name: 'Bakery Café Puusti',
    fill: '#ffffff',
    logo: '/logos/puusti.webp',
    district: 'Tammela',
    lat: 61.49659,
    lng: 23.77955,
    a11y: ['step', 'wc'],
    hours: [[8, 18], [8, 18], [8, 18], [8, 18], [8, 18], [9, 17], [10, 17]],
    area: 'Yliopistonkatu 50, Tampere',
    blurb:
      'Artesaanileipomo ja kahvila Sorsapuiston laidalla, Tampere-taloa vastapäätä. Kaikki korvapuustit leivotaan käsityönä paikan päällä luomujauhoista ja aidosta Ceylon-kanelista, kahvit tulevat Kaffa Roasterylta.',
    site: 'https://www.cafepuusti.fi/',
  },
  {
    name: 'Pyynikin Munkkikahvila',
    fill: '#ffffff',
    logo: '/logos/pyynikin-munkkikahvila.svg',
    district: 'Pyynikki',
    lat: 61.49632,
    lng: 23.73192,
    a11y: [],
    hours: [[9, 19], [9, 19], [9, 19], [9, 19], [9, 19], [9, 19], [9, 19]],
    area: 'Näkötornintie 20, Tampere',
    blurb:
      'Perheyrityksenä pyörivä legenda Pyynikin näkötornin juurella. Käsin tehdyt munkit ja niitä varten Kahwen paahtama oma kahvi — auki vuoden jokaisena päivänä.',
    site: 'https://www.munkkikahvila.net/',
  },
  {
    name: 'Haihunkosken Kahvila',
    fill: '#ffffff',
    logo: '/logos/haihu.webp',
    district: 'Akaa',
    lat: 61.2088,
    lng: 23.77715,
    a11y: ['step', 'space'],
    hours: [null, null, null, [11, 18], [11, 18], [11, 18], [11, 17]],
    area: 'Rautatienkatu 24, Akaa (Viiala)',
    blurb:
      'Kahvila ja sauna luonnonkauniilla Haihunkosken alueella Tarpianjoen rannalla. Itse leivotut leivonnaiset ja Kahwen kahvit — kesätorstaisin myös live-musiikkia.',
    site: 'https://haihu.fi/',
  },
  {
    name: 'Kaffila',
    fill: '#ffffff',
    logo: '/logos/kaffila.webp',
    district: 'Keskusta',
    lat: 61.49688,
    lng: 23.76038,
    a11y: [],
    hours: [[8, 18], [8, 18], [8, 18], [8, 18], [8, 18], [10, 17], [11, 17]],
    area: 'Aleksis Kiven katu 11, Tampere',
    blurb:
      'Kodikas kulmakuppila kävelykadulla aivan Keskustorin laidalla. Kaffila on hyvän kahvin koti ja panostaa erityisesti huolella valmistettuun kahviin.',
    site: 'https://www.kaffila.fi/',
  },
  {
    name: 'Mimosa',
    fill: '#ffffff',
    logo: '/logos/mimosa.webp',
    district: 'Tammela',
    lat: 61.49883,
    lng: 23.78448,
    a11y: ['step'],
    hours: [[10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [11, 17], null],
    area: 'Itsenäisyydenkatu 16, Tampere',
    blurb:
      'Taidekahvila, joka on vuosien varrella jalostunut täysin vegaaniseksi: muhkeita kakkuja, vanhan ajan viinereitä ja croissantteja sekä vaihtuvia näyttelyitä.',
    site: 'https://cafebakerymimosa.wordpress.com/',
  },
  {
    name: 'Pitkän Päivän Ilta',
    fill: '#ffffff',
    logo: '/logos/ppi.webp',
    district: 'Tammela',
    lat: 61.49929,
    lng: 23.78003,
    a11y: ['step', 'wc', 'space'],
    hours: [[9, 22], [9, 22], [9, 22], [9, 23], [9, 24], [11, 24], [11, 18]],
    area: 'Tammelan puistokatu 37, Tampere',
    blurb:
      'Kahvila ja cocktailbaari Tammelan sydämessä, samassa tilassa skeittikauppa Mañanan kanssa. Päivisin paikallisesti paahdettua kahvia, illalla pohjoismaisella twistillä tehtyjä cocktaileja.',
    site: 'https://www.pitkanpaivanilta.fi/',
  },
  {
    name: 'Thé Hidden',
    fill: '#ffffff',
    logo: '/logos/the-hidden.webp',
    district: 'Keskusta',
    lat: 61.49656,
    lng: 23.76794,
    a11y: ['step'],
    hours: [[11, 18], [11, 18], [11, 18], [11, 18], [11, 19], [11, 18], null],
    area: 'Hatanpään valtatie 6 B, Tampere',
    blurb:
      'Tee- ja kahvihuone, jonka valikoima on koottu huolella — hyvä paikka istua alas ja maistella rauhassa.',
    site: 'https://thehidden.fi/',
  },
  {
    name: 'Laelta',
    fill: '#ffffff',
    logo: '/logos/laelta.webp',
    district: 'Keskusta',
    lat: 61.50813,
    lng: 23.75941,
    a11y: ['step'],
    hours: [[9, 17], [9, 17], [9, 17], [9, 17], [9, 18], [10, 17], null],
    area: 'Ranta-Tampellan katu 13, Tampere',
    blurb: 'Kahvila, jossa estetiikka ja kuppi kulkevat käsi kädessä.',
    site: 'https://laelta.com',
  },
  {
    name: 'Poppy',
    fill: '#ffffff',
    logo: '/logos/poppy.webp',
    district: 'Tammela',
    lat: 61.50021,
    lng: 23.77932,
    a11y: ['step', 'wc'],
    hours: [[9, 18], [9, 18], [9, 18], [9, 18], [9, 18], [10, 17], [11, 16]],
    area: 'Tammelan puistokatu 30–32, Tampere',
    blurb: 'Värikäs ja iloinen kahvila keskustan sydämessä.',
    site: 'https://poppycafetampere.com/',
  },
  {
    name: 'Boulangerie Marco',
    fill: '#ffffff',
    logo: '/logos/marco.webp',
    district: 'Tammela',
    lat: 61.49693,
    lng: 23.77698,
    a11y: ['step', 'wc', 'space'],
    hours: [[8, 18], [8, 18], [8, 18], [8, 18], [8, 18], [9, 17], [10, 16]],
    area: 'Tullikatu 6, Tampere',
    blurb:
      'Aidosti ranskalainen artesaanileipomo — croissantit, patongit, briossit ja eclairit leivotaan päivittäin paikan päällä. Valittiin Tampereen parhaaksi kahvilaksi ensimmäisenä vuotenaan.',
    site: 'https://www.boulangeriemarco.fi/',
  },
  {
    name: 'Metso',
    fill: '#ffffff',
    logo: '/logos/metso.webp',
    district: 'Keskusta',
    lat: 61.49818,
    lng: 23.75052,
    a11y: ['step', 'wc', 'space'],
    hours: [[9, 19], [9, 19], [9, 19], [9, 19], [9, 18], [10, 16], null],
    area: 'Pirkankatu 2, Tampere',
    blurb:
      'Pääkirjasto Metson kupeessa toimiva kahvila lukutoukille ja kahvinystäville.',
    site: 'https://www.cafemetso.fi/',
  },
  {
    name: 'Pala Cafe',
    fill: '#ffffff',
    logo: '/logos/pala.webp',
    district: 'Keskusta',
    lat: 61.5011,
    lng: 23.76102,
    a11y: ['step'],
    hours: [[9, 17], [9, 17], [9, 17], [9, 17], [9, 17], [10, 16], null],
    area: 'Satakunnankatu 18 A, Tampere',
    blurb: 'Pienimuotoinen naapurustokahvila hyvällä kahvivalikoimalla.',
    site: 'https://www.palacafe.fi',
  },
  {
    name: 'Kattopuutarha',
    fill: '#ffffff',
    logo: '/logos/kattopuutarha.webp',
    district: 'Keskusta',
    // Shares Satakunnankatu 18 A with Pala Cafe, so this sits ~45m north of
    // the shared address — roughly its own entrance through Media 54, and
    // enough that the two map markers stop covering each other.
    lat: 61.5015,
    lng: 23.76102,
    a11y: ['step', 'wc', 'space'],
    hours: [null, [11, 20], [11, 20], [11, 22], [11, 23], [12, 23], [12, 18]],
    area: 'Finlaysonin katto, Tampere',
    blurb:
      'Finlaysonin katolle avautunut kahvila, joka laajentaa alueen Tehdaspuutarhan toimintaa. Rento ilmapiiri arkilounaalle tai viikonloppuillalle.',
    site: 'https://www.kattopuutarha.fi',
  },
  {
    name: 'Cafe Kartano',
    fill: '#ffffff',
    logo: '/logos/kartano.webp',
    district: 'Hiedanranta',
    lat: 61.51611,
    lng: 23.68641,
    a11y: ['step', 'wc', 'space'],
    hours: [null, null, [10, 18], [10, 18], [10, 18], [11, 17], [11, 17]],
    area: 'Tehdaskartanonkatu 38, Tampere',
    blurb:
      'Näsijärven rannalla Hiedanrannan kulttuurialueella. Tarjolla vastuullisesti tuotettua paikallista kahvia, leivonnaisia, luonnonmukaisia viinejä ja viikonloppuisin brunssi.',
    site: 'https://www.cafekartano.fi/',
  },
];
