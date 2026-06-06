import React from 'react'

const ProductLoading = () => {
  return (
    <div className='cursor-default pb-10 pl-4 sm:pl-10 md:pl-55  lg:pl-55  w-full pr-4 sm:pr-10 md:pr-10 my-4 py-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-28 gap-4 mb-10'>
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
      </div>
      <div>
        <div className=' w-full h-90 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <div className='bg-neutral-800/50 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800/50 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800/50 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800/50 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800/50 animate-pulse px-18 py-4 rounded-2xl'></div>
          </div>
          <div className='bg-neutral-800/50 h-full w-full mt-6 rounded-2xl animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default ProductLoading