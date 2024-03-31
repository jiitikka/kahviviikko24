import React from 'react'
import CafeCell from './CafeCell'

const CafesParticipating = () => {
  const listOfCafes = [["/cafes/asema_logo.png", "Aseman kahvila logo"], ["/cafes/hidden_logo.png", "Thé Hidden logo"], ["/cafes/kaffila_logo.png", "Kaffila logo"], ["/cafes/kahiwa_logo.png", "Kahiwa Pirkkala logo"], ["/cafes/kokko_logo.png", "Kahvibaari Kokko logo"], ["/cafes/marco_logo.png", "Boulangerie Marco logo"], ["/cafes/metso_logo.png", "Cafe Metso logo"], ["/cafes/mimosa_logo.png", "Cafe and Bakery Mimosa logo"], ["/cafes/mokkamestarit_logo.png", "Mokkamestarit logo"], ["/cafes/onda_logo.png", "Music & Arts Cafe Onda"], ["/cafes/pala_logo.png", "Cafe Pala logo"], ["/cafes/puusti_logo.png", "Cafe Puusti logo"], ["/cafes/runo_logo.png", "Kahvila Runo logo"], ["/cafes/siiri_logo.png", "Kahvila Siiri logo"], ["/cafes/vuohi_logo.png", "Vihreä vuohi logo"]];

  const cafes = listOfCafes.map((cafe) => 
  <CafeCell alt={cafe[1]} src={cafe[0]} />);

  return (
    <div className='flex flex-row flex-wrap gap-x-6	gap-y-6 lg:gap-16 text-white p-4 md:p-10 bg-beans-bg-image bg-cover'>
      <h1 className='flex-initial max-w-96 text-6xl md:text-8xl'>Mukana olevat kahvilat</h1>
      <div className='flex flex-row w-full flex-wrap md:w-2/3'>
        {cafes}
      </div>

      {/* <div className=' bg-white opacity-80 bg-blend-lighten h-full w-full absolute'></div> */}

    </div>
  )
}

export default CafesParticipating