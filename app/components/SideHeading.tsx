import React from 'react'
import PropTypes from 'prop-types'

interface Props {
    heading1: string,
    heading2: string,
    description: string,
    isDesc: boolean
}


const SideHeading = (props: Props) => {
    const descriptionContainer = (
        <div className='z-10 flex-initial max-w-96 flex flex-col gap-x-4 gap-y-4' hidden={!props.isDesc}>
            <h2>
                {props.heading2}
            </h2>
            <p>
                {props.description}
            </p>
        </div>
        )

  return (
    <div className='z-10 lg:max-w-96 flex flex-initial flex-row flex-wrap md:flex-nowrap lg:flex-col gap-x-4 gap-y-4 basis-6/6 lg:basis-2/6'>
        <h1 className='z-10 flex-initial max-w-96 text-6xl md:text-8xl drop-shadow-sm'>
            {props.heading1}
        </h1>
        {(props.isDesc) ? descriptionContainer : null}
    </div>  
    )
}

SideHeading.propTypes = {}

export default SideHeading