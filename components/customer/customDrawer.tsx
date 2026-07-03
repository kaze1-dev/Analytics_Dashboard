"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { format } from 'date-fns';
import {
  HiCheck,
  HiOutlineTrash,
  HiPencilSquare,
  HiUserCircle,
  HiXMark,
  HiMapPin,
  HiEnvelope,
  HiPhone,
  HiCalendarDays,
  HiShoppingBag,
  HiExclamationCircle
} from 'react-icons/hi2';

import useUpdateCustomer from '@/hooks/useCustomerPatch';
import { UpdateCustomerInput, UpdateCustomerSchema } from '@/validaton';
import WarningBox from './warningBox';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  customer?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    orderCount: number;
    status: string;
    address: string;
    phone: string;
    totalSpent: number;
    orders: {
      items: {
        quantity: number;
        price: number;
        product: {
          name: string;
          price: number;
        };
      }[];
    }[];
  };
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  lead: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const CustomDrawer = ({ isOpen, onClose, customer, isLoading }: Props) => {
  const [activeTab, setActiveTab] = useState<'Information' | 'Orders'>('Information');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof UpdateCustomerInput, string>>>({});
  const [errorBox, setErrorBox] = useState<boolean>(false);
  const [warnBox, setWarnBox] = useState<boolean>(false);
  const [messageBox, setMessageBox] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
  });

  const { mutate, isPending } = useUpdateCustomer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (customer && isOpen) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
      });
    }
  }, [customer, isOpen]);

  useEffect(() => {
    if (messageBox) {
      const t = setTimeout(() => setMessageBox(false), 2500);
      return () => clearTimeout(t);
    }
  }, [messageBox]);

  useEffect(() => {
    if (errorBox) {
      const t = setTimeout(() => setErrorBox(false), 2500);
      return () => clearTimeout(t);
    }
  }, [errorBox]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!customer?.id) return;

    const result = UpdateCustomerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UpdateCustomerInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof UpdateCustomerInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutate(
      { id: customer.id, data: result.data },
      {
        onSuccess: () => {
          setEditMode(false);
          setMessageBox(true);
        },
        onError: () => {
          setEditMode(false);
          setErrorBox(true);
        }
      }
    );
  };

  const joinedOn = customer?.createdAt ? format(new Date(customer.createdAt), 'dd MMM yyyy') : 'N/A';
  const totalAmount = Math.round(Number(customer?.totalSpent || 0));
  const allItems = customer?.orders?.flatMap(order => order.items) || [];
  const totalItemsQuantity = allItems.reduce((sum, item) => sum + item.quantity, 0);
  const statusKey = customer?.status?.toLowerCase() || '';

  return (
    <div>
      <AnimatePresence>
        {warnBox && (
          <WarningBox closeDrawer={onClose} isOpen={warnBox} customerId={customer?.id} close={() => setWarnBox(false)} />
        )}
      </AnimatePresence>
      <div className="fixed bottom-5 right-5 space-y-3 z-[100] pointer-events-none">
        <AnimatePresence>
          {messageBox && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-3 items-center bg-neutral-950 border border-emerald-500/20 shadow-xl rounded-xl px-5 py-3.5 max-w-sm pointer-events-auto">
              <div className="h-6 w-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <HiCheck className="text-emerald-400" size={16} />
              </div>
              <p className="text-xs font-bold text-neutral-200">Customer updated successfully.</p>
            </motion.div>
          )}
          {errorBox && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-3 items-center bg-neutral-950 border border-rose-500/20 shadow-xl rounded-xl px-5 py-3.5 max-w-sm pointer-events-auto">
              <div className="h-6 w-6 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                <HiXMark className="text-rose-400" size={16} />
              </div>
              <p className="text-xs font-bold text-neutral-200">Failed to update customer. Try again.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 h-full bg-neutral-950 border-l border-neutral-900 px-6 py-6 z-50 w-full sm:w-[440px] flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-5">
                  <h2 className="text-base text-neutral-200 font-bold tracking-tight">Customer Details</h2>
                  <button
                    onClick={onClose}
                    aria-label="Close drawer"
                    className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 active:scale-95 transition-all cursor-pointer"
                  >
                    <HiXMark size={14} />
                  </button>
                </div>

                {isLoading ? (
                  <div className="space-y-6 animate-pulse mt-6">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-neutral-900 rounded-full shrink-0" />
                      <div className="space-y-2 w-full">
                        <div className="h-4 bg-neutral-900 w-1/2 rounded" />
                        <div className="h-3 bg-neutral-900 w-1/3 rounded" />
                      </div>
                    </div>
                    <div className="h-[74px] bg-neutral-900/40 border border-neutral-900 rounded-2xl" />
                    <div className="h-8 bg-neutral-900 rounded-xl" />
                  </div>
                ) : (
                  <div className="space-y-6 select-none">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <HiUserCircle size={46} className="text-neutral-600 shrink-0" />
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-neutral-200 truncate max-w-[180px]" title={customer?.name}>
                              {customer?.name || "Anonymous"}
                            </h3>
                            <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider rounded-full ${STATUS_COLORS[statusKey] || 'bg-neutral-900 text-neutral-500 border-neutral-800'
                              }`}>
                              {customer?.status || "Unknown"}
                            </span>
                          </div>
                          <p className="text-xs flex items-center gap-1.5 font-medium text-neutral-500 truncate">
                            <HiMapPin size={13} className="shrink-0" />
                            <span className="truncate">{customer?.address || "No address found."}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setWarnBox(true)}
                        aria-label="Delete customer"
                        className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-xl transition-all cursor-pointer"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 bg-neutral-900/20 border border-neutral-900 rounded-2xl p-4 divide-x divide-neutral-900">
                      <div className="pr-2 space-y-0.5">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Spent</span>
                        <p className="text-xl font-black text-neutral-100 tabular-nums">
                          {currencyFormatter.format(totalAmount)}
                        </p>
                      </div>
                      <div className="pl-4 space-y-0.5">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Orders</span>
                        <p className="text-xl font-black text-neutral-100 tabular-nums">
                          {customer?.orderCount || 0}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex font-bold text-xs border-b border-neutral-900 p-0.5 relative">
                        {(['Information', 'Orders'] as const).map((tab) => {
                          const isActive = activeTab === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => { if (!editMode) setActiveTab(tab); }}
                              className={`flex-1 text-center pb-2.5 relative transition-colors duration-200 uppercase tracking-wider text-[10px] ${editMode ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                } ${isActive ? 'text-indigo-400 font-black' : 'text-neutral-500 hover:text-neutral-300'}`}
                            >
                              {tab}
                              {isActive && (
                                <motion.div
                                  layoutId="activeTabPill"
                                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {activeTab === 'Information' ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Customer Information</span>
                          {!editMode && (
                            <button
                              onClick={() => setEditMode(true)}
                              className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                            >
                              <HiPencilSquare size={14} />
                              <span>Edit Profile</span>
                            </button>
                          )}
                        </div>
                        <div className="relative space-y-4 bg-neutral-900/10 border border-neutral-900 rounded-2xl p-4">
                          {/* Name Field */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                              <HiUserCircle size={12} /> Name
                            </label>
                            {editMode ? (
                              <div className="space-y-1">
                                <input
                                  name="name"
                                  type="text"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500/60 transition-colors"
                                />
                                {errors.name && (
                                  <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5 animate-fade-in">
                                    <HiExclamationCircle size={12} /> {errors.name}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <p className="text-xs font-semibold text-neutral-300 bg-neutral-950/40 border border-neutral-900 px-3 py-2 rounded-xl">{customer?.name || 'N/A'}</p>
                            )}
                          </div>
                          {/* Email Field */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                              <HiEnvelope size={12} /> Email
                            </label>
                            {editMode ? (
                              <div className="space-y-1">
                                <input
                                  name="email"
                                  type="text"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500/60 transition-colors"
                                />
                                {errors.email && (
                                  <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5 animate-fade-in">
                                    <HiExclamationCircle size={12} /> {errors.email}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <p className="text-xs font-mono font-semibold text-neutral-300 bg-neutral-950/40 border border-neutral-900 px-3 py-2 rounded-xl select-all">{customer?.email || 'N/A'}</p>
                            )}
                          </div>
                          {/* Phone Field */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                              <HiPhone size={12} /> Phone Number
                            </label>
                            {editMode ? (
                              <div className="space-y-1">
                                <input
                                  name="phone"
                                  type="text"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500/60 transition-colors"
                                />
                                {errors.phone && (
                                  <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5 animate-fade-in">
                                    <HiExclamationCircle size={12} /> {errors.phone}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <p className="text-xs font-mono font-semibold text-neutral-300 bg-neutral-950/40 border border-neutral-900 px-3 py-2 rounded-xl">{customer?.phone || 'N/A'}</p>
                            )}
                          </div>
                          {!editMode && (
                            <div className="flex flex-col gap-1.5 pt-1.5 border-t border-neutral-900/60">
                              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                                <HiCalendarDays size={12} /> Joined On
                              </label>
                              <p className="text-xs font-semibold text-neutral-400 px-1">{joinedOn}</p>
                            </div>
                          )}
                          {isPending && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/70 rounded-2xl backdrop-blur-xs">
                              <div className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                            </div>
                          )}
                        </div>
                        {editMode && (
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={handleSave}
                              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl cursor-pointer transition-all active:scale-[0.99]"
                            >
                              <HiCheck size={14} className="stroke-2" />
                              <span>Save Changes</span>
                            </button>
                            <button
                              onClick={() => {
                                setEditMode(false);
                                setErrors({});
                                setFormData({
                                  name: customer?.name || '',
                                  email: customer?.email || '',
                                  phone: customer?.phone || '',
                                });
                              }}
                              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-neutral-400 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-xl cursor-pointer transition-all active:scale-[0.99]"
                            >
                              <HiXMark size={14} className="stroke-2" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Items</p>
                            <p className="text-base font-black text-neutral-300 mt-0.5 tabular-nums">{totalItemsQuantity} units</p>
                          </div>
                          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Spent</p>
                            <p className="text-base font-black text-indigo-400 mt-0.5 tabular-nums">{currencyFormatter.format(totalAmount)}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Order Breakdown</h4>
                          {allItems.length === 0 ? (
                            <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-neutral-900 rounded-2xl">
                              <HiShoppingBag size={20} className="text-neutral-700 mb-1.5" />
                              <p className="text-xs font-bold text-neutral-500">No orders found</p>
                            </div>
                          ) : (
                            <div className="divide-y divide-neutral-900 border border-neutral-900 bg-neutral-950 rounded-2xl overflow-hidden max-h-65 overflow-y-auto no-scrollbar shadow-inner">
                              {allItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 text-xs hover:bg-neutral-900/20 transition-colors group">
                                  <div className="min-w-0 pr-2">
                                    <p className="text-neutral-300 font-semibold truncate group-hover:text-neutral-200 transition-colors">
                                      {item.product?.name || "Unknown Product"}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-4 shrink-0 text-right">
                                    <span className="text-neutral-500 text-[11px] font-mono font-bold">x{item.quantity}</span>
                                    <span className="text-indigo-400 font-bold w-16 tabular-nums">
                                      {currencyFormatter.format(item.price)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!editMode && !isLoading && (
                <div className="border-t border-neutral-900 pt-4 mt-6">
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-xl text-xs font-bold tracking-wide uppercase transition-colors duration-150 active:scale-[0.99] cursor-pointer"
                  >
                    Close Panel
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDrawer;