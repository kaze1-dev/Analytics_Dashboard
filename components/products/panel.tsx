"use client";

import React, { useState } from 'react';
import { HiCube, HiOutlineTrash, HiXMark } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'framer-motion';
import InfoBox from './infoBox';

interface PanelProps {
  onClose: () => void;
  isOpen: boolean;
  product: any;
  loading: boolean;
}

const Panel = ({ onClose, isOpen, product, loading }: PanelProps) => {
  const [infoBox, setInfoBox] = useState(false);

  return (
    <>
      <InfoBox
        open={infoBox}
        onClose={() => setInfoBox(false)}
        productId={product?.id}
        mainClose={onClose}
      />
      
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
            />
            
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed right-4 top-4 bottom-4 w-full max-w-sm sm:w-96 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 z-50 flex flex-col justify-between shadow-2xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-800 mb-6">
                  <h2 className="text-base font-bold text-neutral-100">Product Details</h2>
                  <button 
                    onClick={onClose} 
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <HiXMark size={18} />
                  </button>
                </div>

                {loading ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center py-4 space-y-3">
                      <div className="w-16 h-16 bg-neutral-800 rounded-full animate-pulse" />
                      <div className="w-8 h-6 bg-neutral-800 rounded-md animate-pulse" />
                    </div>
                    <div className="h-20 bg-neutral-800/50 rounded-2xl animate-pulse w-full" />
                    <div className="space-y-4">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="h-3 bg-neutral-800 rounded w-1/4 animate-pulse" />
                          <div className="h-10 bg-neutral-800/60 rounded-xl animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col items-center mb-6">
                      <div className="bg-neutral-950 border border-neutral-800 rounded-full p-4 shadow-inner mb-3">
                        <HiCube size={40} className="text-indigo-500" />
                      </div>
                      <button 
                        onClick={() => setInfoBox(true)} 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                      >
                        <HiOutlineTrash size={14} />
                        <span>Delete Product</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 border border-neutral-900 bg-neutral-900/20 rounded-2xl py-3.5 mb-6 text-center divide-x divide-neutral-800">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Price</span>
                        <span className="font-bold text-neutral-200">{product?.price || '$0.00'}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Stock</span>
                        <span className="font-bold text-neutral-200">{product?.stock ?? 0} units</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Product ID</h4>
                        <p className="font-mono text-xs font-semibold bg-neutral-900/20 border border-neutral-900 rounded-xl px-4 py-3 text-neutral-300 break-all selection:bg-indigo-500/30">
                          {product?.id}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Product Name</h4>
                        <p className="font-semibold bg-neutral-900/20 border border-neutral-900 rounded-xl px-4 py-3 text-neutral-200 text-sm">
                          {product?.name}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Date Created</h4>
                        <p className="font-semibold bg-neutral-900/20 border border-neutral-900 rounded-xl px-4 py-3 text-neutral-300 text-sm">
                          {product?.createdAt ? new Date(product.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Panel;