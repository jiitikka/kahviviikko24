import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

interface Props {
    name: string,
    time: string,
    address: string,
    description: string,
    link: string,
}

const Event = (props: Props) => {
  return (
    <div className='flex flex-row gap-6'>
        <div className='flex flex-col gap-4'>
            <div className='h-6 w-6 rounded-xl bg-white'></div>
            <div className='w-[2px] bg-white h-full'></div>
        </div>
        <div className='text-white flex-col max-w-2xl'>
            <div className='flex flex-row justify-between'>
                <h2>{props.name}</h2><a hidden={props.link===""} href={props.link}><Image height={24} width={24} alt="Hyperlink icon" src={'/link.svg'}/></a>
            </div>
            <div className='flex flex-row wrap gap-4'>
                <h3>{props.time}</h3>
                <h3>{props.address}</h3>
            </div>
            <p>{props.description}</p>
        </div>
    </div>
  )
}

Event.propTypes = {}

export default Event