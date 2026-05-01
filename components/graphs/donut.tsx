"use client";

import {
   PieChart,
   Pie,
   ResponsiveContainer,
   Tooltip,
} from "recharts";

import React from 'react'

const data = [
   { name: "Delivered", value: 740, fill: "#16a34a" },
   { name: "Shipped", value: 380, fill: "#2563eb" },
   { name: "Returned", value: 120, fill: "#dc2626" },
];

const Donut = () => {
   const total = data.reduce((sum, item) => sum + item.value, 0)
   return (
      <div className="w-full">
         <div className="border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all p-5">
            <h2 className="text-neutral-400 text-lg font-bold mb-4">
               Orders Information
            </h2>

            <div className="relative w-full h-57">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>

                     <Tooltip
                        contentStyle={{
                           backgroundColor: "#0a0a0a",
                           border: "1px solid #262626",
                           borderRadius: "8px",
                           fontWeight: "bold"
                        }}
                        labelStyle={{
                           color: "#a3a3a3",
                           fontSize: "12px",
                        }}
                        itemStyle={{
                           color: "#e5e5e5",
                           fontSize: "13px",
                        }}
                     />
                     <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={90}
                        outerRadius={110}
                        paddingAngle={5}
                        stroke="#0a0a0a"  // matches neutral-950
                        strokeWidth={2}
                        cornerRadius={8}
                     />

                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <h1 className="text-neutral-400 text-2xl font-bold">{total}</h1>
                  <p className="text-neutral-500 text-sm">Total Orders</p>
               </div>
            </div>
            <div className="mt-4 flex gap-10 justify-center text-sm">
               <div className="flex gap-1 items-center">
                  <span className="bg-[#16a34a] h-4 w-4 rounded"></span>
                  <p className="text-neutral-400 font-bold">Delivered</p>
               </div>
               <div className="flex gap-1 items-center">
                  <span className="bg-[#2563eb] h-4 w-4 rounded"></span>
                  <p className="text-neutral-400 font-bold">Shipped</p>
               </div>
               <div className="flex gap-1 items-center">
                  <span className="bg-[#dc2626] h-4 w-4 rounded"></span>
                  <p>Returned</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Donut