import React, { useState } from 'react'
import { HiCube } from 'react-icons/hi';

const OrderPanel = () => {
  return (
    <>
      <div className={`fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  right-4 top-4 bottom-4 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 duration-500 transition-all px-4 py-4 rounded-2xl w-96`}>
        <h1 className='mb-8'>
          Order Details
        </h1>
        <div>
          <div className='flex justify-center items-center mb-4'>
            <div className='bg-neutral-900/60 rounded-full p-4'>
              <HiCube size={48} className='text-indigo-500' />
            </div>
          </div>
          <div className='flex justify-around items-center mb-8 border border-neutral-800 rounded-2xl py-3'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-bold text-white/50'>Total Amount</p>
              <h2 className='font-bold text-white/70'>$199.99</h2>
            </div>
            <div className='border-l border-neutral-800 h-16 '></div>
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-bold text-white/50'>Order Status</p>
              <h2 className='font-bold text-white/70'>Active</h2>
            </div>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-1 mb-8'>
            <h4 className='text-sm font-bold text-white/50'>Order ID</h4>
            <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>ajklsdfhlkfhafljflal</p>
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <h4 className='text-sm font-bold text-white/50'>Customer Name</h4>
            <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>Faisal Abbas</p>
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <h4 className='text-sm font-bold text-white/50'>Customer Email</h4>
            <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>example123@gmail.com</p>
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <h4 className='text-sm font-bold text-white/50'>Delievery Address</h4>
            <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>Random Address</p>
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <h4 className='text-sm font-bold text-white/50'>Phone Number</h4>
            <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>03xxxxxxxxxxx</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default OrderPanel