import React, { useState } from 'react'
import { HiCube } from 'react-icons/hi';
import { motion } from "framer-motion"


interface IOrder {
  id: string,
  status: string,
  totalAmount: number,
  customer: {
    name: string,
    email: string,
    phone: string,
    address: string
  },
  items: {
    quantity: number,
    price: number | string
    product: {
      name: string
      price: number | string
    }
  }[]
}

const OrderPanel = ({ isOpen, onClose, order, loading }: { isOpen: boolean, onClose: () => void, order: IOrder, loading: boolean }) => {


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
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
            Order Details
          </h1>
          <button onClick={onClose} className='text-neutal-600 font-bold cursor-pointer'>✕</button>
        </div>
        {
          loading ? (
            <div className='space-y-4'>
              <div className='bg-neutral-900 rounded-lg py-4 w-full animate-pulse' />
              <div className='bg-neutral-900 rounded-lg py-3 w-full animate-pulse' />
            </div>
          ) : (
            <div>
              <div>
                <div className='flex justify-center items-center mb-4'>
                  <div className='bg-neutral-900/60 rounded-full p-4'>
                    <HiCube size={48} className='text-indigo-500' />
                  </div>
                </div>
                <div className='flex justify-around items-center mb-8 border border-neutral-800 rounded-2xl py-3'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-xs font-bold text-white/50'>Total Amount</p>
                    <h2 className='font-bold text-white/70'>${order?.totalAmount?.toFixed(2)}</h2>
                  </div>
                  <div className='border-l border-neutral-800 h-16 '></div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-xs font-bold text-white/50'>Order Status</p>
                    <h2 className='font-bold text-white/70'>{order?.status}</h2>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Order ID</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{order?.id}</p>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Customer Name</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{order?.customer?.name}</p>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Customer Email</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{order?.customer?.email}</p>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Delievery Address</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{order?.customer?.address}</p>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                  <h4 className='text-sm font-bold text-white/50'>Phone Number</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm'>{order?.customer?.phone}</p>
                </div>
                <div className='mt-6 cursor-default flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>
                    Purchased Products
                  </h4>
                  <div className='space-y-6'>
                    {order?.items?.map((item, index) => (
                      <div key={index} className='flex items-center justify-between border border-neutral-800 rounded-xl px-4 py-2 text-sm'>
                        <span className='text-neutral-300 font-semibold'>
                          {item.product.name}
                        </span>
                        <span className='text-neutral-500 text-xs'>x{item.quantity}</span>
                        <span className='text-indigo-500 font-bold'>
                          ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </motion.div>

    </>
  )
}

export default OrderPanel