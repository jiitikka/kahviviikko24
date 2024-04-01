import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

interface Props {
    name: string,
    description: string,
    src: string,
    alt: string
}

const CafeCell = (props: Props) => {
  return (
    <div className='flex flex-row gap-4 lg:gap-10'>
        <Image className='rounded-full h-60 w-32 md:h-72 md:w-40' src={props.src} alt={props.alt} height={300} width={180} style={{objectFit: "cover"}} />
        <div className='flex flex-col'>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    </div>
  )
}

CafeCell.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string
}

export default CafeCell