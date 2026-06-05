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
          <div className='bg-neutral-900 w-full h-28 rounded-lg animate-pulse' />
          :
          <div className='border border-neutral-800 rounded-xl border-solid hover:border-neutral-700 transition-all p-4'>

            <div className='mb-2'>
              <div className='flex gap-4 items-center'>
                {/* <div className='rounded-lg flex items-center justify-center p-1 bg-neutral-900'>
                  <Package2 className='text-indigo-500' />
                </div> */}
                <div>
                  <h4 className='text-white/50 text-xs sm:text-sm font-bold'>
                    Total Orders
                  </h4>
                </div>
              </div>

            </div>
            <div className=''>
              <h1 className='text-xl sm:text-2xl font-bold text-white-80'>
                {props.value}
              </h1>
            </div>
 


          </div>
      }

    </>
  )
}

export default OrderStat