import React from 'react'
import SectionContainer from './SectionContainer'
import Image from 'next/image'
import SideHeading from './SideHeading';

const heading1 = "Mikä kahviviikko on";

const About = () => {
  return (
    <div className='bg-cups-bg-image bg-cover bg-fixed snap-start scroll-mt-20' id="about">

      <div className='flex flex-row flex-wrap md:flex-nowrap gap-6 lg:gap-16 text-white p-4 md:p-10 2xl:px-80'>
        <SideHeading
          heading1={heading1}
          heading2={""}
          description={""}
          isDesc={false}
        />
        <div className='flex flex-col xxl:flex-row md:basis-3/6 lg:basis-4/6'>
          <div className='flex flex-row flex-wrap lg:flex-nowrap gap-6 lg:gap-16'>
            <div className='flex min-w-60 max-w-96 flex-col gap-4'>
              <h2>Kahvilat ja paahtimot keskiössä</h2>
                <p>
                  Tampereen kahviviikko on syntynyt rakkaudesta hyvään kahviin ja halusta nostaa esiin mahtavia 
                  Tampereen seudun kahviloita. Kahviviikkoa järjestää tiimi vapaaehtoisia ja toimintaa tukemassa 
                  on kolme tamperelaista pienpaahtimoa: Kahwe, Mokkamestarit ja Pirkanmaan paahtimo. 
                  Kahviviikko tapahtuu pääosin Tampereen seudun kahviloissa, joista saat leimat tapahtuman epäkantiskorttiin. 
                  <a className='underline hover:text-brand-pink' href='#cafes'>Mukana olevat kahvilat löydät täältä</a>. Lisäksi varsinaisen kahviviikon aikana järjestetään erilaisia 
                  tapahtumia, joista <a className='underline hover:text-brand-pink scr' href='#events'>lisätietoja löydät täältä</a>.
                </p>
            </div>
            <div className='flex min-w-60 max-w-96 flex-col gap-4'>
              <h2>Epäkantiskortti</h2>
              <p>
                Epäkantiskortti on kanta-asiakaskortin vastakohta: saat leimoja kun kierrät eri kahviloita. Kaava on helppo:
              </p>
              <ul>
                <li> ➡ Mene kahvilaan ja osta kahvijuoma </li>
                <li> ➡ Ostetusta kahvista saat passiisi leiman </li>
                <li> ➡ Toista sama eri kahviloissa</li>
                <li> ➡ Joka viides kahvi on ilmainen</li>
              </ul>
              <p>
                Passi on voimassa vielä viikon varsinaisen 
                kahviviikon päättymisen jälkeen eli su 22.4. asti.
              </p>
              <div className='flex justify-center'>
                <Image alt="Kuva epäkantiskortin kansipuolesta" src="/epakantiskortti.png" height={205} width={176}></Image>
              </div>           
            </div>
          </div>
          <div className='flex flex-col gap-x-6	gap-y-6'>
              <h2>Yhteistyökumppanit</h2>
              <div className='flex flex-row flex-wrap gap-x-6	gap-y-6 lg:gap-16 justify-center md:justify-start'>
                <a href='https://www.kahwe.fi'>
                  <Image className='h-24 w-auto' src="/kahwelogo.png" alt="Kahwe Roastery Logo" style={{objectFit: "contain"}} height={168} width={200}></Image>
                </a>
                <a href='https://www.mokkamestarit.fi'>
                  <Image className='h-24 w-auto' src="/mokkamestaritlogo.png" alt="Mokkamestarit Logo" style={{objectFit: "contain"}} height={168} width={173}></Image>
                </a>
                <a href='https://www.pirkanmaanpaahtimo.fi'>
                  <Image className='h-24 w-auto' src="/pplogo.png" alt="Pirkanmaan paahtimo Logo" style={{objectFit: "contain"}} height={168} width={142}></Image>
                </a>
              </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default About