"use client";

import { useMemo, useState } from "react";
import Donut from "../../../components/graphs/donut";
import OrdersTable from "../../../components/home/recentOrders";
import SalesChart from "@/components/graphs/area";
import useStats from "@/hooks/useStats";
import RevenueStat from "@/components/stats/revenueStat";
import OrderStat from "@/components/stats/orderStat";
import CustomerStat from "@/components/stats/customerStat";
import ProductStat from "@/components/stats/productStat";
import { AlertCircle } from "lucide-react";

type TimeFrame = "1w" | "1m" | "1y";

interface TimeFrameOption {
  label: string;
  value: TimeFrame;
}

const options: TimeFrameOption[] = [
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "1Y", value: "1y" },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export default function Home() {
  const [frame, setFrame] = useState<TimeFrame>("1w");
  const { data, isLoading, error } = useStats(frame);

  // Memoized formatters to prevent processing overhead across state shifts
  const revenue = useMemo(
    () => (data?.totalRevenue != null ? currencyFormatter.format(Math.round(data.totalRevenue)) : undefined),
    [data?.totalRevenue]
  );

  const orders = useMemo(
    () => data?.totalOrders?.toLocaleString() ?? "0",
    [data?.totalOrders]
  );

  const customers = useMemo(
    () => data?.totalCustomers?.toLocaleString() ?? "0",
    [data?.totalCustomers]
  );

  const products = useMemo(
    () => data?.productsSold?.toLocaleString() ?? "0",
    [data?.productsSold]
  );

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 px-4 sm:px-8 md:pl-64 md:pr-8 pb-12 transition-all duration-200 cursor-default">
      
      {/* Top Heading Viewport Context Panel */}
      <div className="flex flex-row justify-between items-center pt-8 pb-6 border-b border-neutral-900 gap-4">
        <div className="ml-12 sm:ml-0">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-100">
            Home
          </h1>
        </div>
        
        {/* Unified Obsidian Multi-Switch Toggle Bar */}
        <div 
          className="bg-neutral-900/60 border border-neutral-900 p-1 rounded-xl flex items-center gap-1 shadow-inner backdrop-blur-xs" 
          role="group" 
          aria-label="Select time frame"
        >
          {options.map((option) => {
            const isActive = frame === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setFrame(option.value)}
                aria-pressed={isActive}
                className={`text-[10px] uppercase tracking-wider px-3.5 py-1.5 font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-neutral-100 text-neutral-950 shadow-sm"
                    : "text-neutral-500 hover:bg-neutral-800/40 hover:text-neutral-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Synchronized Workspace System Error Notification */}
      {error && (
        <div className="mt-6 rounded-2xl border border-rose-500/20 bg-neutral-950 px-4 py-3.5 text-xs text-rose-400 font-semibold tracking-wide flex items-center gap-3 shadow-xl">
          <AlertCircle size={14} className="shrink-0 text-rose-400 animate-pulse" />
          <p>Failed to load diagnostic metric updates. Please refresh your workspace panel.</p>
        </div>
      )}

      {/* Grid Architecture Workspace Widgets */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <RevenueStat value={revenue} loading={isLoading} />
        <OrderStat value={orders} loading={isLoading} />
        <CustomerStat value={customers} loading={isLoading} />
        <ProductStat value={products} loading={isLoading} />
      </div>

      {/* Visual Analytics Chart Partition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full items-start">
        <div className="w-full bg-neutral-900/10 border border-neutral-900 p-5 rounded-2xl shadow-xl">
          <SalesChart />
        </div>
        <div className="w-full bg-neutral-900/10 border border-neutral-900 p-5 rounded-2xl shadow-xl">
          <Donut />
        </div>
      </div>

      {/* Core Ledger Segment Table Display */}
      <div className="mt-6 border border-neutral-900 bg-neutral-900/10 rounded-2xl shadow-xl overflow-hidden">
        <OrdersTable />
      </div>
      
    </div>
  );
}