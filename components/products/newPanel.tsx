"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Check, AlertCircle } from 'lucide-react';
import { newProductSchema, type NewProductInput } from '@/validaton';
import useCreateProduct from '@/hooks/useCreateProduct';

interface NewPanelProps {
  open: boolean;
  onClose: () => void;
}

const NewPanel = ({ open, onClose }: NewPanelProps) => {
  const [messageBox, setMessageBox] = useState<boolean>(false);
  const [errorBox, setErrorBox] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof NewProductInput, string>>>({});
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const { mutate, isPending } = useCreateProduct();

  // Escape key and body lock handling matching Reference Component standard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof NewProductInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedData = {
      name: formData.name,
      price: formData.price === '' ? undefined : Number(formData.price),
      stock: formData.stock === '' ? undefined : Number(formData.stock),
    };

    const result = newProductSchema.safeParse(parsedData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutate(result.data, {
      onSuccess: () => {
        setFormData({ name: '', price: '', stock: '' });
        setMessageBox(true);
        onClose();
      },
      onError: () => {
        setErrorBox(true);
      }
    });
  };

  useEffect(() => {
    if (messageBox) {
      const timer = setTimeout(() => setMessageBox(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messageBox]);

  useEffect(() => {
    if (errorBox) {
      const timer = setTimeout(() => setErrorBox(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorBox]);

  return (
    <>
      {/* Toast Alert System Notifications */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {messageBox && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className='flex gap-3 items-center bg-neutral-950 border border-emerald-500/20 shadow-2xl rounded-xl px-5 py-3.5'
            >
              <Check size={16} className='text-emerald-400' />
              <p className='text-neutral-300 font-semibold text-xs tracking-wide'>
                Product Created Successfully!
              </p>
            </motion.div>
          )}

          {errorBox && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className='flex gap-3 items-center bg-neutral-950 border border-rose-500/20 shadow-2xl rounded-xl px-5 py-3.5'
            >
              <AlertCircle size={16} className='text-rose-400' />
              <p className='text-neutral-300 font-semibold text-xs tracking-wide'>
                Something Went Wrong. Please Try Again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Layer overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity cursor-pointer' 
            />

            {/* Premium Obsidian Drawer Panel Sheet */}
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 h-full bg-neutral-950 border-l border-neutral-900 px-6 py-6 z-50 w-full sm:w-[440px] flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl"
            >
              <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between'>
                <div>
                  {/* Header Title Section */}
                  <div className='flex items-center justify-between border-b border-neutral-900 pb-4 mb-6'>
                    <div className='flex items-center gap-2'>
                      <Plus size={16} className='text-neutral-500' />
                      <h2 className='text-neutral-200 font-bold text-base tracking-tight'>
                        New Product
                      </h2>
                    </div>
                    <button 
                      type="button"
                      onClick={onClose} 
                      className='p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 active:scale-95 transition-all cursor-pointer'
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Form Controlled Elements Grid */}
                  <div className='space-y-5'>
                    <div className='space-y-1.5'>
                      <span className='text-[10px] font-bold text-neutral-500 uppercase tracking-wider block'>Product Name</span>
                      <input 
                        placeholder='Enter product name' 
                        type='text' 
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange}
                        disabled={isPending}
                        className={`w-full bg-neutral-900 text-neutral-300 border px-3 py-2.5 rounded-xl text-xs font-medium placeholder-neutral-600 focus:outline-none transition-all ${
                          errors.name ? 'border-rose-500/30 focus:border-rose-500/60' : 'border-neutral-800/80 focus:border-neutral-700'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-rose-400 font-semibold tracking-wide mt-0.5">{errors.name}</p>}
                    </div>

                    <div className='space-y-1.5'>
                      <span className='text-[10px] font-bold text-neutral-500 uppercase tracking-wider block'>Price</span>
                      <input 
                        placeholder='0.00' 
                        type='text' 
                        name='price' 
                        value={formData.price} 
                        onChange={handleChange}
                        disabled={isPending}
                        className={`w-full bg-neutral-900 text-neutral-300 border px-3 py-2.5 rounded-xl text-xs font-medium placeholder-neutral-600 focus:outline-none transition-all ${
                          errors.price ? 'border-rose-500/30 focus:border-rose-500/60' : 'border-neutral-800/80 focus:border-neutral-700'
                        }`}
                      />
                      {errors.price && <p className="text-[10px] text-rose-400 font-semibold tracking-wide mt-0.5">{errors.price}</p>}
                    </div>

                    <div className='space-y-1.5'>
                      <span className='text-[10px] font-bold text-neutral-500 uppercase tracking-wider block'>Stock Count</span>
                      <input 
                        placeholder='0' 
                        type='number' 
                        min={0} 
                        max={999} 
                        name='stock' 
                        value={formData.stock} 
                        onChange={handleChange}
                        disabled={isPending}
                        className={`w-full bg-neutral-900 text-neutral-300 border px-3 py-2.5 rounded-xl text-xs font-medium placeholder-neutral-600 focus:outline-none transition-all no-scrollbar ${
                          errors.stock ? 'border-rose-500/30 focus:border-rose-500/60' : 'border-neutral-800/80 focus:border-neutral-700'
                        }`}
                      />
                      {errors.stock && <p className="text-[10px] text-rose-400 font-semibold tracking-wide mt-0.5">{errors.stock}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Action Interface Button */}
                <div className='border-t border-neutral-900 pt-4 mt-6 flex gap-3 relative'>
                  <button 
                    type='submit'
                    disabled={isPending}
                    className='flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 disabled:bg-neutral-900 text-neutral-950 disabled:text-neutral-600 rounded-xl text-xs font-bold tracking-wide uppercase transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center min-h-[38px]'
                  >
                    {isPending ? (
                      <div className='w-4 h-4 rounded-full border-2 border-neutral-600 border-t-transparent animate-spin' />
                    ) : (
                      <span>Create Product</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewPanel;