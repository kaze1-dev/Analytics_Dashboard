"use client";
import CustomDrawer from '@/components/customDrawer';
import Pagination from '@/components/pagination';
import useCustomerData from '@/hooks/useCustomerData';
import useCustomerDetails from '@/hooks/useCustomerDetails';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

export default function Customers() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const size = searchParams.get('size');
  const pageNum = Number(page) || 1;
  const sizeNum = Number(size) || 25;

  const { data: result, isLoading, error } = useCustomerData(pageNum, sizeNum);
  const customers = result?.data || []
  const metadata = result?.metadata
  const totalPages = Number(metadata?.totalPages)
  const currentPage = Number(metadata?.currentPage)
  const {data: customerDetails, isLoading: isPending, error: isError} = useCustomerDetails(selectedId)
  return (
    <div className='pl-55 pr-6 pb-10'>
      <div className='flex justify-between items-center my-8'>
        <div className='flex flex-col'>
          <h1 className='text-3xl text-neutral-200 font-bold'>
            Customers
          </h1>
          <p className='text-sm text-neutral-400'>
            Track and manage your customers efficiently
          </p>
        </div>
        <button className='bg-neutral-900 px-6 rounded-full py-1 font-bold border border-neutral-800 text-neutral-200 flex justify-center items-center gap-2'>

          <span className='text-2xl'>+</span> New customer
        </button>
      </div>
      <div className='overflow-x-auto border border-neutral-800 px-6 rounded-2xl'>
        <table className='w-full overflow-y-scroll'>
          <thead>
            <tr className='text-neutral-400 text-left border-b border-neutral-700'>
              {/* <th className='pt-6 pb-4'>Customer Id</th> */}
              <th className='py-4'>Name</th>
              <th className='py-4'>Status</th>
              <th className='py-4'>Email</th>
              <th className='py-4'>Total orders</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className='border-b text-left text-neutral-300 text-sm border-neutral-800 last:border-none rounded'
                  onClick={() => setSelectedId(customer.id)}
                >
                  {/* <td className='font-bold py-6 text-neutral-400'>{customer.id.slice(-4).toUpperCase()}</td> */}
                  <td className='font-bold py-6 text-neutral-400'>{customer.name}</td>
                  <td className={`font-bold py-6 text-neutral-400`}>
                    <span className={` ${customer.status === "Active" ? 'bg-green-950/50  text-green-600' : 'bg-red-950 text-red-600'} text-xs font-bold px-3 py-1 rounded-xl`}>
                    {customer.status}
                    </span>
                  </td>
                  <td className='font-bold py-6 text-neutral-400'>{customer.email}</td>
                  <td className='font-bold py-6 text-neutral-400'>{customer.orderCount}</td>
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
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>

    </div>
  )
}

