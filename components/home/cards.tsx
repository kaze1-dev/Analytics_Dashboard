"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | undefined;
  loading: boolean;
  subtitle?: string;
}

export default function StatCard({ title, value, loading, subtitle }: StatCardProps) {
  return (
    <div className="w-full bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl shadow-xl flex flex-col justify-between min-h-[125px]">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          {title}
        </p>
        
        <div className="mt-2.5 min-h-[36px] flex items-center">
          {loading ? (
            <div className="w-24 h-7 bg-neutral-900/80 rounded-lg animate-pulse border border-neutral-800/50" />
          ) : (
            <h3 className="text-2xl font-black tracking-tight text-neutral-100 tabular-nums leading-none">
              {value ?? "0"}
            </h3>
          )}
        </div>
      </div>

      {subtitle && !loading && (
        <p className="text-[11px] text-neutral-500 font-medium mt-2 tracking-wide truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
}