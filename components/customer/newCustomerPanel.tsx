import useDeleteCustomer from '@/hooks/useDeleteCustomer';
import useNewCustomer from '@/hooks/useNewCustomer';
import { NewCustomerInput, newCustomerSchema } from '@/validaton';
import React, { useState } from 'react'

interface CustomerPanel {
  isOpen: boolean | undefined
  closed: () => void
}

const CustomerPanel = ({ isOpen, closed }: CustomerPanel) => {
  const [errors, setErrors] = useState<Partial<Record<keyof NewCustomerInput, string>>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: '',
    phone: '',
    address: '',
    status: ''
  })
  const { mutate, isPending } = useNewCustomer()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
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
          console.log("New customer Created successfully!")
          closed()
        }
      }
    )
  }

  const { mutate: run, isPending: loading } = useDeleteCustomer();

  return (

    <>
      {
        isOpen && (
          <div>
            <div onClick={closed} className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
            <div className='relative'>
              <div className='bg-neutral-900/10  backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 transition-all rounded-2xl fixed right-4 top-4 bottom-4 w-100 px-4 py-4 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-styles:none] [$::-webkit-scrollbar]:hidden z-50'>
                <div className='mb-6 flex justify-between items-center'>
                  <h2 className='text-2xl  font-bold text-neutral-200'>
                    Add Customer
                  </h2>
                  <button onClick={closed} className='text-neutal-600 font-bold cursor-pointer'>✕</button>
                </div>
                <div>
                  <div className='flex flex-col gap-2 mb-8'>
                    <h4 className='text-xs text-neutral-400 font-bold'>Name</h4>
                    <input onChange={handleChange} name='name' className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Enter Name' />
                  </div>
                  <div className='flex flex-col gap-2 mb-8'>
                    <h4 className='text-xs text-neutral-400 font-bold'>Email</h4>
                    <input onChange={handleChange} name='email' className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="email" placeholder='Enter Email' />
                  </div>
                  <div className='flex flex-col gap-2 mb-8'>
                    <h4 className='text-xs text-neutral-400 font-bold'>Phone number</h4>
                    <input onChange={handleChange} name='phone' className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Enter Phone no.' />
                  </div>
                  <div className='flex flex-col gap-2 mb-8'>
                    <h4 className='text-xs text-neutral-400 font-bold'>Address</h4>
                    <input onChange={handleChange} name='address' className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='Enter address' />
                  </div>
                  <div className='flex flex-col gap-2 mb-8'>
                    <h4 className='text-xs text-neutral-400 font-bold'>Status</h4>
                    <input onChange={handleChange} name='status' className='w-full rounded-xl px-4 py-2 border border-neutral-800 text-sm' type="text" placeholder='active / inactive / lead / pending' />
                  </div>
                </div>
                <div className='flex justify-center pb-4  items-center'>
                  <button onClick={handleSave} className='bg-indigo-600 w-full cursor-pointer py-1 rounded-xl'>
                    Save
                  </button>
                </div>
                {isPending && <span className='border-3 border-r-0 border-b-0 animate-spin absolute inset-0 m-auto border-indigo-600 w-10 h-10 rounded-full'></span>}

              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default CustomerPanel