"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, X, AlertCircle } from 'lucide-react';
import useDeleteProduct from '@/hooks/useDeleteProduct';

interface InfoBoxProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  mainClose: () => void;
}

const InfoBox = ({ open, onClose, productId, mainClose }: InfoBoxProps) => {
  const [messageBox, setMessageBox] = useState<boolean>(false);
  const [errorBox, setErrorBox] = useState<boolean>(false);
  const { mutate, isPending } = useDeleteProduct();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isPending, onClose]);

  const handleDelete = () => {
    mutate(productId, {
      onSuccess: () => {
        onClose();
        mainClose();
        setMessageBox(true);
      },
      onError: () => {
        onClose();
        mainClose();
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
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
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
                Product Deleted Successfully!
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
                Deletion Failed. Please Try Again Later.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 z-[60] flex items-center justify-center px-4'>
            {/* Modal Overlay Layer backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={!isPending ? onClose : undefined} 
              className='fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer' 
            />

            {/* Obsidian Core Alert Dialogue Frame Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className='relative bg-neutral-950 border border-neutral-900 p-5 rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden'
            >
              {/* Alert Warning Grid Body Content */}
              <div className='flex items-start gap-4'>
                <div className='p-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 shrink-0'>
                  <AlertTriangle size={18} />
                </div>
                <div className='space-y-1.5 min-w-0'>
                  <h3 className='text-neutral-200 font-bold text-sm tracking-tight'>
                    Confirm Product Deletion
                  </h3>
                  <p className='text-neutral-400 text-xs leading-relaxed font-medium'>
                    This action is permanent and completely irreversible. Are you absolutely certain you want to remove this item from the product record database?
                  </p>
                </div>
              </div>

              {/* Functional Interactive Trigger Actions Row */}
              <div className='flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-900 relative'>
                <button 
                  type='button'
                  onClick={onClose} 
                  disabled={isPending}
                  className='px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50'
                >
                  Cancel
                </button>
                <button 
                  type='button'
                  onClick={handleDelete}
                  disabled={isPending}
                  className='min-w-[76px] flex items-center justify-center px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer min-h-[32px]'
                >
                  {isPending ? (
                    <div className='w-3.5 h-3.5 rounded-full border-2 border-rose-400 border-t-transparent animate-spin' />
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfoBox;