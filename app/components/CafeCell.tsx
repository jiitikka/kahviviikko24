import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

interface Props {
    alt: string,
    src: string
}

const CafeCell = (props: Props) => {
  return (
    <div className='bg-white h-[144px] w-[144px] lg:h-[180px] lg:w-[180px]'>
        <Image src={props.src} alt={props.alt} height={200} width={200} style={{objectFit: "contain"}} />
    </div>
  )
}

CafeCell.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

export default CafeCell