import React from 'react'

export const MatricsLoading = () => {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-28 gap-4 mb-10'>
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
        <div className='bg-neutral-800/50 animate-pulse rounded-2xl' />
      </div>
    </div>
  )
}

