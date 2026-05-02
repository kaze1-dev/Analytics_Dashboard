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

            <div className='mb-4'>
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
            <div className='flex gap-4 flex-col'>
              <h1 className='text-2xl font-bold text-neutral-300'>
                {props.value}
              </h1>
              <div className='flex '>
              {/*   <div className='bg-blue-500/10 flex transition rounded-lg px-3 py-0.5 items-center gap-1'>
                  <div className=' '>

                    <ArrowUp className='w-4 text-blue-600  font-bold' />
                  </div>
                  <div className='text-xs text-blue-600 font-sans font-bold'>
                    10%
                  </div>
                </div> */}

              </div>
            </div>




          </div>

      }
    </>
  )
}

export default RevenueStat