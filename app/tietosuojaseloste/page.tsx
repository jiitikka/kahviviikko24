import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_EMAIL_DISPLAY } from '@/app/data/content';

const description =
  'Mitä tietoja tampereenkahviviikko.fi kerää, mihin niitä käytetään ja miten voit hallita valintojasi.';

export const metadata: Metadata = {
  title: 'Tietosuojaseloste — Tampereen kahviviikko',
  description,
  alternates: {
    canonical: '/tietosuojaseloste',
  },
  // Without these the page inherits the home page's Open Graph copy, so
  // sharing the policy showed the event's marketing line. A child openGraph
  // replaces the parent's outright rather than merging, so siteName, locale,
  // type and the image have to be repeated here — and the image matters,
  // because the root sets a summary_large_image Twitter card.
  openGraph: {
    title: 'Tietosuojaseloste — Tampereen kahviviikko',
    description,
    url: '/tietosuojaseloste',
    siteName: 'Tampereen kahviviikko',
    locale: 'fi_FI',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Tampereen kahviviikko 1.–11.10.2026 — parempaa kahvia kansalle',
      },
    ],
  },
};

const h2 = 'm-0 font-display text-[clamp(21px,3.4vw,26px)] font-extrabold tracking-[-0.02em]';
const section =
  'flex flex-col gap-[10px] border-t-rule border-coffee pt-5';
const body = 'm-0 max-w-[680px] text-[16px] leading-[1.65]';

const Card = ({ title, children }: { title: string; children: string }) => (
  <div className="flex flex-col gap-[6px] rounded-xl border-rule border-coffee px-[18px] py-4">
    <span className="font-display text-[17px] font-extrabold">{title}</span>
    <p className="m-0 text-[15px] leading-[1.6]">{children}</p>
  </div>
);

