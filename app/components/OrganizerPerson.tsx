import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

interface Props {
    name: string,
    description: string,
    src: string,
    alt: string
}

const OrganizerPerson = (props: Props) => {
  return (
    <div className='flex flex-row flex-wrap xl:flex-nowrap gap-7 lg:gap-10 items-center lg:basis-1/2'>
        <Image className='rounded-full h-60 w-auto' src={props.src} alt={props.alt} height={300} width={180} style={{objectFit: "cover"}} />
        <div className='flex flex-col gap-2 min-w-36'>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    </div>
  )
}

OrganizerPerson.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string
}

export default OrganizerPerson