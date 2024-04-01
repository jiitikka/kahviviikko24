import React from 'react'

const Footer = () => {
  return (
    <div className='w-full flex flex-row flex-wrap justify-center bg-brand-pink text-white gap-4 lg:gap-10 p-4 lg:p-10'>
      <p>Yhteydenotot: tampereenkahviviikko(at)gmail.com</p>
      <p>Taustakuvat: Unsplash</p>
      <p>© Jani Tikka/Tampereen kahviviikko 2024</p>
      <a className='flex justify-center align-middle items-center h-8 w-8 border-2 rounded-full hover:bg-white hover:text-brand-pink' href='#hero'> ⬆ </a>
    </div>
  )
}

export default Footer