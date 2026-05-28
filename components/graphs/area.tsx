"use client";
import useAnalytics from '@/hooks/useAnalytics';
import React, { useState } from 'react';
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
      // Using neutral-900 with a glassmorphism blur
      <div className="bg-neutral-900/80 backdrop-blur-md p-4 border border-neutral-800 rounded-xl shadow-2xl">
        <p className="text-neutral-400 text-xs font-medium mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-indigo-400 text-lg font-bold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const [range, setRange] = useState('7d');
  const { data, isLoading } = useAnalytics(range);

  const rangeOptions = [
    { label: "1W", value: "1w" },
    { label: "1M", value: "30d" },
    { label: "1Y", value: "1y" },
  ];
  return (
    <div className="w-full h-full px-4 pb-10 pt-8 bg-neutral-950/40 border border-neutral-800 rounded-3xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-neutral-200 font-bold text-xl tracking-tight">Revenue Analytics</h3>
          <p className="text-neutral-500 text-sm">Performance metrics for the selected period</p>
        </div>
        
        {/* <select 
          value={range} 
          onChange={(e) => setRange(e.target.value)}
          className="bg-neutral-950 border border-neutral-700 text-neutral-300 text-sm rounded-xl px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          <option value="7d">7d</option>
          <option value="30d">30d</option>
          <option value="1y">1y</option>
        </select>*/}
        <div className='flex'>
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRange(option.value)}
              className={`text-xs px-3 py-1 cursor-pointer font-bold rounded-lg transition-all ${
                range === option.value
                  ? "bg-indigo-500 text-neutral-200"
                  : "bg-neutral-950 text-neutral-200"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div> 
      

      <div className="h-full pb-12">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 animate-pulse">
            <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
              
               <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 10 }}
                dy={10}
                hide={false}
              /> 
              
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 12 }}
                tickFormatter={(val) => `$${val / 1000}k`}
              
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#4f46e5', strokeWidth: 2, strokeDasharray: '4 4' }} 
              />
              
              <Area
                type="monotone"
                dataKey="total"
                stroke="#818cf8" // Lighter indigo for better contrast on dark
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorTotal)"
                animationDuration={1500}
                // Adding a subtle "glow" to the line
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesChart;