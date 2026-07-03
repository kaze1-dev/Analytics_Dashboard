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

type TimeFrame = "1w" | "1m" | "1y";

const options: { label: string; value: TimeFrame }[] = [
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

   const revenue = useMemo(
      () => (data?.totalRevenue != null ? currencyFormatter.format(Math.round(data.totalRevenue)) : undefined),
      [data?.totalRevenue]
   );
   const orders = data?.totalOrders?.toLocaleString();
   const customers = data?.totalCustomers?.toLocaleString();
   const products = data?.productsSold?.toLocaleString();

   return (
      <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 px-4 sm:px-8 md:pl-64 md:pr-8 pb-12 transition-all duration-200 cursor-default">
         
         {/* Top Heading Viewport Context Panel */}
         <div className="flex flex-row justify-between items-center pt-8 pb-6 border-b border-neutral-900 gap-4">
            <div className="ml-12 sm:ml-0">
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100">
                  Home
               </h1>
            </div>
            <div 
               className="bg-neutral-900 border border-neutral-800/80 p-1 rounded-xl flex items-center gap-0.5 shadow-inner" 
               role="group" 
               aria-label="Select time frame"
            >
               {options.map((option) => (
                  <button
                     key={option.value}
                     onClick={() => setFrame(option.value)}
                     aria-pressed={frame === option.value}
                     className={`text-xs px-3 py-1.5 font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                        frame === option.value
                           ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                           : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
                     }`}
                  >
                     {option.label}
                  </button>
               ))}
            </div>
         </div>
         {error && (
            <div className="mt-6 rounded-xl border border-rose-900/50 bg-rose-950/20 px-4 py-3.5 text-sm text-rose-400 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 animate-pulse" />
               <p>Failed to load diagnostic metric updates. Please refresh your workspace panel.</p>
            </div>
         )}
         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            <RevenueStat value={revenue} loading={isLoading} />
            <OrderStat value={orders} loading={isLoading} />
            <CustomerStat value={customers} loading={isLoading} />
            <ProductStat value={products} loading={isLoading} />
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full items-start">
            <div className="w-full bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl shadow-sm">
               <SalesChart />
            </div>
            <div className="w-full bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl shadow-sm">
               <Donut />
            </div>
         </div>
         <div className="mt-6 border border-neutral-900 bg-neutral-900/10 rounded-2xl shadow-sm overflow-hidden">
            <OrdersTable />
         </div>
      </div>
   );
}