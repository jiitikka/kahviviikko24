import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-10 flex align-middle items-center justify-left sticky top-0 h-20 bg-brand-pink'>
        <Image src="header logo.svg" alt="Tampereen Kahviviikko Text Logo" width={400} height={200} />
    </div>
  )
}

export default Header