export default function Tietosuojaseloste() {
  return (
    <div className="min-h-screen bg-cream font-body text-coffee">
      <header className="tkv-gutter-narrow flex items-center gap-[10px] border-b-rule border-coffee bg-cream py-4">
        <Image
          src="/brand/papu-musta-halkeama.svg"
          alt=""
          width={24}
          height={24}
          className="w-6 flex-none"
        />
        <Link
          href="/"
          className="tkv-link-plain font-display text-[clamp(15px,3.6vw,17px)] font-extrabold tracking-[-0.02em]"
        >
          Tampereen kahviviikko
        </Link>
      </header>

      <main
        id="sisalto"
        tabIndex={-1}
        className="tkv-gutter-narrow flex flex-col gap-[clamp(28px,4vw,40px)] pb-[clamp(56px,9vw,96px)] pt-[clamp(36px,7vw,72px)]"
      >
        <nav
          aria-label="Murupolku"
          className="-mb-[clamp(14px,2vw,20px)] font-display text-[13px] font-bold"
        >
          <Link href="/" className="inline-flex items-center gap-[6px]">
            <span aria-hidden="true">←</span>
            Etusivu
          </Link>
          <span aria-hidden="true" className="mx-2 text-[var(--coffee-gray)]">
            /
          </span>
          <span aria-current="page" className="text-[var(--coffee-gray)]">
            Tietosuojaseloste
          </span>
        </nav>

        <div className="flex flex-col gap-[14px]">
          <span className="tkv-label">Tietosuoja</span>
          <h1 className="m-0 font-display text-[clamp(30px,6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.03em] [text-wrap:pretty]">
            Tietosuojaseloste ja evästekäytännöt
          </h1>
          <p className="m-0 max-w-[640px] text-[17px] leading-[1.65] [text-wrap:pretty]">
            Tällä sivulla kerrotaan, mitä tietoja tampereenkahviviikko-sivustolla
            kerätään, mihin niitä käytetään ja miten voit hallita valintojasi.
            Päivitetty [täydennettävä pvm].
          </p>
        </div>

        <section className={section}>
          <h2 className={h2}>Rekisterinpitäjä</h2>
          <p className={body}>
            Pirkanmaan erikoiskahviyhdistys PErKY ry, Tampere. Yhteydenotot
            tietosuoja-asioissa: {CONTACT_EMAIL_DISPLAY}. Yhteyshenkilö:
            [täydennettävä].
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Mitä tietoja keräämme</h2>
          <p className={body}>
            Sivusto ei vaadi rekisteröitymistä eikä kerää nimiä tai
            yhteystietoja. Suostumuksellasi keräämme analytiikkatyökaluilla
            teknisiä käyttötietoja: käytetyt sivut ja niillä vietetty aika,
            selain ja laitetyyppi, karkea sijainti maan tarkkuudella sekä
            viittaava sivusto. Tietoja käsitellään tilastollisessa muodossa,
            eikä niitä käytetä yksittäisten kävijöiden tunnistamiseen.
          </p>
          <p className={body}>
            Jos otat meihin yhteyttä sähköpostilla, käsittelemme viestissä
            antamiasi tietoja vain kysymyksesi hoitamiseksi.
          </p>
        </section>

        <section className="flex flex-col gap-4 border-t-rule border-coffee pt-5">
          <h2 className={h2}>Evästeet ja käytetyt työkalut</h2>
          <div className="flex flex-col gap-[14px]">
            <Card title="Välttämättömät">
              Muistavat evästevalintasi selaimen paikallisessa muistissa. Näitä
              ei voi kytkeä pois, koska sivusto ei toimi ilman niitä. Peruste:
              oikeutettu etu sivuston toiminnan varmistamiseksi.
            </Card>
            <Card title="Tilastointi — Umami">
              Kertoo kävijämäärät ja sen, mitkä sisällöt kiinnostavat. Umami on
              evästeetön tilastointityökalu: se ei tallenna IP-osoitteita eikä
              seuraa kävijöitä sivustojen välillä. Palvelun tarjoaa Umami Cloud,
              ja tiedot säilytetään EU-alueella. Peruste: suostumus.
            </Card>
            <Card title="Käytön analytiikka — Hotjar ja Microsoft Clarity">
              Tuottavat lämpökarttoja ja tallenteita siitä, miten sivustoa
              käytetään, jotta voimme korjata hankalia kohtia. Tekstikentät ja
              mahdolliset henkilötiedot peitetään tallenteissa. Peruste:
              suostumus.
            </Card>
          </div>
          <p className={body}>
            Analytiikkatietoja säilytetään enintään [täydennettävä] kuukautta,
            minkä jälkeen ne poistetaan tai koostetaan tilastoiksi.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Tietojen luovutus</h2>
          <p className={body}>
            Emme myy tai luovuta tietoja markkinointitarkoituksiin.
            Tilastoinnin osalta tietoja käsittelee puolestamme Umami. Käytön
            analytiikan osalta tietoja käsittelevät puolestamme Hotjar ja
            Microsoft Clarity, jotka voivat käsitellä niitä myös EU- ja
            ETA-alueen ulkopuolella; siirto perustuu Euroopan komission
            vakiolausekkeisiin. Lisäksi tietoja käsittelee sivuston tekninen
            ylläpitäjä.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Oikeutesi</h2>
          <p className={body}>
            Tietosuoja-asetus antaa sinulle oikeuden tarkastaa itseäsi koskevat
            tiedot, pyytää niiden oikaisua tai poistamista sekä rajoittaa
            käsittelyä. Käytännössä emme kerää nimeä, sähköpostiosoitetta tai
            muuta tunnistetta, jolla analytiikkatiedot voisi yhdistää sinuun.
            Siksi emme pysty etsimään tai poistamaan yksittäisen kävijän
            tietoja pyynnöstä — meillä ei yksinkertaisesti ole keinoa
            tunnistaa, mikä osa aineistosta on sinun.
          </p>
          <p className={body}>
            Tehokkain tapa hallita tietojasi on peruuttaa suostumus
            tilastointiin ja käytön analytiikkaan, minkä jälkeen keräys lakkaa
            välittömästi. Voit myös tyhjentää evästeet selaimen asetuksista,
            jolloin aiempi selaimeesi tallennettu tunniste katoaa. Jos olet
            ollut meihin yhteydessä sähköpostilla, sen viestit ovat
            henkilötietoja ja voit pyytää niiden poistamista osoitteesta{' '}
            {CONTACT_EMAIL_DISPLAY}.
          </p>
          <p className={body}>
            Sinulla on aina oikeus tehdä valitus tietosuojavaltuutetun
            toimistoon, jos katsot että käsittelemme tietoja virheellisesti.
          </p>
          <p className={body}>
            Evästevalintasi voit vaihtaa{' '}
            <Link href="/">etusivun alalaidan Evästeasetukset-linkistä</Link>.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Muutokset</h2>
          <p className={body}>
            Päivitämme selostetta, jos sivuston tietojenkäsittely muuttuu.
            Merkittävistä muutoksista kerromme sivuston etusivulla.
          </p>
        </section>

        <div>
          <Link
            href="/"
            className="tkv-link-plain inline-block rounded-sm border-rule border-coffee px-[18px] py-3 font-display text-[16px] font-bold"
          >
            ← Takaisin etusivulle
          </Link>
        </div>
      </main>

      <footer
        className="tkv-surface-dark tkv-gutter-narrow py-[clamp(24px,5vw,36px)] text-[13px]"
        style={{ color: 'rgba(247, 243, 238, 0.72)' }}
      >
        © 2026 PErKY ry · Tampereen kahviviikko 1.–11.10.2026
      </footer>
    </div>
  );
}
