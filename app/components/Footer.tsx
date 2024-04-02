import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full flex flex-row flex-wrap items-center justify-center bg-brand-pink text-white gap-4 lg:gap-10 p-4 lg:p-10'>
      <a href='https://instagram.com/tampereenkahviviikko'>
        <Image className="h-12 w-12 rounded-full border-2 border-brand-pink hover:border-white transition-colors" src="/Instagram.svg" alt="Link to our Instagram page" height={48} width={48}/>
      </a>
      <a href='https://facebook.com/tampereenkahviviikko'>
        <Image className='h-12 w-12 rounded-full border-2 border-brand-pink hover:border-white transition-colors' src="/Facebook.svg" alt="Link to our Instagram page" height={48} width={48}/>
      </a>
      <p>Yhteydenotot: tampereenkahviviikko(at)gmail.com</p>
      <p>Taustakuvat: Unsplash</p>
      <p>© Jani Tikka/Tampereen kahviviikko 2024</p>
      <a className='flex justify-center align-middle items-center rounded-full m-2 border-2 border-brand-pink hover:border-white hover:text-brand-pink transition-colors' href='#home'>
        <Image className='h-12 w-12 text-brand-pink' src="/top.svg" alt="Link to our top of the page" height={48} width={48}/></a>
    </div>
  )
}

export default Footer