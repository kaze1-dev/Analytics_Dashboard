"use client";
import CustomDrawer from '@/components/customer/customDrawer';
import CustomerPanel from '@/components/customer/newCustomerPanel';
import Pagination from '@/components/pagination';
import useCustomerData from '@/hooks/useCustomerData';
import useCustomerDetails from '@/hooks/useCustomerDetails';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { HiArrowDown, HiArrowsUpDown, HiArrowUp, HiChevronDown } from 'react-icons/hi2';

export default function Customers() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>()
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const size = searchParams.get('size');
  const sortBy = searchParams.get("sortBy") || "name";
  const orderBy = searchParams.get("orderBy") || "asc";
  const statusFilter = searchParams.get("status") || ''
  const urlSearch = searchParams.get('search') || '';
  const pageNum = Number(page) || 1;
  const sizeNum = Number(size) || 25;
  const [searchVal, setSearchVal] = useState(urlSearch)
  const { data: result, isLoading, error } = useCustomerData(pageNum, sizeNum, sortBy, orderBy, statusFilter, urlSearch);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (searchVal) {
        params.set('search', searchVal);
      } else {
        params.delete('search')
      }
      params.set('page', '1')
      router.push(`/customer?${params.toString()}`);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchVal])
  const handleSort = (columnName: string) => {
    let newOrder = 'asc';
    if (sortBy === columnName) {
      newOrder = orderBy === 'asc' ? 'desc' : 'asc'
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', columnName);
    params.set('orderBy', newOrder)
    router.push(`/customer?${params.toString()}`)
  }

  const handleFilterChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus) {
      params.set('status', newStatus)
    } else {
      params.delete('status');
    }
    params.set('page', '1')
    router.push(`/customer?${params.toString()}`)
  }
  const customers = result?.data || []
  const metadata = result?.metadata
  const totalPages = Number(metadata?.totalPages)
  const currentPage = Number(metadata?.currentPage)
  const { data: customerDetails, isLoading: isPending, error: isError } = useCustomerDetails(selectedId)
  const Colors: any = {
    active: 'bg-green-600/10 text-green-600',
    inactive: 'bg-red-600/10 text-red-600',
    lead: 'bg-stone-600/10 text-stone-500',
    pending: 'bg-yellow-600/10 text-yellow-600'
  }

  return (
    <>

      <div className='pl-55 pr-6 pb-10'>


        <>
          <div>
            <div className='flex justify-between items-center my-8'>

              <div className='flex flex-col'>
                <h1 className='text-3xl text-neutral-200 font-bold'>
                  Customers
                </h1>
                <p className='text-sm text-neutral-400'>
                  Track and manage your customers efficiently
                </p>
              </div>
              <div className='flex items-center gap-6'>
                <button onClick={() => setIsOpen(true)} className='bg-indigo-700 px-6 rounded-full py-1 font-bold  text-white/80 flex justify-center items-center gap-2 cursor-pointer'>

                  <span className='text-2xl'>+</span> New customer
                </button>

              </div>
            </div>
            <div>
              <div className='flex items-center justify-between mb-6'>
                <div className='relative flex items-center  w-64'>
                  <div className='absolute left-3 text-neutral-500 pointer-events-none'>
                    <FiSearch />
                  </div>
                  <input
                    type='text'
                    placeholder='Search name or email...'
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className='bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm rounded-xl pl-10 pr-4 py-1.5 font-medium placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors w-full'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <label htmlFor="statusFilter" className='text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
                    Filter by:
                  </label>
                  <div className='relative flex items-center'>
                    <select value={statusFilter} onChange={(e) => handleFilterChange(e.target.value)} className='appearance-none bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm rounded-xl pl-4 pr-10 py-1.5 font-bold cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors w-40' id="statusFilter">
                      <option className='bg-neutral-900 text-neutral-400' value="">All Customers</option>
                      <option className='bg-neutral-900 text-neutral-400' value="active">Active</option>
                      <option className='bg-neutral-900 text-neutral-400' value="inactive">Inactive</option>
                      <option className='bg-neutral-900 text-neutral-400' value="lead">Lead</option>
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
                <div className='bg-neutral-900 rounded-2xl animate-pulse w-full h-120'></div>
              ) : (
                <div className='overflow-x-auto border border-neutral-800 px-6 rounded-2xl'>
                  <table className='w-full overflow-y-scroll'>
                    <thead>
                      <tr className='text-neutral-400 text-left border-b border-neutral-700'>
                        {/* <th className='pt-6 pb-4'>Customer Id</th> */}
                        <th onClick={() => handleSort('name')} className='py-4 '>
                          <div className='flex items-center gap-2 cursor-pointer'>
                            Name {sortBy === 'name' ? (orderBy === 'asc' ? <HiArrowUp size={14} className='text-indigo-500 stroke-1' /> : <HiArrowDown size={14} className='text-indigo-500 stroke-1' />) : <HiArrowsUpDown className='stroke-1' />}
                          </div>
                        </th>
                        <th onClick={() => handleSort('email')} className='py-4 '>
                          <div className='flex items-center gap-2 cursor-pointer'>
                            Email {sortBy === 'email' ? (orderBy === 'asc' ? <HiArrowUp className='text-indigo-500 stroke-1' /> : <HiArrowDown className='text-indigo-500 stroke-1' />) : <HiArrowsUpDown className='stroke-1' />}
                          </div>
                        </th>
                        <th onClick={() => handleSort('status')} className='py-4 '>
                          <div className='flex items-center gap-2 cursor-pointer'>
                            Status {sortBy === 'status' ? (orderBy === 'asc' ? <HiArrowUp className='text-indigo-500 stroke-1' /> : <HiArrowDown className='text-indigo-500 stroke-1' />) : <HiArrowsUpDown className='stroke-1' />}
                          </div>
                        </th>
                        <th className='py-4 cursor-default'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        customers.map((customer) => (
                          <tr
                            key={customer.id}
                            className='border-b text-left text-neutral-300 text-sm border-neutral-800 last:border-none cursor-pointer hover:bg-neutral-900 transition-all rounded-full'
                            onClick={() => setSelectedId(customer.id)}
                          >
                            {/* <td className='font-bold py-6 text-neutral-400'>{customer.id.slice(-4).toUpperCase()}</td> */}
                            <td className='font-bold py-6 text-white/80'>{customer.name}</td>
                            <td className='font-bold py-6 text-white/80'>{customer.email}</td>
                            <td className={`font-bold py-6 text-white/80 pr-15`}>
                              <span className={`text-xs font-bold px-3  py-1 rounded-xl ${Colors[customer.status]}`}>
                                {customer.status}
                              </span>
                            </td>
                            <td className='font-bold py-6 text-center text-white/80 '>
                              <div className='flex ml-3'>
                                <div className='text-indigo-500'>
                                  <FiChevronRight size={18} />
                                </div>
                                <div className='text-indigo-500'>
                                  <FiChevronRight size={18} />
                                </div>
                              </div>
                            </td>

                          </tr>
                        ))

                      }
                    </tbody>
                  </table>
                  <CustomDrawer
                    isOpen={!!selectedId}
                    onClose={() => setSelectedId(null)}
                    customer={customerDetails}
                    isLoading={isPending}
                  />
                  <CustomerPanel
                    isOpen={isOpen}
                    closed={() => setIsOpen(false)}
                  />
                  <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
              )
            }

          </div>
        </>

      </div>
    </>
  )
}

