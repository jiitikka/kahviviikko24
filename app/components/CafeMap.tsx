import React from 'react'

const CafeMap = () => {
  return (
    <div className='flex justify-center w-full bg-black/80'>
        <iframe
          className='w-full max-w-[1440px]'
          title="Kartta osallistuvista kahviloista"
          src="https://www.google.com/maps/d/u/2/embed?mid=14UzbV4LVQPg3s4P_e9syh01vkAy1CNM&ehbc=2E312F"
          width="640"
          height="480"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
  )
}

export default CafeMap