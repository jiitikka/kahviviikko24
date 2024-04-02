import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='z-0 h-screen bg-beans-bg-image bg-cover bg-fixed relative' id="home">
        <div className='z-10 bg-white opacity-80 bg-blend-overlay h-full w-full absolute'></div>
        <Image className='z-20 absolute left-0 bottom-0' alt="Beans partial right" src={"/bg bean left.svg"} width={300} height={1000}></Image>
        <Image className='z-20 absolute right-0 top-0' alt="Beans partial left" src={"/bg bean right.svg"} width={800} height={1000}></Image>
        <div className='z-30 flex flex-col gap-10 h-full w-full items-center justify-center p-4 md:p-16 lg:p-40 2xl:px-80'>
            <Image className='z-30 h-auto w-auto max-w-7xl drop-shadow-[2px_2px_0_rgba(255,255,255,0.8)]' width={1121} height={640} alt="Tampereen Kahviviikko Logo" src={"/TKV24 Logo.svg"}></Image>
            <a className='z-30 py-2 px-8 border-2 border-black bg-black rounded-full text-white hover:text-black hover:bg-white text-1xl transition-colors animate-pulse' href='#about'>Lue lisää</a>        
        </div>
    </div>
  )
}

export default Hero