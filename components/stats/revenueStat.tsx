import React from 'react'
import useRevenue from '@/hooks/useRevenue';
import { ArrowUp, ScrollText } from 'lucide-react';

const RevenueStat = () => {
  const { data, isLoading, error } = useRevenue();
  const formatted = data?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
  return (
    <>
      {
        isLoading ?
          <>

            <div className='bg-neutral-900 w-full h-50 rounded-lg animate-pulse'>

            </div>
          </>
          :
          <div className='border border-neutral-800 rounded-xl border-solid p-4 hover:border-neutral-700 transition'>

            <div className='mb-4'>
              <div className='flex items-center gap-4'>

                <div className='rounded-lg flex items-center justify-center p-1 bg-neutral-900'>
                  <ScrollText className='text-blue-600' />
                </div>
                <div>
                  <h4 className='text-neutral-400 font-bold'>
                    Total Revenue
                  </h4>
                </div>
              </div>
            </div>
            <div className='flex gap-4 flex-col'>
              <h1 className='text-2xl font-bold text-neutral-300'>
                {formatted}
              </h1>
              <div className='flex '>
                <div className='bg-blue-500/10 flex transition rounded-lg px-3 py-0.5 items-center gap-1'>
                  <div className=' '>

                    <ArrowUp className='w-4 text-blue-600  font-bold' />
                  </div>
                  <div className='text-xs text-blue-600 font-sans font-bold'>
                    10%
                  </div>
                </div>

              </div>
            </div>

            <h5 className='text-xs text-neutral-400 mt-4'>
              From last week
            </h5>


          </div>

      }
    </>
  )
}

export default RevenueStat