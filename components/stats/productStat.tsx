import { ArrowDown, Box } from 'lucide-react'
import React, { useState } from 'react'
import useStats from '@/hooks/useStats'

const ProductStat = (props:any) => {
/*   const [frame, setFrame] = useState("1w");
  const { data, isLoading, error } = useStats(frame)
  const products = data?.productsSold */
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
                  <Box className='text-indigo-500' />
                </div>
                <div>
                  <h4 className='text-neutral-200 font-bold'>
                    Product Sold
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

export default ProductStat