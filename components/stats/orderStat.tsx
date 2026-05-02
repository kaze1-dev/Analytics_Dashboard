import { ArrowUp, Package2 } from 'lucide-react'
import React, { useState } from 'react'
import useStats from '@/hooks/useStats';

const OrderStat = (props: any) => {
/*   const [frame, setFrame] = useState("1w");
  const { data, isLoading, error } = useStats(frame);
  const orders = data?.totalOrders */

  return (
    <>
      {
        props.loading ?
          <div className='bg-neutral-900 w-full h-33 rounded-lg animate-pulse' />
          :
          <div className='border border-neutral-800 rounded-xl border-solid hover:border-neutral-700 transition p-4'>

            <div className='mb-4'>
              <div className='flex gap-4 items-center'>
                <div className='rounded-lg flex items-center justify-center p-1 bg-neutral-900'>
                  <Package2 className='text-indigo-500' />
                </div>
                <div>
                  <h4 className='text-neutral-200 font-bold'>
                    Total Orders
                  </h4>
                </div>
              </div>

            </div>
            <div className='flex flex-col gap-4 '>
              <h1 className='text-3xl font-bold text-neutral-300'>
                {props.value}
              </h1>
              <div className='flex  '>
                {/* <div className='flex bg-blue-500/10 transition rounded-lg px-3 py-0.5 items-center gap-1'>
                  <div className=''>
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

export default OrderStat