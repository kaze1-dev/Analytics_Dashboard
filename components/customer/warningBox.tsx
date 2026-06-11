import useDeleteCustomer from '@/hooks/useDeleteCustomer';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { HiCheck, HiInformationCircle, HiXMark } from 'react-icons/hi2';

const WarningBox = ({ close, customerId, closeDrawer, isOpen }: any) => {
  const { mutate, isPending } = useDeleteCustomer();
  const [messageBox, setMessageBox] = useState<boolean>(false)
  const [errorBox, setErrorBox] = useState<boolean>(false)
  const handleDelete = () => {
    mutate(customerId, {
      onSuccess: () => {
        close();
        closeDrawer();
        setMessageBox(true);
      },
      onError: () => {
        close();
        closeDrawer();
        setErrorBox(true)
      }
    })
  }

useEffect(() => {
  const timer = setTimeout(() => {
    setMessageBox(false)
  }, 2000)
  return () => clearTimeout(timer)
}, [messageBox])

useEffect(() => {
  const timer = setTimeout(() => {
    setErrorBox(false)
  }, 2000)
  return () => clearTimeout(timer)
}, [errorBox])

  return (
    <>
      <AnimatePresence>
        {
          messageBox && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-60'>
              <HiCheck className='stroke-3 text-green-500' size={26} />
              <p className='text-white/60 font-bold text-lg'>
                Customer Deleted Successfully!
              </p>
            </motion.div>
          )
        }

        {
          errorBox && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-60'>
              <HiXMark className='stroke-3 text-green-500' size={26} />
              <p className='text-white/60 font-bold text-lg'>
                Something went wrong. Please try again later.
              </p>
            </motion.div>
          )
        }

      </AnimatePresence>

      {
        isOpen && (
          <div>
            <div onClick={close} className='fixed bg-black/40 z-40 transition-opacity' />
            <div className='z-100 fixed inset-0 flex justify-center items-center px-3'>
              <div className='relative'>
                <div className='bg-neutral-950/10 border border-neutral-800  backdrop-blur-xs p-4 rounded-xl'>
                  <div className='flex items-center gap-2'>
                    <HiInformationCircle size={32} className='text-indigo-500' />
                    <h1 className=''><span className='font-bold mr-3 text-indigo-500'>Info:</span><span className='text-sm text-white/80'>This action is irreversable. Do you want to continue</span></h1>
                  </div>
                  <div className='flex justify-center mt-6 gap-10'>
                    <button onClick={close} className='border border-indigo-500 hover:bg-indigo-500/20 transition-all text-indigo-500 font-bold rounded-lg px-4 py-1 cursor-pointer'>Cencel</button>
                    <button onClick={handleDelete} className='border border-red-500 font-bold text-red-500 rounded-lg px-4 py-1 cursor-pointer hover:bg-red-500/20 transition-all'>Delete</button>
                  </div>
                </div>
                {
                  isPending && <div className='w-6 h-6 rounded-full absolute border-3 border-indigo-500 border-r-0 border-b-0 animate-spin inset-0 m-auto' />
                }
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default WarningBox