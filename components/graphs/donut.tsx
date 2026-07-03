"use client";

import React, { useState } from 'react';
import useOrderInfo from "@/hooks/useOrderInfo";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";

const COLORS: Record<string, string> = {
  delivered: "#10b981", // emerald-500
  shipped: "#6366f1",   // indigo-500
  pending: "#f59e0b",   // amber-500
  cancelled: "#f43f5e", // rose-500
};

const CustomDonutTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-neutral-900/95 backdrop-blur-md px-3 py-2 border border-neutral-800 rounded-xl shadow-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.fill }} />
        <span className="text-neutral-300 text-xs font-semibold">{data.name}:</span>
        <span className="text-white text-xs font-bold tabular-nums">{data.value}</span>
      </div>
    );
  }
  return null;
};

const Donut = () => {
  const frameOptions = [
    { label: "1W", value: "1w" },
    { label: "1M", value: "1m" },
    { label: "1Y", value: "1y" },
  ];
  const [frame, setFrame] = useState('1w');
  const { data: rawData, isLoading, error } = useOrderInfo(frame);

  const formattedData = rawData?.map((item: any) => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    key: item.status,
    value: item._count.status || item._count,
    fill: COLORS[item.status] || "#525252",
  })) || [];

  const totalOrders = formattedData.reduce((sum: number, item: any) => sum + item.value, 0);

  return (
    <div className="w-full flex flex-col justify-between">
      {/* Chart Header Controls */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-neutral-200 text-lg font-bold tracking-tight">
            Orders Information
          </h2>
          <p className="text-neutral-500 text-xs mt-0.5 hidden sm:block">
            Track real-time distribution profiles
          </p>
        </div>

        <div className="flex items-center gap-0.5 bg-neutral-950 border border-neutral-800/60 rounded-xl p-1 shadow-inner">
          {frameOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFrame(option.value)}
              className={`text-xs px-3 py-1.5 cursor-pointer font-semibold rounded-lg transition-all duration-150 ${
                frame === option.value
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Graphic Area */}
      <div className="relative w-full h-[260px] sm:h-[280px] flex items-center justify-center mt-2">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-600">
            <div className="h-7 w-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-neutral-500 animate-pulse">Syncing breakdown…</span>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-neutral-800 rounded-xl">
            <span className="text-sm text-rose-400/80">Failed to load payload metrics</span>
          </div>
        ) : totalOrders === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-neutral-800 rounded-xl">
            <span className="text-sm text-neutral-600">No orders logged in this period</span>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomDonutTooltip />} />
                <Pie
                  data={formattedData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={75}
                  outerRadius={92}
                  paddingAngle={4}
                  stroke="#0a0a0a"
                  strokeWidth={3}
                  cornerRadius={4}
                  animationDuration={800}
                >
                  {formattedData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Absolute Center Counter Matrix */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-neutral-200 text-3xl font-black tracking-tight tabular-nums">
                {totalOrders}
              </span>
              <span className="text-neutral-500 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
                Total Orders
              </span>
            </div>
          </>
        )}
      </div>

      {/* Fluid Dynamic Data Legend Row */}
      {(!isLoading && !error && totalOrders > 0) && (
        <div className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap text-[11px] font-medium pt-4 mt-2 border-t border-neutral-900/60">
          {formattedData.map((item: any) => (
            <div key={item.key} className="flex gap-2 items-center">
              <span
                className="h-2 w-2 rounded-full shadow-sm shrink-0 animate-fade-in"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-neutral-400">{item.name}</span>
              <span className="text-neutral-500 font-mono font-bold">({item.value})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Donut;