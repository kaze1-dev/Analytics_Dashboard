"use client";

import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  X, 
  Box, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Receipt,
  ShoppingBag
} from 'lucide-react';

interface IOrder {
  id: string;
  status: string;
  totalAmount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    quantity: number;
    price: number | string;
    product: {
      name: string;
      price: number | string;
    };
  }[];
}

interface OrderPanelProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null | undefined;
  loading: boolean;
}

const STATUS_THEMES: Record<string, string> = {
  delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  shipped: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const OrderPanel = ({ isOpen, onClose, order, loading }: OrderPanelProps) => {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const normalizedStatus = order?.status?.toLowerCase() || "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity cursor-pointer"
      />
      <motion.div
        initial={{ x: '100%', opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.8 }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="fixed right-0 top-0 bottom-0 h-full bg-neutral-950 border-l border-neutral-900 px-6 py-6 z-50 w-full sm:w-[440px] flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl"
      >
        <div>
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Receipt size={16} className="text-neutral-500" />
              <h2 className="text-neutral-200 font-bold text-base tracking-tight">
                Order Details
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 active:scale-95 transition-all cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-[74px] bg-neutral-900/60 border border-neutral-900 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-4 bg-neutral-900 w-1/3 rounded" />
                <div className="h-[180px] bg-neutral-900/40 border border-neutral-900 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-900 w-1/4 rounded" />
                <div className="h-16 bg-neutral-900/40 border border-neutral-900 rounded-2xl" />
              </div>
            </div>
          ) : order ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 bg-neutral-900/20 border border-neutral-900 rounded-2xl p-4 divide-x divide-neutral-900">
                <div className="pr-2 space-y-1">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Amount</span>
                  <p className="text-xl font-black text-neutral-100 tabular-nums">
                    {currencyFormatter.format(order.totalAmount)}
                  </p>
                </div>
                <div className="pl-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Status</span>
                  <span className={`inline-block px-2.5 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${
                    STATUS_THEMES[normalizedStatus] || 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  }`}>
                    {order.status || "Unknown"}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Order ID</span>
                <p className="font-mono text-xs font-bold bg-neutral-900 text-neutral-300 border border-neutral-800/80 px-3 py-2.5 rounded-xl select-all tracking-wide">
                  {order.id}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Customer Information</h4>
                <div className="bg-neutral-900/10 border border-neutral-900 rounded-2xl p-4 space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <User size={14} className="text-neutral-500 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-neutral-600 font-medium text-[10px] uppercase">Name</span>
                      <p className="text-neutral-300 font-semibold">{order.customer?.name || "Guest Checkout"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={14} className="text-neutral-500 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-neutral-600 font-medium text-[10px] uppercase">Email</span>
                      <p className="text-neutral-300 font-semibold truncate max-w-[280px] select-all">{order.customer?.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={14} className="text-neutral-500 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-neutral-600 font-medium text-[10px] uppercase">Phone</span>
                      <p className="text-neutral-300 font-mono font-semibold">{order.customer?.phone || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-neutral-900/60 pt-3">
                    <MapPin size={14} className="text-neutral-500 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-neutral-600 font-medium text-[10px] uppercase">Shipping Address</span>
                      <p className="text-neutral-300 font-medium leading-relaxed">{order.customer?.address || "No address provided."}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Items</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800 tabular-nums">
                    {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="divide-y divide-neutral-900 border border-neutral-900 bg-neutral-950 rounded-2xl overflow-hidden max-h-[220px] overflow-y-auto no-scrollbar">
                  {order.items?.map((item, idx) => {
                    const extractedPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 text-xs hover:bg-neutral-900/20 transition-colors group">
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className="h-7 w-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-neutral-500 group-hover:border-indigo-500/20 transition-colors">
                            <Box size={12} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-neutral-300 font-semibold truncate max-w-[180px]">
                              {item.product?.name || "Unknown Product"}
                            </p>
                            <p className="text-[10px] text-neutral-500 font-medium mt-0.5 tabular-nums">
                              Price: {currencyFormatter.format(extractedPrice)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 space-y-0.5">
                          <p className="text-neutral-400 font-bold font-mono">x{item.quantity}</p>
                          <p className="text-indigo-400 font-bold tabular-nums">
                            {currencyFormatter.format(extractedPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-60 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-900 rounded-2xl">
              <ShoppingBag size={24} className="text-neutral-600 mb-2" />
              <p className="text-xs font-semibold text-neutral-400">Order not found</p>
              <p className="text-[11px] text-neutral-600 mt-1 max-w-xs">The details for this order are missing or could not be loaded.</p>
            </div>
          )}
        </div>
        {order && !loading && (
          <div className="border-t border-neutral-900 pt-4 mt-6 flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-xl text-xs font-bold tracking-wide uppercase transition-colors duration-150 active:scale-[0.99] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrderPanel;