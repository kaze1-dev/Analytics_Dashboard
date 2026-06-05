import React, { useState } from 'react'
import { HiCube, HiOutlineTrash } from 'react-icons/hi2';
import InfoBox from './infoBox';
import { motion } from "framer-motion"

const Panel = ({ onClose, isOpen, product, loading }: { onClose: () => void, isOpen: boolean, product: any, loading: boolean }) => {
  const [infoBox, setInfoBox] = useState(false);

  return (
    <>
      <InfoBox
        open={infoBox}
        onClose={() => setInfoBox(false)}
        productId={product?.id}
        mainClose={onClose}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
      <motion.div
        initial={{x: '100%', opacity: 0.5}}
        animate={{x: 0, opacity: 1}}
        exit={{x: '100%', opacity: 0}}
        transition={{type: 'spring', damping: 26, stiffness: 220, duration: 0.15}}
        className={`fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  right-4 top-4 bottom-4 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 px-4 py-4 rounded-2xl  w-82 sm:w-96`}>
        <div className='mb-8 flex justify-between items-center'>
          <h1 className=''>
            Product Details
          </h1>
          <button onClick={onClose} className='text-neutal-600 font-bold cursor-pointer'>✕</button>
        </div>
        {
          loading ? (
            <div className='space-y-4'>
              <div className='w-40 py-2 bg-neutral-900 rounded-2xl animate-pulse' />
              <div className='w-full py-3 bg-neutral-900 rounded-2xl animate-pulse' />
            </div>
          ) : (
            <div>
              <div>
                <div className='flex flex-col'>
                  <div className='flex justify-center items-center mb-4'>
                    <div className='bg-neutral-900/60 rounded-full p-4'>
                      <HiCube size={48} className='text-indigo-500' />
                    </div>
                  </div>
                  <div onClick={() => setInfoBox(true)} className='flex justify-center items-center mb-4'>
                    <div className=' text-red-600 p-1 rounded cursor-pointer'>
                      <HiOutlineTrash size={22} />
                    </div>
                  </div>
                </div>
                <div className='flex justify-around items-center mb-8 border border-neutral-800 rounded-2xl py-3'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-xs font-bold text-white/50'>Price</p>
                    <h2 className='font-bold text-white/70'>{product?.price}</h2>
                  </div>
                  <div className='border-l border-neutral-800 h-16 '></div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-xs font-bold text-white/50'>Stock</p>
                    <h2 className='font-bold text-white/70'>{product?.stock}</h2>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Product ID</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{product?.id}</p>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Product Name</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{product?.name}</p>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Date</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{product?.createdAt}</p>
                </div>
              </div>

            </div>
          )
        }

      </motion.div>
    </>
  )
}

export default Panel