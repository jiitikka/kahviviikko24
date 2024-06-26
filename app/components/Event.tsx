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
    isLast: boolean
}
const milestoneEventStyles = "h-8 w-8 grow-0 shrink-0 mt-[5px] rounded-full bg-brand-pink"

const Event = (props: Props) => {
    var styles = "h-8 w-8 grow-0 shrink-0 mt-[5px] rounded-full bg-white";
    if (props.milestone) {
        styles = milestoneEventStyles;        
    }
  return (
    <div className='flex flex-row gap-6'>
        <div className='flex flex-col'>
            <div className={styles}></div>
            <div hidden={props.isLast} className='w-[2px] bg-white h-full m-auto'></div>
        </div>
        <div className='flex text-white flex-col gap-2 max-w-2xl pb-6 lg:pb-10'>
            <div className='flex flex-row gap-2 justify-between'>
                <h2>{props.name}</h2><a className='h-8 w-8 shrink-0' hidden={props.link===""} href={props.link}><Image className='h-8 w-8' height={24} width={24} alt="Hyperlink icon" src={'/link.svg'}/></a>
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