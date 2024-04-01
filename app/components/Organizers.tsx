import React from 'react'
import SideHeading from './SideHeading'
import OrganizerPerson from './OrganizerPerson'

const listOfOrganizers = [
  ["Jani Tikka", "Lorem Ipsum", "/bg_beans.jpg"], 
  ["Pekka Heinonen", "Lorem Ipsum", "/epakantiskortti.png"], 
  ["Joel Marttala", "Lorem Ipsum", "/epakantiskortti.png"], 
  ["Niina Varjoranta", "Lorem Ipsum", "/epakantiskortti.png"]
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