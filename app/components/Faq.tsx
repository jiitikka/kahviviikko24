import React from 'react'
import SideHeading from './SideHeading';

const Faq = () => {

  const heading1 = "Usein kysytyt kysymykset";
  const heading2 = "";
  const description = "";

  return (
    <div className='z-0 bg-beans-bg-image bg-cover bg-fixed relative snap-start scroll-mt-20' id="faq">
      <div className='z-0 bg-white opacity-80 bg-blend-lighten h-full w-full absolute'></div>
      <div className='flex justify-center'>
        <div className='z-10 flex flex-row flex-wrap lg:flex-nowrap w-full gap-6 lg:gap-16 text-black p-4 md:p-10 max-w-[1440px]'>
          <SideHeading
              heading1={heading1}
              heading2={heading2}
              description={description}
              isDesc={false}
              isBlackText={true}
            />
          <div className='z-10 flex flex-col gap-6 w-full basis-6/6 lg:basis-4/6'>
  
            <h2>Epäkantiskortti</h2>
  
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Mistä saan epäkantiskortin ja mitä hyötyä kortista on?
              </h3>
              <p>
                Saat epäkantiskortin mistä tahansa tapahtumaan <a className='text-brand-dark-pink font-bold hover:text-brand-pink' href='#cafes'>osallistuvasta kahvilasta</a>. Kortilla saa joka viidennen kahvin ilmaiseksi. 
                Eli kun passissasi on neljä leimaa, saat kahvilasta ilmaisen kahvin/teen, ja viidennen leiman. Mikäli keräät kaikki 15 leimaa, voi epäkantiskortilla siis saada yhteensä kolme ilmaista kahvia.
              </p>
            </div>
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Saako leiman vain kahvista, entä tee?
              </h3>
              <p>
                Saat leiman epäkantiskorttiin kahvi- tai teejuomista.
              </p>
            </div>
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Mitä voin lunastaa viidennellä leimalla?
              </h3>
              <p>
                Kahvilat määrittävät itse, minkä juoman passilla saa lunastaa. Kun sinulla on ilmaiseen kahviin/teehen oikeuttava määrä leimoja kerättynä, voit lunastaa juoman kahvilan määrittämästä valikoimasta. 
              </p>
            </div>
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Voinko siis kerätä leimoja ja lunastaa kahveja vielä kahviviikon jälkeisellä viikolla, kun epäkantiskortti on vielä voimassa?
              </h3>
              <p>
                Kyllä, voit kerätä leimoja ja lunastaa kahveja koko epäkantiskortin voimassaoloajan eli <strong>22.4. asti</strong>. Tämän jälkeen leimoja ei voi enää kerätä, eikä kahveja lunastaa. 
              </p>
            </div>
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Miten saan epäkantiskortin täyteen, kun Kahiwa Pirkkala lopetti toimintansa kesken Kahviviikon?
              </h3>
              <p>
                Kahiwa Pirkkalan leiman voit noutaa mokkamestarit kahvi- ja teemyymälästä (annos ja leima tai ilmaisen 5. kahvin lunastus). 
              </p>
            </div>

            
            <h2>Kahvilat</h2>
  
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Onko kahviloilla erikoistuotteita kahviviikon aikana?
              </h3>
              <p>
                Kahviloilla voi olla kahvilakohtaisesti omia erikoisuuksia tarjolla kahviviikon aikana. Niistä tiedon löydät viimeistään paikanpäältä. Seuraa myös kahviloiden sekä @tampereenkahviviikko sometilejä.
              </p>
            </div>
  
            <div className='z-10 flex flex-col gap-2'>
              <h3>
                Miten kahvilat ovat auki kahviviikon aikana?
              </h3>
              <p>
                Aukioloajat vaihtelevat kahvilasta kahvilaan. Useimmat kahvilat ovat arkisin vähintään kuuteen asti auki, joten myös työpäivän jälkeen kiertäminen onnistuu. Tarkista kuitenkin tarkat aukioloajat kahviloiden omilta sivuilta tai sosiaalisen median tileiltä.
              </p>
            </div>

            <h2>Tapahtuma</h2>
  
              <div className='z-10 flex flex-col gap-2'>
                <h3>
                  Peruttiinko Latte Art Throwdown?
                </h3>
                <p>
                  Latte Art Throwdown -kilpailu jouduttiin valitettavasti perumaan, koska kisaan ei saatu riittävästi osallistujia. Sen sijaan Mokkamestarit tekevät ilmaiseksi kahveja Heikkilän Juustolan täysmaitoon. <a className='text-brand-dark-pink font-bold hover:text-brand-pink' href='#events'>Katso lisää täältä.</a>
                </p>
              </div>

          </div>
        </div>
      </div>    
    </div>
  )
}

export default Faq