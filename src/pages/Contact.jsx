import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className=' text-gray-500'>263139 Kamaluaganja Nainital<br />Uttarakhand, India</p>
          <p className=' text-gray-500'>Tel: +91 94105 1721 <br /> Email: talktothrive@gmail.com</p>
          <p className=' font-semibold text-lg text-gray-600'>Talk to Thrive Partners:</p>
          <a href="https://www.wonderbrains.org/" target='_blank' className='underline text-blue-500 text-sm'>Wonder Brains Foundation</a>
        </div>
      </div>

    </div>
  )
}

export default Contact
