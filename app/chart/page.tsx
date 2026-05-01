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

/* const data = [
  { name: 'Jan', sales: 4000, money: 2400 },
  { name: 'Feb', sales: 3000, money: 1398 },
  { name: 'Mar', sales: 2000, money: 9800 },
  { name: 'Apr', sales: 2780, money: 3908 },
  { name: 'May', sales: 1890, money: 4800 },
  { name: 'Jun', sales: 2390, money: 3800 },
  { name: 'Jul', sales: 3490, money: 4300 },
]; */

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md p-4 border border-slate-200 rounded-xl shadow-lg">
        <p className="text-slate-900 font-bold mb-1">{label}</p>
        <p className="text-indigo-600 text-sm">Sales: {payload[0].value.toLocaleString()}</p>
        <p className="text-emerald-600 text-sm">Money: ${payload[1].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const [range, setRange] = useState('7d')
  const { data, isLoading, error } = useAnalytics(range)
  return (
    <div className="w-full h-96 bg-slate-50 p-6 rounded-3xl shadow-sm">
      <h3 className="text-slate-800 font-semibold mb-6 text-lg">Performance Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMoney" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
          />
          <Area
            type="monotone"
            dataKey="money"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMoney)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;