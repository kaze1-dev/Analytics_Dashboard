"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, AlertCircle } from 'lucide-react';
import useDeleteCustomer from '@/hooks/useDeleteCustomer';

interface WarningBoxProps {
  isOpen: boolean;
  close: () => void;
  customerId: string | null | undefined;
  closeDrawer: () => void;
}

const WarningBox = ({ isOpen, close, customerId, closeDrawer }: WarningBoxProps) => {
  const { mutate, isPending } = useDeleteCustomer();
  const [messageBox, setMessageBox] = useState<boolean>(false);
  const [errorBox, setErrorBox] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) close();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPending, close]);

  const handleDelete = () => {
    if (!customerId) return;
    mutate(customerId, {
      onSuccess: () => {
        close();
        closeDrawer();
        setMessageBox(true);
      },
      onError: () => {
        close();
        closeDrawer();
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
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {messageBox && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-3 items-center bg-neutral-950 border border-emerald-500/20 shadow-2xl rounded-xl px-5 py-3.5"
            >
              <Check size={16} className="text-emerald-400" />
              <p className="text-neutral-300 font-semibold text-xs tracking-wide">
                Customer Deleted Successfully!
              </p>
            </motion.div>
          )}

          {errorBox && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-3 items-center bg-neutral-950 border border-rose-500/20 shadow-2xl rounded-xl px-5 py-3.5"
            >
              <AlertCircle size={16} className="text-rose-400" />
              <p className="text-neutral-300 font-semibold text-xs tracking-wide">
                Something went wrong. Please try again later.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={!isPending ? close : undefined} 
              className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer" 
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative bg-neutral-950 border border-neutral-900 p-5 rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 shrink-0">
                  <AlertTriangle size={18} />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-neutral-200 font-bold text-sm tracking-tight">
                    Confirm Customer Deletion
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium">
                    This action is permanent and completely irreversible. Are you absolutely certain you want to wipe this profile and all associated data from the active database?
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-900 relative">
                <button 
                  type="button"
                  onClick={close} 
                  disabled={isPending}
                  className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="min-w-[76px] flex items-center justify-center px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer min-h-[32px]"
                >
                  {isPending ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-400 border-t-transparent animate-spin" />
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

export default WarningBox;