import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

interface Props {
    name: string,
    time: string,
    address: string,
    description: string,
    link: string,
    milestone: boolean,
    last: boolean
}
const milestoneEventStyles = "h-6 w-6 grow-0 shrink-0 rounded-xl bg-brand-pink"

const Event = (props: Props) => {
    var styles = "h-6 w-6 grow-0 shrink-0 rounded-xl bg-white";
    if (props.milestone) {
        styles = milestoneEventStyles;        
    }
  return (
    <div className='flex flex-row gap-6'>
        <div className='flex flex-col gap-4'>
            <div className={styles}></div>
            <div hidden={props.last} className='w-[2px] bg-white h-full m-auto'></div>
        </div>
        <div className='text-white flex-col max-w-2xl'>
            <div className='flex flex-row justify-between'>
                <h2>{props.name}</h2><a hidden={props.link===""} href={props.link}><Image className='h-8 w-auto' height={24} width={24} alt="Hyperlink icon" src={'/link.svg'}/></a>
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