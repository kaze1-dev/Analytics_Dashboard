"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import {
  HiArrowDown,
  HiArrowsUpDown,
  HiArrowUp,
  HiChevronDown,
  HiOutlineExclamationTriangle,
  HiArrowPath
} from 'react-icons/hi2';

import OrderPanel from '@/components/order/orderPanel';
import Pagination from '@/components/pagination';
import { useOrderData } from '@/hooks/useOrderData';
import useOrderDetails from '@/hooks/useOrderDetails';
import useOrderStats from '@/hooks/useOrderStats';

interface IOrder {
  id: string;
  status: string;
  customer: {
    name: string;
    phone: string;
  };
  totalAmount: string;
}

const COLORS: Record<string, string> = {
  delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  shipped: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
};

const Orders = () => {
  const params = useSearchParams();
  const router = useRouter();

  const page = Number(params.get('page')) || 1;
  const size = Number(params.get('size')) || 25;
  const statusFilter = params.get('status') || '';
  const sortBy = params.get('sortBy') || 'createdAt';
  const orderBy = params.get('orderBy') || 'asc';
  const urlSearch = params.get('search') || '';

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState<string>(urlSearch);

  const {
    data,
    isLoading,
    error,
    refetch: refetchOrders
  } = useOrderData(page, size, orderBy, sortBy, statusFilter, urlSearch);

  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
    refetch: refetchDetails
  } = useOrderDetails(selectedOrder as string);

  const {
    data: stats,
    isLoading: isPending,
    error: statError,
    refetch: refetchStats
  } = useOrderStats();

  const orders = data?.orders || [];
  const metadata = data?.metadata || {};
  const totalPages = metadata.totalPages || 0;
  const currentPage = metadata.currentPage || 0;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const activeParams = new URLSearchParams(params.toString());

      if (searchVal) {
        activeParams.set('search', searchVal);
      } else {
        activeParams.delete('search');
      }
      activeParams.set('page', '1');
      router.push(`/orders?${activeParams.toString()}`, { scroll: false });
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  const handleFilterChange = (newStatus: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (newStatus) {
      newParams.set('status', newStatus);
    } else {
      newParams.delete('status');
    }
    newParams.set('page', '1');
    router.push(`/orders?${newParams.toString()}`, { scroll: false });
  };
  const handleSort = (columnName: string) => {
    let newOrderBy = 'asc';
    if (sortBy === columnName) {
      newOrderBy = orderBy === 'asc' ? 'desc' : 'asc';
    }
    const newParams = new URLSearchParams(params.toString());
    newParams.set('sortBy', columnName);
    newParams.set('orderBy', newOrderBy);
    router.push(`/orders?${newParams.toString()}`, { scroll: false });
  };
  const triggerGlobalRecovery = () => {
    if (error) refetchOrders();
    if (statError) refetchStats();
    if (orderError && selectedOrder) refetchDetails();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:pl-64 md:pr-8 mt-6 pb-12 select-none cursor-default">
      {(error || statError) && (
        <div className="w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <HiOutlineExclamationTriangle className="text-rose-400 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-rose-200">Data Synchronization Failure</p>
              <p className="text-xs text-rose-400/80 mt-0.5">Could not establish a secure handshake with API services. Check your connection.</p>
            </div>
          </div>
          <button
            onClick={triggerGlobalRecovery}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all"
          >
            <HiArrowPath size={14} />
            <span>Retry Connection</span>
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isPending ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-[78px] rounded-2xl bg-neutral-900/40 border border-neutral-900 animate-pulse" />
          ))
        ) : (
          (Object.keys(COLORS) as Array<keyof typeof COLORS>).map((key) => (
            <div key={key} className="bg-neutral-900/10 border border-neutral-900 rounded-2xl px-4 py-3 hover:border-neutral-800 transition-colors group">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5 group-hover:text-neutral-400 transition-colors">
                {key}
              </h3>
              <div className="text-2xl font-black text-neutral-200 tabular-nums tracking-tight">
                {stats?.[key] ?? 0}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-200">Order Manifest</h1>
          <p className="text-xs text-neutral-500 mt-0.5 font-medium">Track, evaluate, and fulfill global consumer purchases.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 bg-neutral-900/20 border border-neutral-900/80 p-3 rounded-2xl">
        <div className="relative flex items-center w-full md:w-80">
          <FiSearch className="absolute left-3.5 text-neutral-500 pointer-events-none" size={14} />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            type="text"
            placeholder="Search matching identity, name, metrics..."
            className="w-full bg-neutral-950 border border-neutral-800/80 text-neutral-300 text-xs rounded-xl pl-10 pr-4 py-2 font-medium placeholder-neutral-600 focus:outline-none focus:border-indigo-500/60 transition-colors shadow-inner"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-neutral-900 pt-3 md:pt-0">
          <label htmlFor="statusFilter" className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider shrink-0">
            Lifecycle Scope:
          </label>
          <div className="relative flex items-center">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="appearance-none bg-neutral-950 border border-neutral-800/80 text-neutral-400 text-xs font-bold rounded-xl pl-4 pr-10 py-2 cursor-pointer focus:outline-none focus:border-indigo-500/60 hover:text-neutral-200 transition-colors min-w-[140px]"
              id="statusFilter"
            >
              <option value="">All Streams</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </select>
            <HiChevronDown size={14} className="absolute right-3.5 pointer-events-none text-neutral-500" />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-[460px] bg-neutral-900/10 border border-neutral-900 rounded-2xl animate-pulse flex items-center justify-center">
          <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest animate-pulse">Recompiling layout space...</span>
        </div>
      ) : (
        <div className="w-full bg-neutral-900/10 border border-neutral-900 rounded-2xl px-6 py-2 overflow-hidden shadow-sm">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse text-left min-w-[650px]">
              <thead>
                <tr className="text-neutral-500 text-xs font-bold uppercase tracking-wider border-b border-neutral-900/80">
                  <th onClick={() => handleSort('id')} className="py-4 cursor-pointer hover:text-neutral-300 transition-colors select-none">
                    <div className="flex items-center gap-1.5">
                      <span>Order ID</span>
                      {sortBy === 'id' ? (orderBy === 'asc' ? <HiArrowUp size={12} /> : <HiArrowDown size={12} />) : <HiArrowsUpDown size={12} className="opacity-40" />}
                    </div>
                  </th>
                  <th className="py-4 font-bold">Buyer name</th>
                  <th onClick={() => handleSort('status')} className="py-4 cursor-pointer hover:text-neutral-300 transition-colors select-none">
                    <div className="flex items-center gap-1.5">
                      <span>Status Badge</span>
                      {sortBy === 'status' ? (orderBy === 'asc' ? <HiArrowUp size={12} /> : <HiArrowDown size={12} />) : <HiArrowsUpDown size={12} className="opacity-40" />}
                    </div>
                  </th>
                  <th className="py-4 text-right font-bold">Action Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40 text-sm">
                {orders.map((order: IOrder) => {
                  const traceKey = order.status?.toLowerCase();
                  return (
                    <tr
                      onClick={() => setSelectedOrder(order.id)}
                      key={order.id}
                      className="group hover:bg-neutral-900/20 transition-colors cursor-pointer"
                    >
                      <td className="py-4.5 font-mono font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors">
                        #{order.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-4.5 text-neutral-300 font-medium">
                        {order.customer?.name || "Guest Checkout"}
                      </td>
                      <td className="py-4.5">
                        <span className={`px-2.5 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${COLORS[traceKey] || 'bg-neutral-900 text-neutral-500 border-neutral-800'
                          }`}>
                          {order.status || "Unknown"}
                        </span>
                      </td>
                      <td className="py-4.5 text-right">
                        <button className="text-xs font-bold uppercase tracking-wide text-indigo-400 hover:text-indigo-300 transition-colors group-hover:underline bg-transparent border-none outline-none cursor-pointer">
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-neutral-900/80 mt-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {selectedOrder && (
          <OrderPanel
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            order={orderData}
            loading={orderLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;