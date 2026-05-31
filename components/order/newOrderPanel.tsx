import React from 'react'

const NewOrderPanel = () => {
  return (
    <div className={`fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  right-4 top-4 bottom-4 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 duration-500 transition-all px-4 py-4 rounded-2xl w-96`}>
      <h1 className='mb-8 font-bold text-white/80 text-lg'>
        New Order
      </h1>
      <div>
        <div>
          <h4></h4>
        </div>
      </div>
    </div>
  )
}

export default NewOrderPanel