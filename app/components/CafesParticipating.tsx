import React from 'react'
import CafeCell from './CafeCell'
import SideHeading from './SideHeading';

const CafesParticipating = () => {
  const listOfCafes = [["/cafes/asema_logo.png", "Aseman kahvila logo", "https://www.asemankahvilatampere.fi/"], 
  ["/cafes/hidden_logo.png", "Thé Hidden logo", "https://www.instagram.com/thehidden.fi"], 
  ["/cafes/kaffila_logo.png", "Kaffila logo", "https://www.facebook.com/kaffila33100/"], 
  ["/cafes/kahiwa_logo.png", "Kahiwa Pirkkala logo", "https://www.kahiwacoffee.fi/"], 
  ["/cafes/kokko_logo.png", "Kahvibaari Kokko logo", "https://kokkokaleva.fi/"], 
  ["/cafes/marco_logo.png", "Boulangerie Marco logo", "https://www.boulangeriemarco.fi/"], 
  ["/cafes/metso_logo.png", "Cafe Metso logo", "https://www.cafemetso.fi/"], 
  ["/cafes/mimosa_logo.png", "Cafe and Bakery Mimosa logo", "https://www.facebook.com/CafeBakeryMimosa"], 
  ["/cafes/mokkamestarit_logo.png", "Mokkamestarit logo", "https://www.mokkamestarit.fi"], 
  ["/cafes/onda_logo.png", "Music & Arts Cafe Onda", "https://www.instagram.com/onda.tampere"], 
  ["/cafes/pala_logo.png", "Pala Café logo", "https://www.palacafe.fi/"], 
  ["/cafes/puusti_logo.png", "Cafe Puusti logo", "https://www.cafepuusti.fi/"], 
  ["/cafes/runo_logo.png", "Kahvila Runo logo", "https://kahvilaruno.fi/"], 
  ["/cafes/siiri_logo.png", "Kahvila Siiri logo", "https://www.facebook.com/KahvilaSiiri"], 
  ["/cafes/vuohi_logo.png", "Vihreä vuohi logo", "https://vihreavuohi.fi/"]];

  const cafes = listOfCafes.map((cafe, index) => 
  <CafeCell key={index} alt={cafe[1]} src={cafe[0]} href={cafe[2]} />);

  const heading1 = "Mukana olevat kahvilat";
  const heading2 = "Epäkantiskortti käy näissä kahviloissa";
  const description = "Kahviviikossa mukana on joukko loistavia Tampereen seudun kahviloita. Kaikille yhteistä on intohimoinen suhde asiakkaidensa palvelemiseen, ja tarjolla oleva laadukas pienpaahtimokahvi. Pääosa kahviloista sijaitsee Tampereen kantakaupungin alueella, muta mahtuupa joukkoon myös kahvilat Lielahdesta ja Lempäälästä sekä kaksi kahvilaa Pirkkalasta!";

  return (
    <div className='z-0 bg-beans-bg-image bg-cover bg-fixed relative' id="cafes">
      <div className='z-0 bg-white opacity-80 bg-blend-lighten h-full w-full absolute'></div>
      <div className='z-10 flex flex-row flex-wrap gap-6 lg:gap-16 text-black p-4 md:p-10'>
        <SideHeading
            heading1={heading1}
            heading2={heading2}
            description={description}
            isDesc={true}
          />

        <div className='z-10 flex flex-row justify-center gap-1 flex-wrap w-full lg:basis-4/6 content-center'>
          {cafes}
        </div>
      </div>
    </div>
  )
}

export default CafesParticipating