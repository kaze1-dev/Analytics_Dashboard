import useUpdateCustomer from '@/hooks/useCustomerPatch';
import { UpdateCustomerInput, UpdateCustomerSchema } from '@/validaton';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi';
import { HiCheck, HiOutlineTrash, HiPencilSquare, HiUserCircle, HiXMark } from 'react-icons/hi2';
import WarningBox from './warningBox';
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  customer?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    orderCount: number;
    status: string;
    address: string;
    phone: string;
    totalSpent: number;
    orders: {
      items: {
        quantity: number;
        price: number;
        product: {
          name: string;
          price: number;
        };
      }[];
    }[];
  };
}

const Colors: Record<string, string> = {
  active: 'bg-green-600/20 text-green-500',
  inactive: 'bg-red-600/20 text-red-500',
  lead: 'bg-stone-600/20 text-stone-400',
  pending: 'bg-yellow-600/20 text-yellow-500',
};

const CustomDrawer = ({ isOpen, onClose, customer, isLoading }: Props) => {
  const [activeTab, setActiveTab] = useState<'Information' | 'Orders'>('Information')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<Record<keyof UpdateCustomerInput, string>>>({})
  const [errorBox, setErrorBox] = useState<boolean>(false);
  const [warnBox, setWarnBox] = useState<boolean>(false)
  const [messageBox, setMessageBox] = useState<boolean>(false)
  const date = customer?.createdAt

  const joinedOn = date ? format(new Date(date), 'dd MMM yyyy') : 'N/A'
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
  });
  const { mutate, isPending } = useUpdateCustomer()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSave = async () => {
    if (!customer?.id) {
      console.error("No customer ID found");
      return;
    }
    const result = UpdateCustomerSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({})
    mutate(
      { id: customer?.id, data: result.data },
      {
        onSuccess: () => {
          setEditMode(false);
          setMessageBox(true);
        },
        onError: () => {
          setEditMode(false);
          setErrorBox(true);
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

  const nameLength = customer?.name.length || 0
  const totalAmount = Math.round(Number(customer?.totalSpent))
  const allItems = customer?.orders.flatMap(order => order.items) || [];
  const totalItemsQuantity = allItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (customer && isOpen) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
      })
    }
  }, [customer, isOpen])

  return (
    <div>
      <AnimatePresence>
        <WarningBox closeDrawer={onClose} isOpen={warnBox} customerId={customer?.id} close={() => setWarnBox(false)} />
      </AnimatePresence>
      <AnimatePresence>
        {
          messageBox && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className='fixed bottom-5 right-10 flex gap-4 items-center bg-neutral-950 border border-neutral-800 rounded-xl px-8 py-4 z-[60] shadow-2xl shadow-black/40'>
              <HiCheck className='stroke-3 text-green-500' size={26} />
              <p className='text-white/60 font-bold text-lg'>
                Customer Updated Successfully!
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
      <motion.div initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 220, duration: 0.15 }}
        className='fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden right-4 top-4 bottom-4 w-82 sm:w-96 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 transition-colors px-4 py-4 rounded-2xl'>
        <div className='sticky top-0 -mx-4 -mt-4 px-4 pt-4 pb-4 z-10 backdrop-blur-md bg-neutral-950/70 flex justify-between items-center rounded-t-2xl border-b border-neutral-800/80'>
          <h2 className='text-lg md:text-xl text-neutral-200 font-bold'>
            Customer Details
          </h2>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className='text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 transition-colors font-bold cursor-pointer h-7 w-7 flex items-center justify-center rounded-full'
          >
            ✕
          </button>
        </div>
        {isLoading ? (
          <div className='space-y-4 mt-6'>
            <div className='h-4 bg-neutral-800 animate-pulse rounded w-3/4'></div>
            <div className='h-4 bg-neutral-800 animate-pulse rounded w-1/2'></div>
          </div>
        ) : (
          <div className='mt-6'>
            <div className='cursor-default'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2 mb-6'>
                  <HiUserCircle size={50} className='text-indigo-600 shrink-0' />
                  <div className='flex flex-col gap-1 min-w-0'>
                    <h2 className='flex items-center gap-2 flex-wrap'>
                      <span className='text-sm sm:text-lg font-bold text-neutral-300'>
                        {
                          nameLength >= 18 ? `${customer?.name.substring(0, 18)}...` : customer?.name
                        }
                      </span>
                      <span className='text-neutral-600'>&middot;</span>
                      <span className={`${Colors[customer?.status ?? ''] ?? 'bg-neutral-700/30 text-neutral-400'} font-bold rounded-full px-3 py-1 text-xs whitespace-nowrap`}>
                        {customer?.status}
                      </span>
                    </h2>
                    <p className='text-xs flex items-center gap-1 font-semibold text-neutral-400 min-w-0'>
                      <HiLocationMarker size={16} className='mb-0.5 shrink-0' />
                      <span className='truncate' title={customer?.address}>{customer?.address}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setWarnBox(true)}
                  aria-label="Delete customer"
                  className='text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-colors p-1.5 rounded-lg cursor-pointer h-fit'
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
              <div className='flex w-full justify-between px-10 mt-3 py-4 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-all'>
                <div className='flex flex-col gap-1'>
                  <h2 className='font-bold text-xl text-neutral-200'>
                    ${totalAmount}
                  </h2>
                  <p className='font-semibold text-xs text-neutral-400'>
                    Order Value
                  </p>
                </div>
                <span className='w-1 h-12 border-neutral-800 border-l'></span>
                <div className='flex flex-col gap-1'>
                  <h2 className='font-bold text-xl text-neutral-200'>
                    {customer?.orderCount}
                  </h2>
                  <p className='font-semibold text-xs text-neutral-400'>
                    Total Order
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-around mt-10 font-bold text-sm'>
              {(['Information', 'Orders'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer pb-1 transition-colors ${
                    activeTab === tab ? 'text-indigo-400' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className='relative my-2'>
              <hr className='text-neutral-800' />
              <div className={`absolute top-0 h-0.5 bg-indigo-500 transition-all duration-300 ${activeTab === 'Information' ? 'w-1/2 left-0' : 'w-1/2 left-1/2'}`} />
            </div>

            {activeTab === 'Information' ? (
              <div className='cursor-default'>
                <div className='flex justify-end mt-6 h-5'>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      aria-label="Edit customer information"
                      className='text-indigo-500 hover:text-indigo-400 cursor-pointer transition-colors'
                    >
                      <HiPencilSquare size={18} />
                    </button>
                  )}
                </div>
                <div className='relative'>
                  <div className='mt-6 flex flex-col gap-2'>
                    <h4 className='font-bold text-xs text-neutral-400'>Name</h4>
                    {
                      editMode ? (
                        <>
                          <input
                            onChange={handleChange}
                            name='name'
                            className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40'
                            type="text"
                            value={formData.name}
                          />
                          {errors.name ? <span className='text-red-500 text-xs'>{errors.name}</span> : null}
                        </>
                      ) : (
                        <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.name}</p>
                      )
                    }
                  </div>
                  <div className='mt-6 flex flex-col gap-2'>
                    <h4 className='font-bold text-xs text-neutral-400'>Email</h4>
                    {
                      editMode ? (
                        <>
                          <input
                            onChange={handleChange}
                            name='email'
                            className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40'
                            type="text"
                            value={formData.email}
                          />
                          {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
                        </>
                      ) : (
                        <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.email}</p>
                      )
                    }
                  </div>
                  <div className='mt-6 flex flex-col gap-2'>
                    <h4 className='font-bold text-xs text-neutral-400'>Phone number</h4>
                    {
                      editMode ? (
                        <>
                          <input
                            onChange={handleChange}
                            name='phone'
                            className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40'
                            type="text"
                            value={formData.phone}
                          />
                          {errors.phone && <span className='text-red-500 text-xs'>{errors.phone}</span>}
                        </>
                      ) : (
                        <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.phone}</p>
                      )
                    }
                  </div>
                  {!editMode && (
                    <div className='mt-6 flex flex-col gap-2'>
                      <h4 className='font-bold text-xs text-neutral-400'>Joined on</h4>
                      <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{joinedOn}</p>
                    </div>
                  )}

                  {isPending && (
                    <div className='absolute inset-0 flex items-center justify-center bg-neutral-950/40 rounded-xl'>
                      <div className='border-3 border-b-transparent border-r-transparent animate-spin h-8 w-8 rounded-full border-indigo-500'></div>
                    </div>
                  )}
                </div>

                {editMode && (
                  <div className='mt-6 flex justify-center items-center gap-8 w-full'>
                    <button
                      onClick={handleSave}
                      aria-label="Save changes"
                      className='flex items-center gap-1.5 text-xs font-bold text-green-500 hover:bg-green-500/10 px-4 py-2 rounded-lg cursor-pointer transition-colors'
                    >
                      <HiCheck size={18} className='stroke-3' />
                      Save
                    </button>
                    <button
                      aria-label="Cancel editing"
                      className='flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:bg-neutral-800/60 px-4 py-2 rounded-lg cursor-pointer transition-colors'
                      onClick={() => {
                        setEditMode(false);
                        setErrors({});
                        setFormData({
                          name: customer?.name || '',
                          email: customer?.email || '',
                          phone: customer?.phone || '',
                        })
                      }}
                    >
                      <HiXMark size={18} className='stroke-3' />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='cursor-default'>
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Total Orders</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.orderCount}</p>
                </div>
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Total Spent</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>${totalAmount}</p>
                </div>
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Items Quantity</h4>
                  <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{totalItemsQuantity}</p>
                </div>
                <div className='mt-6 cursor-default flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>
                    Purchased Products
                  </h4>
                  {allItems.length === 0 ? (
                    <p className='text-neutral-600 text-sm border border-dashed border-neutral-800 rounded-xl px-4 py-6 text-center'>
                      No products purchased yet
                    </p>
                  ) : (
                    <div className='space-y-3'>
                      {allItems.map((item, index) => (
                        <div key={index} className='flex items-center justify-between border border-neutral-800 rounded-xl px-4 py-2.5 text-sm hover:border-neutral-700 transition-colors'>
                          <span className='text-neutral-300 font-semibold truncate mr-2'>
                            {item.product.name}
                          </span>
                          <span className='text-neutral-500 text-xs shrink-0'>x{item.quantity}</span>
                          <span className='text-indigo-400 font-bold ml-3 shrink-0'>
                            ${item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default CustomDrawer