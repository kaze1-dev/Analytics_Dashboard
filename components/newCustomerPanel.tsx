import React from 'react'

const CustomerPanel = () => {
  return (
    <div className='bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 transition-all rounded-2xl fixed right-4 top-4 bottom-4 w-100 px-4 py-4 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-styles:none] [$::-webkit-scrollbar]:hidden'>
      <h2 className='text-2xl mb-6 font-bold text-neutral-200'>
        Add Customer
      </h2>
      <div>
        <div className='flex flex-col gap-2 mb-8'>
          <h4 className='text-xs text-neutral-400 font-bold'>Name</h4>
          <input className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Enter Name' />
        </div>
        <div className='flex flex-col gap-2 mb-8'>
          <h4 className='text-xs text-neutral-400 font-bold'>Email</h4>
          <input className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="email" placeholder='Enter Email' />
        </div>
        <div className='flex flex-col gap-2 mb-8'>
          <h4 className='text-xs text-neutral-400 font-bold'>Phone number</h4>
          <input className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Enter Phone no.' />
        </div>
        <div className='flex flex-col gap-2 mb-8'>
          <h4 className='text-xs text-neutral-400 font-bold'>Address</h4>
          <input className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Enter address' />
        </div>
        <div className='flex flex-col gap-2 mb-8'>
          <h4 className='text-xs text-neutral-400 font-bold'>Status</h4>
          <input className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Active / Inactive' />
        </div>
      </div>
      <div className='flex justify-center pb-4  items-center'>
        <button className='bg-indigo-600 w-full py-1 rounded-xl'>
          Save
        </button>
      </div>
    </div>
  )
}

export default CustomerPanel