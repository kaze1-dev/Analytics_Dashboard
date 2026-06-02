"use client";
import Pagination from '@/components/pagination';
import useProducts from '@/hooks/useProducts';
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { HiChevronDown } from 'react-icons/hi2';
import { useSearchParams, useRouter } from 'next/navigation';
import Panel from '@/components/products/panel';
import useProductDetails from '@/hooks/useProductDetails';
import NewPanel from '@/components/products/newPanel';

const COLORS: any = {
  'Low Stock': 'bg-red-600/10 text-red-600',
  'In Stock': 'bg-green-600/10 text-green-600',
  'Out of Stock': 'bg-red-600/10 text-red-600'
}
const Products = () => {
  const [selectedId, setSelectedId] = useState<string | null | boolean>(null)
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 25;
  const statusFilter = searchParams.get('status') || '';
  const urlSearch = searchParams.get('search') || '';
  const [searchVal, setSearchVal] = useState<string>(urlSearch)
  const { data, isLoading, error } = useProducts(page, size, statusFilter, urlSearch)
  const products = data?.products || [];
  const metadata = data?.metadata || {};
  const { totalPages, currentPage } = metadata;
  const { data: productDetail, isLoading: isPending, error: pError } = useProductDetails(selectedId as string)

  const handleFilterStatus = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus) {
      params.set('status', newStatus);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchVal) {
        params.set('search', searchVal);
      } else {
        params.delete('search')
      }
      params.set('page', '1');
      router.push(`/products?${params.toString()}`)
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchVal])

  return (
    <div className='pl-55 pr-6 py-10'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold text-white/80'>Products</h1>
          <p className='text-sm text-neutral-500'>
            Track and manage your Products effectively
          </p>
        </div>
        <div className='flex items-center gap-6'>
          <button onClick={() => setIsOpen(true)} className='bg-indigo-700 px-6 rounded-full py-1 font-bold  text-white/80 flex justify-center items-center gap-2 cursor-pointer'>

            <span className='text-2xl'>+</span> Add a product
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
              value={searchVal}
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
              <select className='appearance-none bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm rounded-xl pl-4 pr-10 py-1.5 font-bold cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors w-40' id="statusFilter" value={statusFilter} onChange={(e) => handleFilterStatus(e.target.value)}>
                <option className='bg-neutral-900 text-neutral-400' value="">All Products</option>
                <option className='bg-neutral-900 text-neutral-400' value="in_stock">In Stock</option>
                <option className='bg-neutral-900 text-neutral-400' value="low_stock">Low Stock</option>
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
          <div className='w-full h-90 flex justify-center items-center animate-pulse rounded-2xl bg-neutral-900' />
        ) : (
          <div className='overflow-x-auto border border-neutral-800 transition-all px-6 rounded-2xl'>
            <table className='w-full overflow-y-scroll '>
              <thead>
                <tr className='text-neutral-400 text-left border-b border-neutral-700'>
                  {/* <th className='pt-6 pb-4'>Customer Id</th> */}
                  <th /* onClick={() => handleSort('id')} */ className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Product ID {/* {sortBy === 'id' ? (orderBy === 'asc' ? <HiArrowUp /> : <HiArrowDown />) : <HiArrowsUpDown className='stroke-1' />} */}
                    </div>
                  </th>
                  <th className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Product   Name
                    </div>
                  </th>
                  <th /* onClick={() => handleSort('status')}  */ className='py-4 '>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      Status {/* {sortBy === 'status' ? (orderBy === 'asc' ? <HiArrowUp /> : <HiArrowDown />) : <HiArrowsUpDown className='stroke-1' />} */}
                    </div>
                  </th>
                  <th className='py-4 cursor-default'>
                    Price
                  </th>
                  <th className='py-4 pl-10 cursor-default'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr onClick={() => setSelectedId(product.id)} key={product.id} className='border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors cursor-pointer '>
                    <td className='py-5 uppercase font-bold text-sm text-white/80'>...{product.id.slice(-4)}</td>
                    <td className='py-5 text-white/80 font-semibold text-sm'>{product.name}</td>
                    <td className={`py-5 font-bold text-sm `}>
                      <span className={` rounded-xl  px-4 py-1 ${COLORS[product.status]}`}>{product.status}</span>
                    </td>
                    <td className={`py-5 font-bold text-sm `}>
                      <span className={`rounded-xl`}>{product.price}</span>
                    </td>
                    <td className='py-5 pl-10'>
                      <button className='text-indigo-500 text-sm hover:text-indigo-400'>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
            <Panel
              onClose={() => setSelectedId(null)}
              isOpen={!!selectedId}
              product={productDetail}
              loading={isPending}
            />
            {
              isOpen && <NewPanel
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />
            }

          </div>
        )
      }

    </div>
  )
}

export default Products