import React from 'react'
import Event from './Event'
import SideHeading from './SideHeading'

const heading1 = "Kahviviikon aikataulu";
const heading2 = "Kahviviikon aikana tapahtuu";
const description = "Osana Tampereen kahvi­viikkoa tullaan näkemään eri­laisia kahvi­aiheisia tapahtumia ympäri kaupunkia. Nämä tapahtumat on kerätty tälle sivulle. \n \n Lisäksi osa kahviloista järjestää omia tapahtumiaan. Seuraathan Tampereen kahviviikon (Instagram: @tampereekahviviikko) sekä kahviloiden omia sosiaalisen median tilejä.";

const EventTimeline = () => {
  return (
    <div className='z-0 bg-cup-left-bg-image bg-cover bg-fixed relative snap-start scroll-mt-20' id="events">
      <div className='z-0 bg-black opacity-80 bg-blend-multiply h-auto w-auto left-0 right-0 top-0 bottom-0 absolute'></div>

      <div className='flex justify-center'>
        <div className='z-10 w-full flex flex-row flex-wrap lg:flex-nowrap gap-6 lg:gap-16 text-white p-4 md:p-10 max-w-[1440px]'>
            <SideHeading
                heading1={heading1}
                heading2={heading2}
                description={description}
                isDesc={true}
                isBlackText={false}
              />          
          <div className='z-10 flex flex-col lg:4/6'>
            <Event link="" 
                name='Kahviviikko alkaa 🎉' 
                address='' 
                time="Ma 8.4.2024" 
                description=''
                milestone={true}
                isLast={false}/>
            <Event link="https://forms.gle/SnH52KFiziREMVhw7" 
              name='Cupping Pirkanmaan paahtimolla ☕️' 
              address='Pirkanmaan paahtimo, Patamäenkatu 2' 
              time="Ma 8.4.2024 klo 17 (kesto n. 1h)" 
              description='Tässä tapahtumassa pääset maistelemaan kattauksen paahtimomme kahveja. 
              Paahtimon asiantuntija Pekka taustoittaa kahvin matkaa kahvipensaasta paahtimolle ja 
              kertoo mm. kahvin eri käsittelytavoista. Kahvi ei tarkoita vain yhtä ja samaa kahvia - 
              sen pääset kokemaan itse. Tapahtumaan mahtuu 10 ensimmäistä ilmoittautunutta.'
              milestone={false}
              isLast={false}/>
            <Event link="mailto:info@kahwe.fi" 
              name='Puhetta ja maistelua kahvin hedelmälihasta (cascara) 🍒' 
              address='Kahwe Roastery, Hatanpään valtatie 40' 
              time="Ti 9.4. klo 15.30 (kesto n. 1h)" 
              description='Kahvimarjan hedelmäliha (cascara) on monelle uusi tuttavuus. Tapahtumassa pääset tutustumaan cascaraan ja siitä uutettuun juomaan. Mukaan mahtuu 10 ensimmäistä ilmoittautunutta. Ilmoittautumiset: info@kahwe.fi'
              milestone={false}
              isLast={false}/>
            <Event link="" 
              name='Heikkilän Juustolan luomutäysmaitoon valmistetut kahvit veloituksetta ☕️' 
              address='Mokkamestareiden myymälä, Verkatehtaankatu 9' 
              time="La 13.4. klo 11–16 (tai niin kauan kuin tavaraa riittää.)" 
              description='Latte Art Throwdown jouduttiin perumaan vähäisen osallistujamäärän vuoksi. Sen sijaan Mokkamestarien myymälällä kaikki Heikkilän Juustolan luomutäysmaitoon valmistetut kahvit veloituksetta! 
              Tarjous voimassa niin kauan kuin tavaraa riittää. Maidot tapahtumaan tarjoaa Heikkilän juustola ja kahvit Mokkamestarit. 
              Myymälällä sinua palvelevat kahvikouluttaja Niina Varjoranta sekä pääpaahtaja Long Nguyen. Tervetuloa!'
              milestone={false}
              isLast={false}/>
            <Event link="" 
              name='Kahviviikko afterparty 🪩' 
              address='Onda Music and Arts Cafe, Aleksanterinkatu 22' 
              time="La 13.4. klo 19.00->" 
              description='Tule juhlistamaan kaikkien aikojen Tampereen kahviviikkoa tapahtuman rentoon afterpartyyn.'
              milestone={false}
              isLast={false}/>
            <Event link="" 
              name='Kahviviikko päättyy 🙏' 
              address='' 
              time="Su 14.4.2024" 
              description=''
              milestone={true}
              isLast={false}/>
            <Event link="" 
              name='Epäkantiskortin voimassaolo päättyy 👋' 
              address='' 
              time="Su 21.4.2024" 
              description=''
              milestone={true}
              isLast={true}/>
          </div>
        </div>
  
      </div>    
    </div>  )
}

export default EventTimeline