import useDeleteCustomer from '@/hooks/useDeleteCustomer';
import useNewCustomer from '@/hooks/useNewCustomer';
import { NewCustomerInput, newCustomerSchema } from '@/validaton';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { HiCheck, HiXMark } from 'react-icons/hi2';

interface CustomerPanel {
  isOpen: boolean | undefined
  closed: () => void
}

const STATUS_OPTIONS = ['active', 'inactive', 'lead', 'pending'] as const;

const inputClass =
  'w-full rounded-xl px-4 py-2 border border-neutral-800 bg-neutral-950/40 text-neutral-200 text-sm placeholder:text-neutral-600 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40';

const CustomerPanel = ({ isOpen, closed }: CustomerPanel) => {
  const [errors, setErrors] = useState<Partial<Record<keyof NewCustomerInput, string>>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: '',
    phone: '',
    address: '',
    status: ''
  })
  const [messageBox, setMessageBox] = useState<boolean>(false)
  const [errorBox, setErrorBox] = useState<boolean>(false)
  const { mutate, isPending } = useNewCustomer()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({ name: "", email: '', phone: '', address: '', status: '' });
    setErrors({});
  };

  const handleSave = () => {
    const result = newCustomerSchema.safeParse(formData);
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
    mutate(
      result.data,
      {
        onSuccess: () => {
          setMessageBox(true);
          resetForm();
          closed();
        },
        onError: () => {
          setErrorBox(true)
        }
      }
    )
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
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-[60] shadow-2xl shadow-black/40'>
              <HiCheck className='stroke-3 text-green-500' size={26} />
              <p className='text-white/60 font-bold text-lg'>
                Customer Created Successfully!
              </p>
            </motion.div>
          )
        }

        {
          errorBox && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-[60] shadow-2xl shadow-black/40'>
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
          isOpen && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={closed}
                className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
              <div className='relative'>
                <motion.div
                  initial={{ x: '100%', opacity: 0.5 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 220, duration: 0.15 }}
                  className='bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 transition-colors rounded-2xl fixed right-4 top-4 bottom-4 w-82 sm:w-96 px-4 py-4 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden z-50'>
                  <div className='mb-6 flex justify-between items-center'>
                    <h2 className='text-2xl font-bold text-neutral-200'>
                      Add Customer
                    </h2>
                    <button
                      onClick={closed}
                      aria-label="Close panel"
                      className='text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 transition-colors font-bold cursor-pointer h-7 w-7 flex items-center justify-center rounded-full'
                    >
                      ✕
                    </button>
                  </div>
                  <fieldset disabled={isPending} className='disabled:opacity-60'>
                    <div className='flex flex-col gap-2 mb-6'>
                      <h4 className='text-xs text-neutral-400 font-bold'>Name</h4>
                      <input onChange={handleChange} name='name' value={formData.name} className={inputClass} type="text" placeholder='Enter Name' />
                      {errors.name && <span className='text-red-500 text-xs'>{errors.name}</span>}
                    </div>
                    <div className='flex flex-col gap-2 mb-6'>
                      <h4 className='text-xs text-neutral-400 font-bold'>Email</h4>
                      <input onChange={handleChange} name='email' value={formData.email} className={inputClass} type="email" placeholder='Enter Email' />
                      {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
                    </div>
                    <div className='flex flex-col gap-2 mb-6'>
                      <h4 className='text-xs text-neutral-400 font-bold'>Phone number</h4>
                      <input onChange={handleChange} name='phone' value={formData.phone} className={inputClass} type="text" placeholder='Enter Phone no.' />
                      {errors.phone && <span className='text-red-500 text-xs'>{errors.phone}</span>}
                    </div>
                    <div className='flex flex-col gap-2 mb-6'>
                      <h4 className='text-xs text-neutral-400 font-bold'>Address</h4>
                      <input onChange={handleChange} name='address' value={formData.address} className={inputClass} type="text" placeholder='Enter address' />
                      {errors.address && <span className='text-red-500 text-xs'>{errors.address}</span>}
                    </div>
                    <div className='flex flex-col gap-2 mb-6'>
                      <h4 className='text-xs text-neutral-400 font-bold'>Status</h4>
                      <select
                        onChange={handleChange}
                        name='status'
                        value={formData.status}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        <option value="" disabled>Select status</option>
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className='bg-neutral-900'>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </select>
                      {errors.status && <span className='text-red-500 text-xs'>{errors.status}</span>}
                    </div>
                  </fieldset>
                  <div className='flex justify-center pb-4 items-center'>
                    <button
                      onClick={handleSave}
                      disabled={isPending}
                      className='bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed w-full cursor-pointer py-2 rounded-xl font-semibold text-sm text-white transition-colors flex items-center justify-center gap-2'
                    >
                      {isPending ? (
                        <>
                          <span className='h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />
                          Saving…
                        </>
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )
        }
      </AnimatePresence>
    </>
  )
}

export default CustomerPanel