import React from 'react'
import img1 from '../assetes/image.webp'
import img2 from '../assetes/image (1).webp'
import img3 from '../assetes/image (2).webp'
import img4 from '../assetes/image (3).webp'



const Website = () => {
  return (
    <div>
    <div className='flex justify-between mx-2 py-6'>
       <h1 className='font-semibold text-xl'>From the Community</h1>
       <h1 className='font-semibold text-sm'>View All</h1>
    </div>
    <div className='flex items-center justify-evenly gap-6 flex-wrap'>
        <img className='h-72 w-80' src={img1} alt="" />
          <img className='h-72 w-80' src={img2} alt="" />
           <img className='h-72 w-80' src={img3} alt="" />
          <img className='h-72 w-80' src={img4} alt="" />
           <img className='h-72 w-80' src={img1} alt="" />
          <img className='h-72 w-80' src={img2} alt="" />
           <img className='h-72 w-80' src={img3} alt="" />
          <img className='h-72 w-80' src={img4} alt="" />
        </div>
    </div>
  )
}

export default Website