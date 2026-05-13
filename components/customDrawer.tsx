import useUpdateCustomer from '@/hooks/useCustomerPatch';
import { format } from 'date-fns';
import React, { InputEvent, ReactEventHandler, SyntheticEvent, useState } from 'react'
import { HiLocationMarker, HiPencilAlt } from 'react-icons/hi';
import { HiCheck, HiCheckCircle, HiPencilSquare, HiUserCircle, HiXCircle, HiXMark } from 'react-icons/hi2';

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
    // FIXED: Orders and Items are ARRAYS []
    orders: {
      items: {
        quantity: number;
        price: number;
        product: {
          name: string;
          price: number; // Changed to number for math
        };
      }[];
    }[];
  };
}
const CustomDrawer = ({ isOpen, onClose, customer, isLoading }: Props) => {
  if (!isOpen) {
    return null
  }
  const nameLength = customer?.name.length || 0
  const totalAmount = Math.round(Number(customer?.totalSpent))
  const date = customer?.createdAt
  const joinedOn = date ? format(new Date(date), 'dd MMM yyyy') : 'N/A'
  const [activeTab, setActiveTab] = useState<'Information' | 'Orders'>('Information')
  const allItems = customer?.orders.flatMap(order => order.items) || [];
  const totalItemsQuantity = allItems.reduce((sum, item) => sum + item.quantity, 0);
  const [editMode, setEditMode] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    joinedOn: joinedOn || ''
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
    mutate(
      { id: customer?.id, data: formData },
      {
        onSuccess: () => {
          setEditMode(false);
        }
      }
    )
  }
  return (
    <>
      <div onClick={onClose} className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
      <div className='fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:nones] [&::-webkit-scrollbar]:hidden  right-4 top-4 bottom-4 w-100 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 transition-all px-4 py-4 rounded-2xl'>
        <div className='flex  fixed backdrop-blur-xs left-0 right-0 px-4 bg-neutral-900/10 justify-between items-center mb-10'>
          <h2 className='text-xl text-neutral-200 font-bold'>
            Customer Details
          </h2>
          {/* <button onClick={onClose} className='text-neutal-600 font-bold'>✕</button> */}
        </div>
        {isLoading ? (
          <div className='space-y-4 mt-10'>
            <div className='h-4 bg-neutral-800 animate-pulse rounded w-3/4'></div>
            <div className='h-4 bg-neutral-800 animate-pulse rounded w-1/2'></div>
          </div>
        ) : (
          <div className='mt-10'>
            <div className='cursor-default' >
              <div className='flex items-center gap-2 mb-6'>
                <HiUserCircle size={50} className='text-indigo-500' />
                <div className='flex flex-col gap-1'>
                  <h2 className='flex items-center gap-2'>
                    <span className='text-xl font-bold text-neutral-300'>
                      {
                        nameLength >= 18 ? `${customer?.name.substring(0, 18)}...` : customer?.name
                      }
                    </span>
                    <span className='text-2xl text-neutral-300'>&middot;</span>
                    <span className={`${customer?.status === "Active" ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'} font-bold rounded-full px-3 py-2 text-xs`}>{customer?.status}</span>
                  </h2>
                  <p className='text-xs flex items-center gap-1 font-semibold text-neutral-400'>
                    <HiLocationMarker size={16} className='mb-0.5' />
                    <span>{customer?.address}</span>
                  </p>
                </div>

              </div>
              <div className='flex w-full justify-between px-10 py-4 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-all'>
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
            <div className='flex justify-around mt-10  font-bold text-neutral-300'>
              <h4 onClick={() => setActiveTab('Information')} className='cursor-pointer'>Information</h4>
              <h4 onClick={() => setActiveTab('Orders')} className='cursor-pointer'>Orders</h4>
            </div>
            <div className='relative my-2'>
              <hr className='text-neutral-800' />
              <div className={`absolute top-0 h-0.5 bg-indigo-500 transition-all duration-300 ${activeTab === 'Information' ? 'w-1/2 left-0' : 'w-1/2 left-1/2'}`} />
            </div>
            {activeTab === 'Information' ? (
              <div className='cursor-default'>
                <div onClick={() => setEditMode(true)} className='flex justify-end mt-6'>
                  <HiPencilSquare size={18} className={`text-indigo-500 ${editMode ? 'hidden' : ''} cursor-pointer`} />
                </div>
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Name</h4>
                  {
                    editMode ? (
                      <input onChange={handleChange} name='name' className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm' type="text" value={formData.name} />
                    ) : (
                      <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.name}</p>
                    )
                  }

                </div>
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Email</h4>
                  {
                    editMode ? (
                      <input onChange={handleChange} name='email' className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm' type="text" value={customer?.email} />
                    ) : (
                      <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.email}</p>
                    )
                  }

                </div>
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Phone number</h4>
                  {
                    editMode ? (
                      <input onChange={handleChange} name='phone' className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm' type="text" value={customer?.phone} />
                    ) : (
                      <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.phone}</p>
                    )
                  }
                </div>
                {/* <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Status</h4>
                   {
                    editMode ? (
                      <input name='status' className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm' type="text" defaultValue={customer?.status} />
                    ) : (
                      <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{customer?.status}</p>
                    )
                  } 
                </div>*/}
                <div className='mt-6 flex flex-col gap-2'>
                  <h4 className='font-bold text-xs text-neutral-400'>Joined on</h4>
                  {
                    editMode ? (
                      <input onChange={handleChange} name='joinedOn' className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm' type="text" value={joinedOn} />
                    ) : (
                      <p className='font-semibold border border-neutral-800 rounded-xl px-4 py-2 text-neutral-300 text-sm'>{joinedOn}</p>
                    )
                  }
                </div>
                <div className='mt-4'>
                  {
                    editMode ? (
                      <div className='flex text-indigo-500 font-bold justify-center items-center gap-10 w-full'>
                        <div onClick={handleSave} className='cursor-pointer'>
                          <HiCheck size={20} className='stroke-4' />
                        </div>
                        <div className='cursor-pointer' onClick={() => {
                          setEditMode(false);
                          setFormData({
                            name: customer?.name || '',
                            email: customer?.email || '',
                            phone: customer?.phone || '',
                            joinedOn: joinedOn || ''
                          })
                        }} >
                          <HiXMark size={20} className='stroke-4' />
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )
                  }
                </div>
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
                  <div className='space-y-4'>
                    {allItems.map((item, index) => (
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
            )}

          </div>
        )}
      </div>
    </>
  )
}

export default CustomDrawer