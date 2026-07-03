"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiCheck, 
  HiXMark, 
  HiUser, 
  HiEnvelope, 
  HiPhone, 
  HiMapPin, 
  HiShieldCheck, 
  HiChevronDown,
  HiExclamationCircle
} from 'react-icons/hi2';

import useNewCustomer from '@/hooks/useNewCustomer';
import { NewCustomerInput, newCustomerSchema } from '@/validaton';

interface CustomerPanelProps {
  isOpen: boolean | undefined;
  closed: () => void;
}

const STATUS_OPTIONS = ['active', 'inactive', 'lead', 'pending'] as const;

const fieldLabelClass = 'text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5';
const inputClass = 'w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs rounded-xl pl-9 pr-4 py-2.5 font-medium placeholder:text-neutral-600 outline-none transition-colors focus:border-indigo-500/60 focus:ring-0';

const CustomerPanel = ({ isOpen, closed }: CustomerPanelProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof NewCustomerInput, string>>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: '',
    phone: '',
    address: '',
    status: ''
  });
  
  const [messageBox, setMessageBox] = useState<boolean>(false);
  const [errorBox, setErrorBox] = useState<boolean>(false);
  const { mutate, isPending } = useNewCustomer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closed();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closed]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: '', phone: '', address: '', status: '' });
    setErrors({});
  };

  const handleSave = () => {
    const result = newCustomerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewCustomerInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof NewCustomerInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    mutate(
      result.data,
      {
        onSuccess: () => {
          setMessageBox(true);
          resetForm();
          closed();
        },
        onError: () => {
          setErrorBox(true);
        }
      }
    );
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 space-y-3 z-[100] pointer-events-none">
        <AnimatePresence>
          {messageBox && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-3 items-center bg-neutral-950 border border-emerald-500/20 shadow-xl rounded-xl px-5 py-3.5 max-w-sm pointer-events-auto">
              <div className="h-6 w-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <HiCheck className="text-emerald-400" size={16} />
              </div>
              <p className="text-xs font-bold text-neutral-200">Customer created successfully.</p>
            </motion.div>
          )}
          {errorBox && (
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-3 items-center bg-neutral-950 border border-rose-500/20 shadow-xl rounded-xl px-5 py-3.5 max-w-sm pointer-events-auto">
              <div className="h-6 w-6 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                <HiXMark className="text-rose-400" size={16} />
              </div>
              <p className="text-xs font-bold text-neutral-200">Failed to create customer. Try again.</p>
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
              onClick={closed}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 h-full bg-neutral-950 border-l border-neutral-900 px-6 py-6 z-50 w-full sm:w-[440px] flex flex-col justify-between shadow-2xl overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-4">
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                  <h2 className="text-base text-neutral-200 font-bold tracking-tight">
                    Add Customer
                  </h2>
                  <button
                    onClick={closed}
                    aria-label="Close panel"
                    className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 active:scale-95 transition-all cursor-pointer"
                  >
                    <HiXMark size={14} />
                  </button>
                </div>
                <fieldset disabled={isPending} className="space-y-4 disabled:opacity-50 transition-opacity select-none">
                  <div className="flex flex-col gap-1.5">
                    <label className={fieldLabelClass}>
                      <HiUser size={12} /> Name
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                      <input 
                        name="name" 
                        type="text"
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter full name" 
                        className={inputClass} 
                      />
                    </div>
                    {errors.name && (
                      <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5">
                        <HiExclamationCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={fieldLabelClass}>
                      <HiEnvelope size={12} /> Email
                    </label>
                    <div className="relative">
                      <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                      <input 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Enter email address" 
                        className={inputClass} 
                      />
                    </div>
                    {errors.email && (
                      <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5">
                        <HiExclamationCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={fieldLabelClass}>
                      <HiPhone size={12} /> Phone Number
                    </label>
                    <div className="relative">
                      <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                      <input 
                        name="phone" 
                        type="text"
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="Enter phone number" 
                        className={inputClass} 
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5">
                        <HiExclamationCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={fieldLabelClass}>
                      <HiMapPin size={12} /> Address
                    </label>
                    <div className="relative">
                      <HiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                      <input 
                        name="address" 
                        type="text"
                        value={formData.address} 
                        onChange={handleChange} 
                        placeholder="Enter physical address" 
                        className={inputClass} 
                      />
                    </div>
                    {errors.address && (
                      <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5">
                        <HiExclamationCircle size={12} /> {errors.address}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={fieldLabelClass}>
                      <HiChevronDown size={12} /> Status
                    </label>
                    <div className="relative">
                      <HiChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer appearance-none pr-10`}
                      >
                        <option value="" disabled className="bg-neutral-950 text-neutral-600">Select status</option>
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-neutral-950 text-neutral-300 py-2">
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        <HiChevronDown size={14} />
                      </div>
                    </div>
                    {errors.status && (
                      <span className="text-rose-400 text-[10px] font-medium flex items-center gap-1 pt-0.5">
                        <HiExclamationCircle size={12} /> {errors.status}
                      </span>
                    )}
                  </div>

                </fieldset>
              </div>

              <div className="border-t border-neutral-900 pt-4 mt-2">
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/40 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
                >
                  {isPending ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Customer</span>
                  )}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerPanel;