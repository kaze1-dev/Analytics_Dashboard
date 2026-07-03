"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiSearch, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import { HiChevronDown } from 'react-icons/hi2';
import { AnimatePresence } from 'framer-motion';

import Pagination from '@/components/pagination';
import Panel from '@/components/products/panel';
import NewPanel from '@/components/products/newPanel';
import useProducts from '@/hooks/useProducts';
import useProductDetails from '@/hooks/useProductDetails';

// Uniform status style configuration mapping
const STATUS_STYLES: Record<string, string> = {
  'In Stock': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Low Stock': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  'Out of Stock': 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

const Products = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 25;
  const statusFilter = searchParams.get('status') || '';
  const urlSearch = searchParams.get('search') || '';
  
  const [searchVal, setSearchVal] = useState<string>(urlSearch);

  // Destructured 'refetch' to handle reconnection attempts or manual retries
  const { data, isLoading, error, refetch } = useProducts(page, size, statusFilter, urlSearch);
  const products = data?.products || [];
  const metadata = data?.metadata || {};
  const { totalPages, currentPage } = metadata;

  const { data: productDetail, isLoading: isPending } = useProductDetails(selectedId as string);

  // Synchronize searching values if the browser URL changes externally
  useEffect(() => {
    setSearchVal(urlSearch);
  }, [urlSearch]);

  // Debounced search utility to prevent continuous database queries
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchVal) {
        params.set('search', searchVal);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`/products?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  const handleFilterStatus = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus) {
      params.set('status', newStatus);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 px-4 sm:px-8 md:pl-64 md:pr-8 pb-12 transition-all duration-200 cursor-default">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100">
            Products
          </h1>
          <p className="text-sm text-neutral-400 mt-1 hidden sm:block">
            Track and manage your product catalog, inventory status, and pricing.
          </p>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/10 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <span className="text-xl font-medium">+</span>
          <span>New Product</span>
        </button>
      </div>

      {/* Filter and Search Actions Bar */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-400">
            <FiSearch size={18} />
          </div>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            type="text"
            placeholder="Search by name or ID..."
            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm rounded-xl pl-11 pr-4 py-2.5 font-medium placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <label htmlFor="statusFilter" className="text-xs font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap">
            Filter Availability:
          </label>
          <div className="relative w-full sm:w-44">
            <select 
              id="statusFilter" 
              value={statusFilter} 
              onChange={(e) => handleFilterStatus(e.target.value)}
              className="w-full appearance-none bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm rounded-xl pl-4 pr-10 py-2.5 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">All Products</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-400">
              <HiChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {isLoading ? (
          /* High-Fidelity Skeletal Loader (Matches Table Layout exactly) */
          <div className="border border-neutral-900 bg-neutral-900/20 rounded-2xl p-6 space-y-4">
            <div className="h-6 bg-neutral-900 rounded-lg w-1/5 animate-pulse mb-6" />
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2.5">
                <div className="h-5 bg-neutral-900 rounded-md w-24 animate-pulse hidden md:block" />
                <div className="h-5 bg-neutral-900 rounded-md flex-1 animate-pulse" />
                <div className="h-6 bg-neutral-900 rounded-xl w-24 animate-pulse" />
                <div className="h-5 bg-neutral-900 rounded-md w-16 animate-pulse hidden sm:block" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Network Error State Container with Manual Refetch Control */
          <div className="border border-dashed border-neutral-800 bg-neutral-900/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto mt-12">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 mb-4">
              <FiAlertTriangle size={24} />
            </div>
            <h3 className="text-base font-bold text-neutral-200">Connection Error</h3>
            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
              We couldn't connect to the server to fetch your items. This might be due to a lost internet connection or an temporary system issue.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs rounded-xl border border-neutral-800 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FiRefreshCw size={12} />
              <span>Try Again</span>
            </button>
          </div>
        ) : (
          /* Content Table Container */
          <div className="overflow-x-auto border border-neutral-900 bg-neutral-900/10 rounded-2xl shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-400 font-semibold text-xs uppercase tracking-wider select-none">
                  <th className="p-4 pl-6 hidden md:table-cell">Product ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 hidden sm:table-cell">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/60 text-sm">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-neutral-500 font-medium">
                      No matching products were found in your catalog.
                    </td>
                  </tr>
                ) : (
                  products.map((product: any) => (
                    <tr 
                      key={product.id} 
                      onClick={() => setSelectedId(product.id)}
                      className="group border-neutral-900 text-neutral-300 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                    >
                      <td className="p-4 pl-6 font-mono text-xs font-bold text-neutral-500 hidden md:table-cell uppercase tracking-wider">
                        ...{product.id?.slice(-4) || '0000'}
                      </td>
                      <td className="p-4 font-semibold text-neutral-200 group-hover:text-white transition-colors">
                        {product.name}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${STATUS_STYLES[product.status] || 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 font-semibold text-neutral-300 tabular-nums hidden sm:table-cell">
                        {product.price}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Layer */}
            {products.length > 0 && (
              <div className="p-4 border-t border-neutral-900 bg-neutral-950/40">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Side Slide-out Drawer Panel Viewers */}
      <AnimatePresence mode="wait">
        {selectedId && (
          <Panel
            onClose={() => setSelectedId(null)}
            isOpen={!!selectedId}
            product={productDetail}
            loading={isPending}
          />
        )}
      </AnimatePresence>

      <NewPanel
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Products;