"use client";

import React, { useState, useMemo } from "react";
import useOrderInfo from "@/hooks/useOrderInfo";
import { RefreshCw, AlertCircle } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";

const COLORS: Record<string, string> = {
  delivered: "#10b981",
  shipped: "#3b82f6",
  pending: "#f59e0b",
  cancelled: "#f43f5e",
};

const CustomDonutTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-neutral-900/95 backdrop-blur-md px-3 py-2 border border-neutral-800 rounded-xl shadow-2xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full shadow-xs" style={{ backgroundColor: data.fill }} />
        <span className="text-neutral-400 text-xs font-medium">{data.name}:</span>
        <span className="text-neutral-100 text-xs font-bold tabular-nums">{data.value}</span>
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
  
  const [frame, setFrame] = useState("1w");
  const { data: rawData, isLoading, error, refetch } = useOrderInfo(frame);
  const [isRetrying, setIsRetrying] = useState(false);

  const formattedData = useMemo(() => {
    return rawData?.map((item: any) => ({
      name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      key: item.status,
      value: item._count?.status || item._count || 0,
      fill: COLORS[item.status] || "#525252",
    })) || [];
  }, [rawData]);

  const totalOrders = useMemo(() => {
    return formattedData.reduce((sum: number, item: any) => sum + item.value, 0);
  }, [formattedData]);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-neutral-200 text-base font-bold tracking-tight">
            Orders Information
          </h2>
          <p className="text-neutral-500 text-xs mt-0.5 hidden sm:block">
            Track real-time distribution profiles
          </p>
        </div>

        <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-900 p-1 rounded-xl shadow-inner">
          {frameOptions.map((option) => {
            const isActive = frame === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setFrame(option.value)}
                disabled={!!error}
                className={`text-[10px] uppercase tracking-wider px-3 py-1.5 font-bold rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
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
      <div className="relative w-full h-[300px] sm:h-[310px] flex items-center justify-center mt-2">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-neutral-600">
            <div className="h-6 w-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] text-neutral-500 font-medium tracking-wide animate-pulse">Syncing breakdown…</span>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-900 bg-neutral-950/40 rounded-xl px-4 py-6">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
              <AlertCircle size={14} className="animate-pulse" />
              <span>Failed to load breakdown metrics</span>
            </div>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              <RefreshCw className={`h-3 w-3 ${isRetrying ? "animate-spin" : ""}`} />
              {isRetrying ? "Retrying…" : "Retry"}
            </button>
          </div>
        ) : totalOrders === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-neutral-900 rounded-xl">
            <span className="text-xs font-medium text-neutral-500">No orders logged in this period</span>
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
                  innerRadius={74}
                  outerRadius={90}
                  paddingAngle={4}
                  stroke="#0a0a0a"
                  strokeWidth={3}
                  cornerRadius={4}
                  animationDuration={500}
                >
                  {formattedData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-neutral-100 text-3xl font-black tracking-tight tabular-nums leading-none">
                {totalOrders}
              </span>
              <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mt-1.5">
                Total Orders
              </span>
            </div>
          </>
        )}
      </div>

      {(!isLoading && !error && totalOrders > 0) && (
        <div className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap text-[11px] font-medium pt-3.5 mt-2 border-t border-neutral-900/60">
          {formattedData.map((item: any) => (
            <div key={item.key} className="flex gap-1.5 items-center">
              <span className="h-2 w-2 rounded-full shadow-xs shrink-0" style={{ backgroundColor: item.fill }} />
              <span className="text-neutral-400 font-medium">{item.name}</span>
              <span className="text-neutral-600 font-mono font-bold text-[10px]">({item.value})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Donut;