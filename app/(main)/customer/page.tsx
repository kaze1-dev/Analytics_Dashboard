"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { 
  HiArrowDown, 
  HiArrowsUpDown, 
  HiArrowUp, 
  HiChevronDoubleRight, 
  HiChevronDown 
} from 'react-icons/hi2';

import CustomDrawer from '@/components/customer/customDrawer';
import CustomerPanel from '@/components/customer/newCustomerPanel';
import Pagination from '@/components/pagination';
import useCustomerData from '@/hooks/useCustomerData';
import useCustomerDetails from '@/hooks/useCustomerDetails';

// Structured type definitions for the status badge component styling
const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  inactive: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  lead: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  pending: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
};

export default function Customers() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page");
  const size = searchParams.get('size');
  const sortBy = searchParams.get("sortBy") || "name";
  const orderBy = searchParams.get("orderBy") || "asc";
  const statusFilter = searchParams.get("status") || '';
  const urlSearch = searchParams.get('search') || '';

  const pageNum = Number(page) || 1;
  const sizeNum = Number(size) || 25;
  const [searchVal, setSearchVal] = useState(urlSearch);

  const { data: result, isLoading } = useCustomerData(pageNum, sizeNum, sortBy, orderBy, statusFilter, urlSearch);
  const { data: customerDetails, isLoading: isPending } = useCustomerDetails(selectedId);

  // Sync state if URL updates externally
  useEffect(() => {
    setSearchVal(urlSearch);
  }, [urlSearch]);

  // Debounced search setup
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchVal) {
        params.set('search', searchVal);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`/customer?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  const handleSort = (columnName: string) => {
    let newOrder = 'asc';
    if (sortBy === columnName) {
      newOrder = orderBy === 'asc' ? 'desc' : 'asc';
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', columnName);
    params.set('orderBy', newOrder);
    router.push(`/customer?${params.toString()}`);
  };

  const handleFilterChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus) {
      params.set('status', newStatus);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    router.push(`/customer?${params.toString()}`);
  };

  const customers = result?.data || [];
  const metadata = result?.metadata;
  const totalPages = Number(metadata?.totalPages || 0);
  const currentPage = Number(metadata?.currentPage || 1);

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 px-4 sm:px-8 md:pl-64 md:pr-8 pb-12 transition-all duration-200">
      {/* Header Viewport */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100">
            Customers
          </h1>
          <p className="text-sm text-neutral-400 mt-1 hidden sm:block">
            Track and manage your client bases, pipelines, and status workflows.
          </p>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/10 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <span>+</span>
          <span>New Customer</span>
        </button>
      </div>

      {/* Control Actions (Search & Filter) */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-400">
            <FiSearch size={18} />
          </div>
          <input
            name="customer-search"
            type="text"
            placeholder="Search by name or email address..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm rounded-xl pl-11 pr-4 py-2.5 font-medium placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <label htmlFor="statusFilter" className="text-xs font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap">
            Filter Status:
          </label>
          <div className="relative w-full sm:w-44">
            <select 
              value={statusFilter} 
              onChange={(e) => handleFilterChange(e.target.value)} 
              className="w-full appearance-none bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm rounded-xl pl-4 pr-10 py-2.5 font-medium cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
              id="statusFilter"
            >
              <option value="">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="lead">Lead</option>
              <option value="pending">Pending</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-400">
              <HiChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Block */}
      <div className="mt-6">
        {isLoading ? (
          /* High Fidelity Skeleton Table State */
          <div className="border border-neutral-900 bg-neutral-900/20 rounded-2xl p-6 space-y-4">
            <div className="h-6 bg-neutral-900 rounded-lg w-1/4 animate-pulse mb-6" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center py-2">
                <div className="h-5 bg-neutral-900 rounded-md flex-1 animate-pulse" />
                <div className="h-5 bg-neutral-900 rounded-md flex-1 animate-pulse hidden lg:block" />
                <div className="h-6 bg-neutral-900 rounded-xl w-20 animate-pulse" />
                <div className="h-5 bg-neutral-900 rounded-md w-8 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-900 bg-neutral-900/10 rounded-2xl shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-400 font-semibold text-xs uppercase tracking-wider select-none">
                  <th onClick={() => handleSort('name')} className="p-4 pl-6 cursor-pointer hover:text-neutral-200 transition-colors">
                    <div className="flex items-center gap-1.5">
                      Name 
                      {sortBy === 'name' ? (
                        orderBy === 'asc' ? <HiArrowUp size={14} className="text-indigo-500" /> : <HiArrowDown size={14} className="text-indigo-500" />
                      ) : <HiArrowsUpDown size={14} className="opacity-40" />}
                    </div>
                  </th>
                  <th onClick={() => handleSort('email')} className="p-4 cursor-pointer hover:text-neutral-200 transition-colors hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      Email 
                      {sortBy === 'email' ? (
                        orderBy === 'asc' ? <HiArrowUp size={14} className="text-indigo-500" /> : <HiArrowDown size={14} className="text-indigo-500" />
                      ) : <HiArrowsUpDown size={14} className="opacity-40" />}
                    </div>
                  </th>
                  <th onClick={() => handleSort('status')} className="p-4 cursor-pointer hover:text-neutral-200 transition-colors">
                    <div className="flex items-center gap-1.5">
                      Status 
                      {sortBy === 'status' ? (
                        orderBy === 'asc' ? <HiArrowUp size={14} className="text-indigo-500" /> : <HiArrowDown size={14} className="text-indigo-500" />
                      ) : <HiArrowsUpDown size={14} className="opacity-40" />}
                    </div>
                  </th>
                  <th className="p-4 pr-6 text-right font-medium text-neutral-500 normal-case">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/60 text-sm">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-neutral-500 font-medium">
                      No data found matching your current parameters.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer: any) => (
                    <tr
                      key={customer.id}
                      onClick={() => setSelectedId(customer.id)}
                      className="group border-neutral-900 text-neutral-300 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                    >
                      <td className="p-4 pl-6 font-medium text-neutral-200 group-hover:text-white transition-colors">
                        {customer.name}
                      </td>
                      <td className="p-4 text-neutral-400 hidden lg:table-cell">
                        {customer.email}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[customer.status] || 'bg-neutral-800 text-neutral-400'}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex justify-center items-center text-neutral-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all">
                          <HiChevronDoubleRight size={16} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls Footer Container */}
            {customers.length > 0 && (
              <div className="p-4 border-t border-neutral-900 bg-neutral-950/40">
                <Pagination totalPages={totalPages} currentPage={currentPage} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drawer Sheets & Modal Panels */}
      <AnimatePresence mode="wait">
        {selectedId && (
          <CustomDrawer
            isOpen={!!selectedId}
            onClose={() => setSelectedId(null)}
            customer={customerDetails}
            isLoading={isPending}
          />
        )}
      </AnimatePresence>

      <CustomerPanel
        isOpen={isOpen}
        closed={() => setIsOpen(false)}
      />
    </div>
  );
}