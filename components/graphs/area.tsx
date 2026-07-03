"use client";

import React, { useState } from "react";
import useAnalytics from "@/hooks/useAnalytics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900/95 backdrop-blur-md px-4 py-2.5 border border-neutral-800 rounded-xl shadow-2xl">
        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-neutral-100 text-base font-black tabular-nums">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const [range, setRange] = useState("1w");
  const { data, isLoading } = useAnalytics(range);

  const rangeOptions = [
    { label: "1W", value: "1w" },
    { label: "1M", value: "30d" },
    { label: "1Y", value: "1y" },
  ];

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-neutral-200 font-bold text-base tracking-tight">
            Revenue Analytics
          </h3>
          <p className="text-neutral-500 text-xs mt-0.5 hidden sm:block">
            Performance metrics for the selected window period
          </p>
        </div>

        <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-900 p-1 rounded-xl shadow-inner">
          {rangeOptions.map((option) => {
            const isActive = range === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setRange(option.value)}
                className={`text-[10px] uppercase tracking-wider px-3 py-1.5 font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-neutral-100 text-neutral-950 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/60"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FIXED CONTAINER HEIGHT */}
      <div className="w-full h-[300px] sm:h-[340px] relative mt-2">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-neutral-600">
            <div className="h-6 w-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] text-neutral-500 font-medium tracking-wide animate-pulse">Syncing dataset…</span>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-neutral-900 rounded-xl">
            <span className="text-xs font-medium text-neutral-500">No revenue logs discovered for this frame</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 5, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e5e5e5" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#e5e5e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4" vertical={false} stroke="#171717" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 10, fontWeight: 600, fontFamily: 'monospace' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 10, fontWeight: 600, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#404040', strokeWidth: 1.5, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#d4d4d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTotal)"
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesChart;