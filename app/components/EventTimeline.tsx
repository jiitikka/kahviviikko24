import React from 'react'
import Event from './Event'

const EventTimeline = () => {
  return (
    <div className='z-0 bg-cup-left-bg-image bg-cover bg-fixed relative'>
      <div className='z-0 bg-black opacity-80 bg-blend-multiply h-auto w-auto left-0 right-0 top-0 bottom-0 absolute'></div>
      <div className='z-10 flex flex-row flex-wrap gap-x-6	gap-y-6 lg:gap-16 text-black p-4 md:p-10'>
        <div className='z-10 flex-initial max-w-96 flex flex-col gap-x-4	gap-y-4'>
          <h1 className='z-10 text-white flex-initial max-w-96 text-6xl md:text-8xl drop-shadow-sm'>Kahviviikon aikataulu</h1>
          <div className='flex-initial max-w-96 flex flex-col gap-x-4	gap-y-4'>
            <h2 className='text-white'>Kahviviikon aikana tapahtuu</h2>
              <p className='text-white'>
                Osana Tampereen kahvi­viikkoa tullaan näkemään eri­laisia kahvi­aiheisia tapahtumia ympäri kaupunkia. Nämä tapahtumat 
                on kerätty tälle sivulle.
                <br/>
                <br/>
                Lisäksi osa kahviloista järjestää omia tapahtumiaan. Seuraathan Tampereen kahviviikon (Instagram: @tampereekahviviikko) 
                sekä kahviloiden omia sosiaalisen median tilejä.
              </p>
          </div>
        </div>
        <div className='z-10 flex flex-col gap-6 md:w-2/3'>
          <Event link="https://forms.gle/SnH52KFiziREMVhw7" 
            name='Cupping Pirkanmaan paahtimolla' 
            address='Patamäenkatu 2' 
            time="Ma 8.4.2024 klo 17" 
            description='Tässä tapahtumassa pääset maistelemaan kattauksen paahtimomme kahveja. 
            Paahtimon asiantuntija Pekka taustoittaa kahvin matkaa kahvipensaasta paahtimolle ja 
            kertoo mm. kahvin eri käsittelytavoista. Kahvi ei tarkoita vain yhtä ja samaa kahvia - 
            sen pääset kokemaan itse.'/>
          <Event link="https://forms.gle/SnH52KFiziREMVhw7" 
            name='Cupping Pirkanmaan paahtimolla' 
            address='Patamäenkatu 2' 
            time="Ma 8.4.2024 klo 17" 
            description='Tässä tapahtumassa pääset maistelemaan kattauksen paahtimomme kahveja. 
            Paahtimon asiantuntija Pekka taustoittaa kahvin matkaa kahvipensaasta paahtimolle ja 
            kertoo mm. kahvin eri käsittelytavoista. Kahvi ei tarkoita vain yhtä ja samaa kahvia - 
            sen pääset kokemaan itse.'/>
          <Event link="https://forms.gle/SnH52KFiziREMVhw7" 
            name='Cupping Pirkanmaan paahtimolla' 
            address='Patamäenkatu 2' 
            time="Ma 8.4.2024 klo 17" 
            description='Tässä tapahtumassa pääset maistelemaan kattauksen paahtimomme kahveja. 
            Paahtimon asiantuntija Pekka taustoittaa kahvin matkaa kahvipensaasta paahtimolle ja 
            kertoo mm. kahvin eri käsittelytavoista. Kahvi ei tarkoita vain yhtä ja samaa kahvia - 
            sen pääset kokemaan itse.'/>


        </div>
      </div>
    </div>  )
}

export default EventTimeline