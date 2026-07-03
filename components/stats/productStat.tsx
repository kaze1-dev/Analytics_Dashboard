"use client";

import React from 'react';
import { Box } from 'lucide-react';

interface StatCardProps {
  value: string | undefined;
  loading: boolean;
}

const ProductStat = ({ value, loading }: StatCardProps) => {
  if (loading) {
    return <div className="w-full h-[102px] bg-neutral-900/40 border border-neutral-900/80 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="w-full bg-neutral-900/10 border border-neutral-900 rounded-2xl p-4 flex items-center justify-between hover:border-neutral-800/80 transition-all duration-200 group select-none">
      <div className="space-y-1.5 min-w-0">
        <h4 className="text-neutral-500 text-xs font-bold uppercase tracking-wider">
          Products Sold
        </h4>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-100 tabular-nums truncate">
          {value ?? "0"}
        </h1>
      </div>

      <div className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-neutral-900/60 border border-neutral-800/60 group-hover:border-indigo-500/30 transition-colors duration-200 shadow-inner">
        <Box size={18} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
      </div>
    </div>
  );
};

export default ProductStat;