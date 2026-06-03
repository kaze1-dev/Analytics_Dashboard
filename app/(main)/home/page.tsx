"use client"
import Donut from "../../../components/graphs/donut";
import OrdersTable from "../../../components/home/recentOrders";
import SalesChart from "@/components/graphs/area";
import { useState } from "react";
import useStats from "@/hooks/useStats";
import RevenueStat from "@/components/stats/revenueStat";
import OrderStat from "@/components/stats/orderStat";
import CustomerStat from "@/components/stats/customerStat";
import ProductStat from "@/components/stats/productStat";

const options = [
   { label: "1W", value: "1w" },
   { label: "1M", value: "1m" },
   { label: "1Y", value: "1y" },
];

export default function Home() {
   const [frame, setFrame] = useState("1w");
   const { data, isLoading, error } = useStats(frame)
   const revenue = Math.round(data?.totalRevenue).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
   })

   const orders = data?.totalOrders.toLocaleString()
   const customers = data?.totalCustomers.toLocaleString()
   const products = data?.productsSold.toLocaleString()
   return (
      <div className=''>
         {/* <div className="w-68 transition-all " /> */}
         <div className='cursor-default pb-10 pl-4 sm:pl-10 md:pl-55  lg:pl-55  w-full pr-4 sm:pr-10 md:pr-10'>
            <div className='my-4 flex justify-between items-center'>
               <h1 className='text-3xl ml-14 sm:ml-14 md:ml-0 lg:ml-0 xl:ml-0 py-4 font-bold text-neutral-200'>
                  Home
               </h1>
               <div>
                  {
                     options.map((option) => (
                        <button
                           key={option.value}
                           onClick={() => setFrame(option.value)}
                           className={`text-xs px-3 py-1 cursor-pointer font-semibold rounded-lg transition all ${frame === option.value
                              ? "bg-indigo-500 text-neutral-200"
                              : "bg-neutral-950 text-neutral-200"
                              }`}
                        >
                           {option.label}
                        </button>
                     ))
                  }
               </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 cursor-default mb-10'>

               <RevenueStat value={revenue} loading={isLoading} />
               <OrderStat value={orders} loading={isLoading} />
               <CustomerStat value={customers} loading={isLoading} />
               <ProductStat value={products} loading={isLoading} />

            </div>
            <div>
               <div>

               </div>
               {/*  <h1 className='text-2xl py-6 font-bold text-neutral-400'>
               Sales Overview
            </h1> */}
               <div className="grid placeItems-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <div className="h-full">
                     <SalesChart />
                  </div>
                  <div>
                     <Donut />
                  </div>
               </div>
               <div className="mt-10">
                  <OrdersTable />

               </div>
            </div>
         </div>
      </div>

   );
}
