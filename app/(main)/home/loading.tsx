import React from 'react'

const HomeLoading = () => {
  return (
    <div className='cursor-default pb-10 pl-4 sm:pl-10 md:pl-55  lg:pl-55  w-full pr-4 sm:pr-10 md:pr-10'>
      <div className='my-4 py-4 flex justify-between items-center'>
        <div className='bg-neutral-800/50 animate-pulse w-40 h-8 rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse w-50 h-6 rounded-xl' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-28 gap-4 mb-10'>
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
      </div>
      {/* <div>
        <div className=' w-full h-90 rounded-2xl p-6'>
          <div className='flex justify-between items-center'>
            <div className='bg-neutral-800 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800 animate-pulse px-18 py-4 rounded-2xl'></div>
            <div className='bg-neutral-800 animate-pulse px-18 py-4 rounded-2xl'></div>
          </div>
          <div className='flex flex-col justify-around h-full w-full'>
            <div className='bg-neutral-800 py-4 w-full animate-pulse rounded-xl'></div>
            <div className='bg-neutral-800 py-4 w-full animate-pulse rounded-xl'></div>
            <div className='bg-neutral-800 py-4 w-full animate-pulse rounded-xl'></div>
            <div className='bg-neutral-800 py-4 w-full animate-pulse rounded-xl'></div>
          </div>
        </div>
      </div> */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 w-full'>
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl h-80'></div>
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl h-80'></div>
      </div>
      {/* <div>
        <div className='w-full h-70 bg-neutral-800/50 mt-10 rounded-2xl animate-pulse'></div>
      </div> */}
    </div>
  )
}

export default HomeLoading