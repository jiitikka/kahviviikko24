import React from 'react'
import SideHeading from './SideHeading'
import OrganizerPerson from './OrganizerPerson'

// const listOfOrganizers = [
//   ["Jani Tikka", "Jani vastaa tapahtuman ja epäkantiskortin ilmeestä, nettisivuista ja koordinoi tapahtumaa. Jani työs­kentelee UX/UI Designerina Vincitillä, mutta hänen sydämensä sykkii hyville kahveille. Jani harrastaa kahveja, ja hänen intohimonsa on kehittää Tampereen kahvikulttuuria.", "/organizers/jani.png"], 
//   ["Pekka Heinonen", "Pekka koordinoi yhteistyötä kahviloiden ja toimii yhteyshenkilönämme Pirkanmaan paahtimolle. Hän on pitkän linjan barista, joka toimii asiantuntijana Pirkan­maan Paahtimolla. Hänellä on koke­musta niin kahvilan pitämisestä, kahvin paahtamisesta kuin myös kahvi­alan kilpailuista.", "/organizers/pekka.png"], 
//   ["Joel Marttala", "Joel koordinoi yhteistyötä kahviloiden ja vastaa yhteistyöstä Kahwe Roasteryn kanssa. Joel on ravintola-alan monitaituri. Tällä entisellä kokilla ja baristalla on pitkä kokemus kahvialalta ja nykyään hän toimii yrittäjänä ja paahtaa kahvia Kahwe Roasteryllä, jonka perustaja hän on.", "/organizers/joel.png"], 
//   ["Niina Varjoranta", "Niina vastaa tapahtuman somekanavista yhdessä Pinja Latvalan kanssa. Niina koordinoi yhteistyötä kahviloiden kanssa ja toimii kontaktinamme Mokkamestareille. Niina on myös suunnitellut tapahtuman julisteen. Kokenut barista työskentelee projekti- ja myymäläpäällikkönä Mokkamestareilla.", "/organizers/niina.png"]
// ];

const listOfOrganizers = [
  ["Jani Tikka", "Jani vastaa tapahtuman asiakasviestinnästä, konseptista, visuaalisesta ilmeestä sekä nettisivuista. Jani työs­kentelee UX/UI Designerina Vincitillä.", "/organizers/jani.png"], 
  ["Pekka Heinonen", "Pekka koordinoi yhteistyötä kahviloiden kanssa ja toimii yhteyshenkilönämme Pirkanmaan paahtimolle. Hän toimii kahviasiantuntijana Pirkan­maan Paahtimolla.", "/organizers/pekka.png"], 
  ["Niina Varjoranta", "Niina vastaa tapahtuman sometileistä, koordinoi kahvilayhteistyötä ja toimii linkkinä Mokkamestareille, jossa hän työskentelee myymäläpäällikkönä. Niina on myös suunnitellut tapahtuman julisteen.", "/organizers/niina.png"],
  ["Joel Marttala", "Joel koordinoi yhteistyötä kahviloihin ja vastaa tapahtuman yhteistyöstä Kahwe Roasteryn kanssa. Joel toimii kahvinpaahtajana sekä yrittäjänä perustamassaan yrityksessä Kahwe Roasteryssä.", "/organizers/joel.png"] 
];

//flex flex-row flex-wrap gap-4 lg:gap-10 lg:basis-4/6
const organizers = listOfOrganizers.map((organizer, index) => 
<OrganizerPerson key={index} name={organizer[0]} alt={organizer[0]+" kuva"} src={organizer[2]} description={organizer[1]} />);


const Organizers = () => {
  return (
    <div className=' bg-cups-bg-image bg-cover flex justify-center' id="organizers">
      <div className='flex flex-col md:flex-row gap-4 gap-y-10 w-full lg:gap-10 text-white p-4 md:p-10 max-w-[1440px]'>
        <SideHeading
          heading1='Kahviviikon Tiimi'
          heading2='Yhteistyötä kahvin voimalla'
          description='Kahviviikko järjestyy vapaaehtoisvoimin. Tiimiläisiä yhdistää rakkaus kahviin ja intohimo kehittää Tampereen kahvilaskeneä entistäkin paremmaksi. Varsinaisen tiimin lisäksi muita tapahtumaa mahdollistamassa olevia henkilöitä ovat tapahtuman somesisällöistä vastaava Pinja Latvala sekä mediayhteyksistä vastaava Sanna Tikka.'
          isDesc={true}
          isBlackText={false}
        />
        <div className='flex flex-row flex-wrap md:grid md:grid-cols-2 gap-6 gap-y-10 align-top content-start items-start md:grid-rows-2 lg:gap-10 lg:basis-4/6'>{organizers}</div>
      </div>
    </div>
  )
}

export default Organizers