"use client";

import {
	PieChart,
	Pie,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

import React, { useState } from 'react'
import useOrderInfo from "@/hooks/useOrderInfo";

/* const data = [
	{ name: "Delivered", value: 740, fill: "#16a34a" },
	{ name: "Shipped", value: 380, fill: "#2563eb" },
	{ name: "Returned", value: 120, fill: "#dc2626" },
]; */

const COLORS: Record<string, string> = {
	delivered: "#22c55e",
	shipped: "#6366f1",
	pending: "#f59e0b",
	cencelled: "#ef4444"
}

const Donut = () => {
	const frameOptions = [
		{ label: "1W", value: "1w" },
		{ label: "1M", value: "1m" },
		{ label: "1Y", value: "1y" },
	]
	const [frame, setFrame] = useState('1w');
	const { data: rawData, isLoading, error } = useOrderInfo(frame)
	const formattedData = rawData?.map((item: any) => ({
		name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
		value: item._count.status || item._count,
		fill: COLORS[item.status] || "#525252"
	})) || [];
	const totalOrders = formattedData.reduce((sum: any, item: any) => sum + item.value, 0)
	/* const total = data.reduce((sum, item) => sum + item.value, 0) */
	return (
		<>
			<div className="w-84 sm:w-full md:w-full lg:w-full xl:w-full">
				<div className="border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all px-3 py-8">
					<div className="flex justify-between">
						<div>
						<h2 className="text-white/80 text-lg font-bold tracking-tight">
							Orders Information
						</h2>
						<p className="text-white/50 text-sm hidden xl:block">Track your order status and performance metrics</p>
						</div>
						<div className="flex items-center">
							{frameOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => setFrame(option.value)}
									className={`text-xs text-neutral-200 px-3 py-1 cursor-pointer font-bold rounded-lg transition-all ${frame === option.value
											? "bg-indigo-600 text-neutral-200"
											: "bg-neutral-950 text-neutral-200"
										}`}
								>
									{option.label}
								</button>
							))}
						</div>
					</div>

					<div className="relative w-full h-64">
						{isLoading ? (
							<div className="w-full h-full flex items-center justify-center text-neutral-600 animate-pulse">
								<div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
							</div>
						) : (
							<>
								<ResponsiveContainer>
									<PieChart>
										<Tooltip
											contentStyle={{
												backgroundColor: "#0a0a0a",
												border: "1px solid #262626",
												borderRadius: "8px",
												fontWeight: "bold",
											}}
										/>
										<Pie
											data={formattedData}
											dataKey="value"
											nameKey="name"
											innerRadius={80}
											outerRadius={100}
											paddingAngle={5}
											stroke="#0a0a0a"
											strokeWidth={2}
											cornerRadius={8}
										/>
									</PieChart>
								</ResponsiveContainer>


								<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-50">
									<h1 className="text-neutral-400 text-2xl font-bold">{totalOrders}</h1>
									<p className="text-neutral-500 text-sm">Total Orders</p>
								</div>


								<div className=" gap-10 justify-center text-xs hidden sm:hidden md:flex lg:hidden xl:flex">
									<div className="flex gap-1 text-xs items-center">
										<span className="bg-[#22c55e] h-4 w-4 rounded"></span>
										<p className="text-neutral-400 font-bold">Delivered</p>
									</div>
									<div className="flex gap-1 text-xs items-center">
										<span className="bg-[#6366f1] h-4 w-4 rounded"></span>
										<p className="text-neutral-400 font-bold">Shipped</p>
									</div>
									<div className="flex gap-1 text-xs items-center">
										<span className="bg-[#f59e0b] h-4 w-4 rounded"></span>
										<p className="text-neutral-400 font-bold">Pending</p>
									</div>
									<div className="flex gap-1 text-xs items-center">
										<span className="bg-[#525252] h-4 w-4 rounded"></span>
										<p className="text-neutral-400 font-bold">Cancelled</p>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Donut