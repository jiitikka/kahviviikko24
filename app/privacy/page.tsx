import React from "react";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16 bg-white text-black">
      <section className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 w-fit rounded-full border-2 border-black bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          ← Takaisin etusivulle
        </Link>

        <h1 className="text-4xl md:text-5xl mb-4">Tietosuojaseloste</h1>
        <p>
          Tällä sivulla kerromme, miten Tampereen Kahviviikko -sivustolla
          käsitellään kävijätietoja.
        </p>

        <h2 className="text-2xl mt-6">Mitä tietoa keräämme?</h2>
        <p>
          Sivusto käyttää Google Analytics- ja Hotjar-analytiikkapalveluja,
          jotka keräävät anonyymia tai pseudonyymistä tietoa sivuston
          käytöstä, kuten:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>mitä sivuja katsellaan ja kuinka pitkään</li>
          <li>mistä käyttäjä on saapunut sivulle (esim. hakukone, some)</li>
          <li>millä laitteella ja selaimella sivua käytetään</li>
        </ul>
        <p>
          Emme kerää nimiä, sähköpostiosoitteita tai muita suorasti
          yksilöiviä tietoja analytiikkaa varten.
        </p>

        <h2 className="text-2xl mt-6">Mihin tietoja käytetään?</h2>
        <p>
          Käytämme analytiikkaa sivuston ja tapahtuman viestinnän
          kehittämiseen, esimerkiksi:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>ymmärrämme, mitä sisältöjä luetaan eniten</li>
          <li>voimme parantaa sivuston rakennetta ja käytettävyyttä</li>
        </ul>

        <h2 className="text-2xl mt-6">Evästeet ja suostumus</h2>
        <p>
          Analytiikkaa varten asetetaan evästeitä selaimeesi. Näitä
          käytetään mm. kävijämäärien ja käyntikertojen laskemiseen.
          Analytiikkaa ei ladata ennen kuin annat siihen suostumuksesi
          sivun alareunan evästebannerissa.
        </p>
        <p>
          Voit milloin tahansa poistaa suostumuksesi tyhjentämällä
          selaimen evästeet ja sivuston tallennetut tiedot. Tämän jälkeen
          sivu kysyy suostumuksen uudelleen.
        </p>

        <h2 className="text-2xl mt-6">Yhteydenotot</h2>
        <p>
          Mikäli sinulla on kysyttävää tietosuojasta tai analytiikan
          käytöstä, voit olla yhteydessä sähköpostitse:{" "}
          <a
            href="mailto:tampereenkahviviikko@gmail.com"
            className="underline underline-offset-2 text-brand-pink hover:text-brand-dark-pink"
          >
            tampereenkahviviikko(at)gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default PrivacyPage;


