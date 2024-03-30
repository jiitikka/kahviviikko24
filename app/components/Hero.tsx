import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='z-0 h-screen bg-beans-bg-image bg-cover'>
        <div className='z-10 bg-white opacity-80 bg-blend-overlay h-full w-full absolute'></div>
        <div className='z-20 flex align-middle items-center justify-center h-full w-full'>
            <Image className='z-30 h-96 opacity-100 p-4 bg-white/50 md:bg-transparent md:p-16 p- lg:p-40' alt="Tampereen Kahviviikko Logo" src={"/TKV24 Logo.svg"} fill></Image>
            <Image className='z-20 absolute left-0 bottom-0' alt="Beans partial right<" src={"/bg bean left.svg"} width={300} height={1000}></Image>
            <Image className='z-20 absolute right-0 top-0' alt="Beans partial left" src={"/bg bean right.svg"} width={800} height={1000}></Image>
        </div>        
    </div>
  )
}

export default Hero