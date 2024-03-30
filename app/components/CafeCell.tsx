import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const CafeCell = props => {
  return (
    <div className='bg-slate-300 h-[200px]'>
        <Image src={props.src} alt={props.alt} fill />
    </div>
  )
}

CafeCell.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

export default CafeCell