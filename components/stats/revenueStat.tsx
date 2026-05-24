import React, { useState } from 'react'
import { ArrowUp, ScrollText } from 'lucide-react';
import useStats from '@/hooks/useStats';

const RevenueStat = (props:any) => {
/*   const [frame, setFrame] = useState("1w");
  const { data, isLoading, error } = useStats(frame);
  console.log(data)
  const totalRevenue = data?.totalRevenue
  const formatted = totalRevenue?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }) */
  return (
    <>
      {
        props.loading ?
          <>

            <div className='bg-neutral-900 w-full h-33 rounded-lg animate-pulse'>

            </div>
          </>
          :
          <div className='border border-neutral-800 rounded-xl border-solid p-4 hover:border-neutral-700 transition'>

            <div className='mb-6'>
              <div className='flex items-center gap-4'>

                <div className='rounded-lg flex items-center justify-center p-1 bg-neutral-900'>
                  <ScrollText className='text-indigo-500' />
                </div>
                <div>
                  <h4 className='text-neutral-200 font-bold'>
                    Total Revenue
                  </h4>
                </div>
              </div>
            </div>
            <div className=''>
              <h1 className='text-2xl font-bold text-neutral-300'>
                {props.value}
              </h1>
            </div>




          </div>

      }
    </>
  )
}

export default RevenueStat