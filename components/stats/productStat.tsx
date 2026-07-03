"use client";

import React from "react";
import { Box } from "lucide-react";

interface StatCardProps {
  value: string | undefined;
  loading: boolean;
}

const ProductStat = ({ value, loading }: StatCardProps) => {
  if (loading) {
    return (
      <div className="w-full bg-neutral-900/10 border border-neutral-900 rounded-2xl p-4 flex items-center justify-between animate-pulse">
        <div className="space-y-2.5 min-w-0 flex-1 pr-4">
          <div className="h-3 bg-neutral-900 rounded-sm w-24" />
          <div className="h-7 bg-neutral-900 rounded-md w-24" />
        </div>
        <div className="h-11 w-11 rounded-xl bg-neutral-900/50 border border-neutral-900 shrink-0" />
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-900/10 border border-neutral-900 rounded-2xl p-4 flex items-center justify-between hover:border-neutral-800 transition-all duration-200 group select-none shadow-xs">
      <div className="space-y-1.5 min-w-0">
        <h4 className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
          Products Sold
        </h4>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-100 tabular-nums truncate leading-none">
          {value ?? "0"}
        </h1>
      </div>

      <div className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-neutral-950 border border-neutral-900 group-hover:border-neutral-700 text-neutral-400 group-hover:text-neutral-200 transition-all duration-200 shadow-inner">
        <Box size={18} className="transition-transform duration-200 group-hover:scale-105" />
      </div>
    </div>
  );
};

export default ProductStat;