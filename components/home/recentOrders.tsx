"use client";

import React from 'react';
import { MoveRight, ShoppingBag } from 'lucide-react';
import useRecentOrders from '@/hooks/useRecentOrder';

interface CustomerProfile {
  name: string;
}

interface OrderRecord {
  id: string;
  createdAt: string;
  status: "delivered" | "pending" | "cancelled" | "shipped" | string;
  totalAmount: number;
  customer?: CustomerProfile;
}

const statusStyles: Record<string, string> = {
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  shipped: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

const OrdersTable = () => {
  const { data: orders, isLoading, error } = useRecentOrders();

  if (isLoading) {
    return (
      <div className="w-full h-[400px] bg-neutral-900/20 animate-pulse flex items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 border-2 border-neutral-700 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-neutral-500 font-medium tracking-wide">Fetching recent transactions...</span>
        </div>
      </div>
    );
  }

  if (error || !orders || orders.length === 0) {
    return (
      <div className="w-full h-[400px] flex flex-col items-center justify-center border border-dashed border-neutral-900 rounded-2xl p-6 text-center">
        <div className="h-10 w-10 rounded-xl bg-neutral-900/60 border border-neutral-800/60 flex items-center justify-center text-neutral-500 mb-3">
          <ShoppingBag size={18} />
        </div>
        <h3 className="text-sm font-semibold text-neutral-300">No transactions recorded</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs">New processing updates will appear automatically when operations process.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col min-h-[400px] justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-neutral-200 font-bold text-lg tracking-tight">
            Recent Orders
          </h2>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800">
            Live updates
          </span>
        </div>
        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-neutral-500 text-xs font-bold uppercase tracking-wider border-b border-neutral-900 pb-3">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Customer Name</th>
                <th className="pb-3 font-semibold">Purchase Date</th>
                <th className="pb-3 font-semibold">Status Badge</th>
                <th className="pb-3 text-right font-semibold">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/40">
              {orders.map((order: OrderRecord) => {
                const standardizedStatus = order.status.toLowerCase();
                return (
                  <tr
                    key={order.id}
                    className="group text-sm hover:bg-neutral-900/20 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="py-4 font-mono text-neutral-400 font-semibold group-hover:text-neutral-200 transition-colors">
                      #{order.id.slice(-4).toUpperCase()}
                    </td>
                    <td className="py-4 text-neutral-300 font-medium max-w-40 truncate">
                      {order.customer?.name || "Anonymous Guest"}
                    </td>
                    <td className="py-4 text-neutral-400 font-medium">
                      {dateFormatter.format(new Date(order.createdAt))}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 border rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                        statusStyles[standardizedStatus] || "bg-neutral-900 text-neutral-400 border-neutral-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-semibold text-neutral-200 tabular-nums">
                      {currencyFormatter.format(order.totalAmount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-bold text-xs uppercase tracking-wider items-center justify-center mt-6 pt-4 border-t border-neutral-900/60 cursor-pointer group w-full sm:w-auto mx-auto">
        <span>View all records</span>
        <MoveRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default OrdersTable;