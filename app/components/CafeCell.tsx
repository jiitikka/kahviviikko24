import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

interface Props {
    alt: string,
    src: string,
    href: string,
}

const CafeCell = (props: Props) => {
  return (
    <a href={props.href} className='bg-white h-32 w-32 min-[400px]:h-[180px] min-[400px]:w-[180px] lg:h-[180px] lg:w-[180px] hover:drop-shadow-md hover:border'>
        <Image src={props.src} alt={props.alt} height={200} width={200} style={{objectFit: "contain"}} />
    </a>
  )
}

CafeCell.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    href: PropTypes.string
}

export default CafeCell