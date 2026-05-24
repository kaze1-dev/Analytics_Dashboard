import { ArrowUp, UsersRound } from 'lucide-react'
import React, { useState } from 'react'
import useStats from '@/hooks/useStats';

const CustomerStat = (props: any) => {
/*   const [frame, setFrame] = useState("1w");
  const { data, isLoading, error } = useStats(frame); */
  return (
    <>
      {
        props.loading ?
          <div className='bg-neutral-900 w-full h-33 rounded-lg animate-pulse' />
          :
          <div className='border border-neutral-800 rounded-xl border-solid hover:border-neutral-700 transition p-4'>

            <div className='mb-6'>
              <div className='flex gap-4 items-center'>
                <div className='rounded-lg flex items-center justify-center p-1 bg-neutral-900'>
                  <UsersRound className='text-indigo-500' />
                </div>
                <div>
                  <h4 className='text-neutral-200 font-bold'>
                    Total Customers
                  </h4>
                </div>
              </div>

            </div>
            <div className=''>
              <h1 className='text-3xl font-bold text-neutral-300'>
                {props.value}
              </h1>
            </div>

         


          </div>
      }
    </>

  )
}

export default CustomerStat