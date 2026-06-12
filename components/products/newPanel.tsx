import { newProductSchema } from '@/validaton';
import React, { useEffect, useState } from 'react'
import { NewProductInput } from '@/validaton';
import useCreateProduct from '@/hooks/useCreateProduct';
import { AnimatePresence, motion } from "framer-motion"
import { HiCheck } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';

const NewPanel = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [messageBox, setMessageBox] = useState<boolean>(false)
  const [errorBox, setErrorBox] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<Record<keyof NewProductInput, string>>>()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const { mutate, isPending } = useCreateProduct();
  const handleSubmit = () => {
    const parsedData = {
      name: formData.name,
      price: formData.price === '' ? undefined : Number(formData.price),
      stock: formData.stock === '' ? undefined : Number(formData.stock),
    };
    const result = newProductSchema.safeParse(parsedData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      })
      setErrors(fieldErrors)
      return;
    }
    setErrors({})
    mutate(result.data, {
      onSuccess: () => {
        setMessageBox(true);
        onClose();
      },
      onError: (error) => {
        setErrorBox(true);
        onClose();
      }
    })
  }
  useEffect(() => { 
    if (messageBox) {
      const timer = setTimeout(() => {
        setMessageBox(false)
      }, 2000);
      return () => clearTimeout(timer)
    }
  }, [messageBox])

  useEffect(() => {
    if (errorBox) {
      const timer = setTimeout(() => {
        setErrorBox(false);
      }, 2000);
      return () => clearTimeout(timer)
    }
  }, [errorBox]);
  return (
    <>

      <AnimatePresence>
        {
          messageBox && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-60'>
              <HiCheck className='stroke-3 text-green-500' size={26} />
              <p className='text-white/60 font-bold text-lg'>
                Customer Updated Successfully!
              </p>
            </motion.div>
          )
        }

        {
          errorBox && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-60'>
              <HiXMark className='stroke-3 text-red-500' size={26} />
              <p className='text-white/60 font-bold text-lg'>
                Something Went Wrong. Please Try again later.
              </p>
            </motion.div>
          )
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          open && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
              <motion.div
                initial={{ x: '100%', opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 220, duration: 0.15 }}
                className={`fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  right-4 top-4 bottom-4 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 px-4 py-4 rounded-2xl w-82 sm:w-96`}>
                <div className='mb-8 flex justify-between items-center'>
                  <h1 className='font-semibold'>
                    New Product
                  </h1>
                  <button onClick={onClose} className='text-neutal-600 font-bold cursor-pointer'>&times;</button>
                </div>
                <div className='h-full'>
                  <div className='flex flex-col justify-between'>
                    <div>
                      <div className='flex flex-col gap-1 mb-8'>
                        <h4 className='text-sm font-bold text-white/50'>Product Name</h4>
                        <input placeholder='Enter product name' type='text' className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm' name='name' value={formData.name} onChange={handleChange} />
                      </div>
                      <div className='flex flex-col gap-1 mb-8'>
                        <h4 className='text-sm font-bold text-white/50'>Price</h4>
                        <input placeholder='Enter product price' type='text' className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm' name='price' value={formData.price} onChange={handleChange} />
                      </div>
                      <div className='flex flex-col gap-1 mb-8'>
                        <h4 className='text-sm font-bold text-white/50'>Stock</h4>
                        <input placeholder='Enter product stock' type='number' min={0} max={999} className='font-semibold border border-neutral-800 rounded-xl px-4 py-3 text-neutral-300 text-sm appearance-none' name='stock' value={formData.stock} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='mt-10'>
                      <button onClick={handleSubmit} className='bg-indigo-600 w-full py-2 rounded-2xl font-bold text-white/80 cursor-pointer hover:bg-indigo-500 transition-all duration-300'>
                        Create Product
                      </button>
                    </div>
                  </div>
                  <div>
                    {isPending && <span className='border-3 border-r-0 border-b-0 animate-spin absolute inset-0 m-auto border-indigo-600 w-10 h-10 rounded-full'></span>}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        }
      </AnimatePresence>
    </>
  )
}

export default NewPanel