import React from 'react'
import { HiUserCircle } from 'react-icons/hi2';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean
  customer?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    orderCount: number;
    status: string
    address: string
    totalSpent: number
  }
}
const CustomDrawer = ({ isOpen, onClose, customer, isLoading }: Props) => {
  if (!isOpen) {
    return null
  }
  const nameLength = customer?.name.length || 0
  return (
    <>
      <div className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
      <div className='fixed right-4 top-4 bottom-4 w-100 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 transition-all px-4 py-4 rounded-2xl'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-xl text-neutral-200 font-bold'>
            Customer Details
          </h2>
          <button onClick={onClose} className='text-neutal-600 font-bold'>✕</button>
        </div>
        {isLoading ? (
          <div className='space-y-4'>
            <div className='h-4 bg-neutral-800 animate-pulse rounded w-3/4'></div>
            <div className='h-4 bg-neutral-800 animate-pulse rounded w-1/2'></div>
          </div>
        ) : (
          <div>
            <div >
              <div className='flex items-center gap-2 mb-6'>
                <HiUserCircle size={50} className='text-indigo-500' />
                <div className='flex flex-col gap-1'>
                  <h2 className='flex items-center gap-2'>
                    <span className='text-xl font-bold text-neutral-300'>
                      {
                        nameLength >= 18 ? `${customer?.name.substring(0, 18)}...` : customer?.name
                      }
                    </span>
                    <span className='text-2xl text-neutral-300'>&middot;</span>
                    <span className='bg-green-500/10 text-green-500 font-bold rounded-full px-3 py-2 text-xs'>Active</span>
                  </h2>
                  <p className='text-xs font-semibold text-neutral-400'>
                    {customer?.address}
                  </p>
                </div>
                
              </div>
              <div className='flex w-full justify-between px-10 py-4 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-all'>
                  <div className='flex flex-col gap-1'>
                    <h2 className='font-bold text-xl text-neutral-200'>
                      $444.00
                    </h2>
                    <p className='font-semibold text-xs text-neutral-400'>
                      Order Value
                    </p>
                  </div>
                  <span className='w-1 h-12 border-neutral-800 border-l'></span>
                  <div className='flex flex-col gap-1'>
                    <h2 className='font-bold text-xl text-neutral-200'>
                      40
                    </h2>
                    <p className='font-semibold text-xs text-neutral-400'>
                      Total Order
                    </p>
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomDrawer