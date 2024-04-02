import React from 'react'
import SideHeading from './SideHeading'
import OrganizerPerson from './OrganizerPerson'

const listOfOrganizers = [
  ["Jani Tikka", "Jani työs­kentelee IT-alalla mutta hänen sydämensä sykkii hyville kahveille. Jani harrastaa kahveja, ja hänen kotoaan löytyykin jos jonkinlaista välineistöä kahviin liittyen.", "/bg_beans.jpg"], 
  ["Pekka Heinonen", "Pekka on pitkän linjan barista, joka työskentelee Pirkan­maan Paahtimolla. Hänellä on koke­musta niin kahvilan pitämisestä, kahvin paahtamisesta kuin myös kahvi­alan kilpailuista.", "/epakantiskortti.png"], 
  ["Joel Marttala", "Joel on kokenut kahvialan ammattilainen. Hänellä on pitkä kokemus baristana ja nykyään paahtaa kahvia Kahwe Roasteryllä.", "/epakantiskortti.png"], 
  ["Niina Varjoranta", "Niina vastaa ", "/epakantiskortti.png"]
];

const organizers = listOfOrganizers.map((organizer, index) => 
<OrganizerPerson key={index} name={organizer[0]} alt={organizer[0]+" kuva"} src={organizer[2]} description={organizer[1]} />);


const Organizers = () => {
  return (
    <div className='bg-red-200' id="organizers">
      <div className='flex flex-col md:flex-row gap-4 lg:gap-10 p-4 lg:p-10'>
        <SideHeading
          heading1='Kahviviikon Tiimi'
          heading2=''
          description=''
          isDesc={false}
        />
        <div className='flex flex-row flex-wrap gap-10 lg:basis-4/ 6'>{organizers}</div>
      </div>
    </div>
  )
}

export default Organizers