"use client";

import React, { useState } from 'react';
import useAnalytics from '@/hooks/useAnalytics';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900/95 backdrop-blur-md px-4 py-3 border border-neutral-800 rounded-xl shadow-2xl">
        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-indigo-400 text-base font-bold tabular-nums">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  // Fixed initial value state alignment mismatch ('7d' changed to '1w')
  const [range, setRange] = useState('1w');
  const { data, isLoading } = useAnalytics(range);

  const rangeOptions = [
    { label: "1W", value: "1w" },
    { label: "1M", value: "30d" },
    { label: "1Y", value: "1y" },
  ];

  return (
    <div className="w-full flex flex-col justify-between">
      {/* Chart Header Controls */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-neutral-200 font-bold text-lg tracking-tight">
            Revenue Analytics
          </h3>
          <p className="text-neutral-500 text-xs mt-0.5 hidden sm:block">
            Performance metrics for the selected window period
          </p>
        </div>

        <div className="flex items-center gap-0.5 bg-neutral-950 border border-neutral-800/60 rounded-xl p-1 shadow-inner">
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRange(option.value)}
              className={`text-xs px-3 py-1.5 cursor-pointer font-semibold rounded-lg transition-all duration-150 ${
                range === option.value
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Rendering Viewport Node */}
      <div className="w-full h-[300px] sm:h-[340px] relative mt-2">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-600">
            <div className="h-7 w-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-neutral-500 animate-pulse">Syncing dataset…</span>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-neutral-800 rounded-xl">
            <span className="text-sm text-neutral-600">No revenue logs discovered for this frame</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f1f1f" />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#525252', fontSize: 11, fontWeight: 500 }}
                dy={12}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#525252', fontSize: 11, fontWeight: 500 }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#4f46e5', strokeWidth: 1.5, strokeDasharray: '4 4' }}
              />

              <Area
                type="monotone"
                dataKey="total"
                stroke="#818cf8"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorTotal)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesChart;