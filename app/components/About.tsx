import React from 'react'
import SectionContainer from './SectionContainer'
import Image from 'next/image'

const About = () => {
  return (
    <div className='flex flex-row flex-wrap gap-x-6	gap-y-6 lg:gap-16 text-white p-4 md:p-10 bg-cups-bg-image bg-cover bg-fixed'>
      <h1 className='flex-initial max-w-96 text-6xl md:text-8xl drop-shadow-lg'>Mikä kahviviikko on</h1>
      <div className='flex flex-col xxl:flex-row'>
        <div className='flex flex-row flex-wrap gap-x-6	gap-y-6 lg:gap-16'>
          <div className='flex-initial max-w-96 flex flex-col gap-x-4	gap-y-4'>
            <h2>Kahvilat ja paahtimot keskiössä</h2>
              <p>
                Tampereen kahviviikko on syntynyt rakkaudesta hyvään kahviin ja halusta nostaa esiin mahtavia 
                Tampereen seudun kahviloita. Kahviviikkoa järjestää tiimi vapaaehtoisia ja toimintaa tukemassa 
                on kolme tamperelaista pienpaahtimoa: Kahwe, Mokkamestarit ja Pirkanmaan paahtimo. 
                Kahviviikko tapahtuu pääosin Tampereen seudun kahviloissa, joista saat leimat tapahtuman epäkantiskorttiin. 
                Mukana olevat kahvilat löydät täältä. Lisäksi varsinaisen kahviviikon aikana järjestetään erilaisia 
                tapahtumia, joista lisätietoja löydät täältä.
              </p>
          </div>
          <div className='flex-initial max-w-96 flex flex-col gap-x-4	gap-y-4'>
            <h2>Epäkantiskortti</h2>
            <p>
              Epäkantiskortti on kanta-asiakaskortin vastakohta: saat leimoja kun kierrät eri kahviloita. Kaava on helppo:
            </p>
            <ul>
              <li> Mene kahvilaan ja osta kahvijuoma </li>
              <li> Ostetusta kahvista saat passiisi leiman </li>
              <li>Toista sama eri kahviloissa</li>
              <li>Joka viides kahvi on ilmainen</li>
            </ul>
            <p>
              Passi on voimassa vielä viikon varsinaisen 
              kahviviikon päättymisen jälkeen eli su 22.4. asti.
            </p>
            <Image alt="Kuva epäkantiskortin kansipuolesta" src="/epakantiskortti.png" height={205} width={176}></Image>
          </div>
        </div>
        <div className='flex flex-col gap-x-6	gap-y-6'>
            <h2>Yhteistyökumppanit</h2>
            <div className='flex flex-row flex-wrap gap-x-6	gap-y-6 lg:gap-16 justify-center md:justify-start'>
              <a href='https://www.kahwe.fi'>
                <Image className='h-24' src="/kahwelogo.png" alt="Kahwe Roastery Logo" style={{objectFit: "contain"}}	 height={168} width={200}></Image>
              </a>
              <a href='https://www.mokkamestarit.fi'>
                <Image className='h-24' src="/mokkamestaritlogo.png" alt="Mokkamestarit Logo" style={{objectFit: "contain"}}	 height={168} width={173}></Image>
              </a>
              <a href='https://www.pirkanmaanpaahtimo.fi'>
                <Image className='h-24' src="/pplogo.png" alt="Pirkanmaan paahtimo Logo" style={{objectFit: "contain"}} height={168} width={142}></Image>
              </a>
            </div>
          </div>
      </div>
    </div>
  )
}

export default About