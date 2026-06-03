import React from 'react'
import { HiInformationCircle } from 'react-icons/hi2';
import useDeleteProduct from '@/hooks/useDeleteProduct';
const InfoBox = ({ open, onClose, productId, mainClose }: { open: boolean, onClose: () => void, productId: string, mainClose: () => void }) => {
  const { mutate, isPending } = useDeleteProduct();
  const handleDelete = () => {
    mutate(productId, {
      onSuccess: () => {
        console.log("Removed successfully!");
        onClose();
        mainClose();
      }
    })
  }
  if(!open) return null;
  return (
   <>
       <div onClick={onClose} className='fixed bg-black/40 z-40 transition-opacity' />
      <div className='z-100 fixed inset-0 flex justify-center items-center'>
        <div className='relative'>
          <div className='bg-neutral-950/10 border border-neutral-800  backdrop-blur-xs p-4 rounded-xl'>
            <div className='flex items-center gap-2'>
              <HiInformationCircle size={32} className='text-indigo-500' />
              <h1 className=''><span className='font-bold mr-3 text-indigo-500'>Info:</span><span className='text-sm text-white/80'>This action is irreversable. Do you want to continue</span></h1>
            </div>
            <div className='flex justify-center mt-6 gap-10'>
              <button onClick={onClose} className='border border-indigo-500 hover:bg-indigo-500/20 transition-all text-indigo-500 font-bold rounded-lg px-4 py-1 cursor-pointer'>Cencel</button>
              <button onClick={handleDelete} className='border border-red-500 font-bold text-red-500 rounded-lg px-4 py-1 cursor-pointer hover:bg-red-500/20 transition-all'>Delete</button>
            </div>
          </div>
          {
            isPending && <div className='w-6 h-6 rounded-full absolute border-3 border-indigo-500 border-r-0 border-b-0 animate-spin inset-0 m-auto' />
          }
        </div>
      </div>
    </>
  )
}

export default InfoBox