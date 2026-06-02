"use client"
import OrderPanel from '@/components/order/orderPanel';
import Pagination from '@/components/pagination';
import { useOrderData } from '@/hooks/useOrderData';
import useOrderDetails from '@/hooks/useOrderDetails';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { HiArrowDown, HiArrowsUpDown, HiArrowUp, HiChevronDown } from 'react-icons/hi2';
import useOrderStats from '@/hooks/useOrderStats';
import NewOrderPanel from '@/components/order/newOrderPanel';

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

  const [selectedOrder, setSelectedOrder] = useState<string | boolean | null>(null);
  const params = useSearchParams();
  const router = useRouter();
  const page = Number(params.get('page')) || 1;
  const size = Number(params.get('size')) || 25;
  const statusFilter = params.get('status') || ''
  const sortBy = params.get('sortBy') || 'createdAt'
  const orderBy = params.get('orderBy') || 'asc'
  const urlSearch = params.get('search') || ''
  const { data, isLoading, error } = useOrderData(page, size, orderBy, sortBy, statusFilter, urlSearch);
  const { data: orderData, isLoading: orderLoading, error: orderError } = useOrderDetails(selectedOrder as string)
  const orders = data?.orders || [];
  const metadata = data?.metadata || {}
  const totalPages = metadata.totalPages || 0
  const currentPage = metadata.currentPage || 0
  const [SearchVal, setSearchVal] = useState<string>(urlSearch);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const paramss = new URLSearchParams(params.toString())

      if (SearchVal) {
        paramss.set('search', SearchVal);
      } else {
        paramss.delete('search')
      }
      paramss.set('page', '1')
      router.push(`/orders?${paramss.toString()}`);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [SearchVal])

  const handleFilterChange = (newStatus: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (newStatus) {
      newParams.set('status', newStatus);

    } else {
      newParams.delete('status')
    }
    newParams.set('page', '1');
    router.push(`/orders?${newParams.toString()}`)
  }

  const handleSort = (columnName: string) => {
    let newOrderBy = 'asc';
    if (sortBy === columnName) {
      newOrderBy = orderBy === 'asc' ? 'desc' : 'asc';
    }
    const newParams = new URLSearchParams(params.toString());
    newParams.set('sortBy', columnName);
    newParams.set('orderBy', newOrderBy);
    router.push(`/orders?${newParams.toString()}`);
  }
  const { data: stats, isLoading: isPending, error: statError } = useOrderStats();
  return (
    <div className='pl-55 pr-6 py-10'>
      <div className='grid grid-cols-4 gap-4 mb-10'>
        {
          isPending ? (
            <>
              <div className='h-22 rounded-2xl animate-pulse bg-neutral-900' />
              <div className='h-22 rounded-2xl animate-pulse bg-neutral-900' />
              <div className='h-22 rounded-2xl animate-pulse bg-neutral-900' />
              <div className='h-22 rounded-2xl animate-pulse bg-neutral-900' />
            </>
          ) : (
            <>
              <div className='border border-neutral-800 rounded-2xl px-4 py-3 hover:border-neutral-700 transition-all'>
                <h3 className='text-sm font-bold text-white/50 mb-2'>Delivered</h3>
                <div className='text-2xl font-bold text-white/80'>{stats?.delivered}</div>
              </div>
              <div className='border border-neutral-800 rounded-2xl px-4 py-3 hover:border-neutral-700 transition-all'>
                <h3 className='text-sm font-bold text-white/50 mb-2'>Pending</h3>
                <div className='text-2xl font-bold text-white/80'>{stats?.pending}</div>
              </div>
              <div className='border border-neutral-800 rounded-2xl px-4 py-3 hover:border-neutral-700 transition-all'>
                <h3 className='text-sm font-bold text-white/50 mb-2'>Shipped</h3>
                <div className='text-2xl font-bold text-white/80'>{stats?.shipped}</div>
              </div>
              <div className='border border-neutral-800 rounded-2xl px-4 py-3 hover:border-neutral-700 transition-all'>
                <h3 className='text-sm font-bold text-white/50 mb-2'>Cancelled</h3>
                <div className='text-2xl font-bold text-white/80'>{stats?.cancelled}</div>
              </div>
            </>
          )
        }

      </div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold text-white/80'>Orders</h1>
          <p className='text-sm text-neutral-500'>
            Track and manage your orders effectively
          </p>
        </div>
      </div>
      <div className='mt-8 mb-4'>
        <div className='flex items-center justify-between'>
          <div className='relative flex items-center w-64'>
            <div className='absolute left-3 text-neutral-500 pointer-events-none'>
              <FiSearch />
            </div>
            <input
              value={SearchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              type='text'
              placeholder='Search Name / ID / Email...'
              className='bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm rounded-xl pl-10 pr-4 py-1.5 font-medium placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors w-full'
            />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="statusFilter" className='text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
              Filter by:
            </label>
            <div className='relative flex items-center'>
              <select value={statusFilter} onChange={(e) => handleFilterChange(e.target.value)} className='appearance-none bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm rounded-xl pl-4 pr-10 py-1.5 font-bold cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors w-40' id="statusFilter">
                <option className='bg-neutral-900 text-neutral-400' value="">All Orders</option>
                <option className='bg-neutral-900 text-neutral-400' value="delivered">Delivered</option>
                <option className='bg-neutral-900 text-neutral-400' value="shipped">Shipped</option>
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
          <div className='overflow-x-auto border transition-all border-neutral-800 px-6 rounded-2xl'>
            <table className='w-full overflow-y-scroll'>
              <thead>
                <tr className='text-neutral-400 text-left border-b border-neutral-700'>
                  {/* <th className='pt-6 pb-4'>Customer Id</th> */}
                  <th onClick={() => handleSort('id')} className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Order ID {sortBy === 'id' ? (orderBy === 'asc' ? <HiArrowUp /> : <HiArrowDown />) : <HiArrowsUpDown className='stroke-1' />}
                    </div>
                  </th>
                  <th className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Name
                    </div>
                  </th>
                  <th onClick={() => handleSort('status')} className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Status {sortBy === 'status' ? (orderBy === 'asc' ? <HiArrowUp /> : <HiArrowDown />) : <HiArrowsUpDown className='stroke-1' />}
                    </div>
                  </th>
                  <th className='py-4 cursor-default'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: IOrder) => (
                  <tr onClick={() => setSelectedOrder(order.id)} key={order.id} className='border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors cursor-pointer '>
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
            <OrderPanel
              isOpen={!!selectedOrder}
              onClose={() => setSelectedOrder(null)}
              order={orderData}
              loading={orderLoading}
            />
          </div>
        )
      }

    </div>
  )
}

export default Orders