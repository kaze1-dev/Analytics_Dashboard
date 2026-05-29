"use client"
import OrderPanel from '@/components/order/orderPanel';
import Pagination from '@/components/pagination';
import { useOrderData } from '@/hooks/useOrderData';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { HiArrowsUpDown, HiChevronDown } from 'react-icons/hi2';

interface IOrder {
  id: string,
  status: string,
  customer: {
    name: string
    phone: string
  }
  totalAmount: string
}
const Colors: any = {
  delivered: 'bg-green-600/10 text-green-600',
  cancelled: 'bg-red-600/10 text-red-600',
  pending: 'bg-yellow-600/10 text-yellow-600',
  shipped: 'bg-indigo-600/10 text-indigo-600'
}
const Orders = () => {
  const params = useSearchParams();
  const page = Number(params.get('page')) || 1;
  const size = Number(params.get('size')) || 25;
  const { data, isLoading, error } = useOrderData(page, size)
  const orders = data?.orders || [];
  const metadata = data?.metadata || {}
  const totalPages = metadata.totalPages || 0
  const currentPage = metadata.currentPage || 0
  return (
    <div className='pl-55 pr-6 py-10'>
      <div className='grid grid-cols-4 gap-4 mb-10'>
        <div className='border border-neutral-800 rounded-2xl p-4 hover:border-neutral-700 transition-all'>
          <h3 className='text-sm font-bold text-white/50 mb-2'>Active Orders</h3>
          <div className='text-2xl font-bold text-white/80'>1232</div>
        </div>
        <div className='border border-neutral-800 rounded-2xl p-4 hover:border-neutral-700 transition-all'>
          <h3 className='text-sm font-bold text-white/50 mb-2'>Pending Orders</h3>
          <div className='text-2xl font-bold text-white/80'>456</div>
        </div>
        <div className='border border-neutral-800 rounded-2xl p-4 hover:border-neutral-700 transition-all'>
          <h3 className='text-sm font-bold text-white/50 mb-2'>Completed Orders</h3>
          <div className='text-2xl font-bold text-white/80'>789</div>
        </div>
        <div className='border border-neutral-800 rounded-2xl p-4 hover:border-neutral-700 transition-all'>
          <h3 className='text-sm font-bold text-white/50 mb-2'>Cancelled Orders</h3>
          <div className='text-2xl font-bold text-white/80'>123</div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold text-white/80'>Orders</h1>
          <p className='text-sm text-neutral-500'>
            Track and manage your orders effectively
          </p>
        </div>
        <div className='flex items-center gap-6'>
          <button className='bg-indigo-700 px-6 rounded-full py-1 font-bold  text-white/80 flex justify-center items-center gap-2 cursor-pointer'>

            <span className='text-2xl'>+</span> Add Order
          </button>
        </div>
      </div>
      <div className='mt-8 mb-4'>
        <div className='flex items-center justify-between'>
          <div className='relative flex items-center w-64'>
            <div className='absolute left-3 text-neutral-500 pointer-events-none'>
              <FiSearch />
            </div>
            <input
              type='text'
              placeholder='Search name or ID...'
              className='bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm rounded-xl pl-10 pr-4 py-1.5 font-medium placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors w-full'
            />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="statusFilter" className='text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
              Filter by:
            </label>
            <div className='relative flex items-center'>
              <select className='appearance-none bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm rounded-xl pl-4 pr-10 py-1.5 font-bold cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors w-40' id="statusFilter">
                <option className='bg-neutral-900 text-neutral-400' value="">All Orders</option>
                <option className='bg-neutral-900 text-neutral-400' value="active">Active</option>
                <option className='bg-neutral-900 text-neutral-400' value="completed">Completed</option>
                <option className='bg-neutral-900 text-neutral-400' value="cancelled">Cancelled</option>
                <option className='bg-neutral-900 text-neutral-400' value="pending">Pending</option>
              </select>
              <div className='absolute right-3 pointer-events-none text-neutral-500'>
                <HiChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isLoading ? (
          <div>
            <div className='bg-neutral-900 rounded-2xl animate-pulse w-full h-120' />
          </div>
        ) : (
          <div className='overflow-x-auto border border-neutral-800 px-6 rounded-2xl'>
            <table className='w-full overflow-y-scroll'>
              <thead>
                <tr className='text-neutral-400 text-left border-b border-neutral-700'>
                  {/* <th className='pt-6 pb-4'>Customer Id</th> */}
                  <th className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      ID  <HiArrowsUpDown className='stroke-1' />
                    </div>
                  </th>
                  <th className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Name <HiArrowsUpDown className='stroke-1' />
                    </div>
                  </th>
                  <th className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Status <HiArrowsUpDown className='stroke-1' />
                    </div>
                  </th>
                  <th className='py-4 cursor-default'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: IOrder) => (
                  <tr key={order.id} className='border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors cursor-pointer '>
                    <td className='py-5 uppercase font-bold text-sm text-white/80'>...{order.id.slice(-4)}</td>
                    <td className='py-5 text-white/80 font-semibold text-sm'>{order.customer.name}</td>
                    <td className={`py-5 font-bold text-sm `}>
                      <span className={`${Colors[order.status]} px-4 py-1 rounded-xl`}>{order.status}</span>

                    </td>
                    <td className='py-5'>
                      <button className='text-indigo-500 text-sm hover:text-indigo-400'>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
            <OrderPanel />
          </div>
        )
      }

    </div>
  )
}

export default Orders