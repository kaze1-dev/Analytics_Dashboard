"use client";

import {
	PieChart,
	Pie,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

import React, { useState } from 'react'
import { RefreshCw } from "lucide-react";
import useOrderInfo from "@/hooks/useOrderInfo";

const COLORS: Record<string, string> = {
	delivered: "#22c55e",
	shipped: "#6366f1",
	pending: "#f59e0b",
	cancelled: "#ef4444",
};

const Donut = () => {
	const frameOptions = [
		{ label: "1W", value: "1w" },
		{ label: "1M", value: "1m" },
		{ label: "1Y", value: "1y" },
	];
	const [frame, setFrame] = useState('1w');
	const { data: rawData, isLoading, error, refetch } = useOrderInfo(frame);
	const [isRetrying, setIsRetrying] = useState(false);

	const formattedData = rawData?.map((item: any) => ({
		name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
		key: item.status,
		value: item._count.status || item._count,
		fill: COLORS[item.status] || "#525252",
	})) || [];

	const totalOrders = formattedData.reduce((sum: number, item: any) => sum + item.value, 0);

	const handleRetry = async () => {
		setIsRetrying(true);
		try {
			await refetch?.();
		} finally {
			setIsRetrying(false);
		}
	};

	return (
		<div className="w-full">
			<div className="border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all px-4 sm:px-5 py-8">
				<div className="flex flex-wrap gap-4 justify-between items-start">
					<div>
						<h2 className="text-white/90 text-lg font-bold tracking-tight">
							Orders Information
						</h2>
						<p className="text-white/40 text-sm hidden xl:block mt-0.5">
							Track your order status and performance metrics
						</p>
					</div>

					<div className="flex items-center gap-0.5 bg-neutral-900/60 border border-neutral-800 rounded-xl p-1">
						{frameOptions.map((option) => (
							<button
								key={option.value}
								onClick={() => setFrame(option.value)}
								disabled={!!error}
								className={`text-xs px-3 py-1.5 cursor-pointer font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
									frame === option.value
										? "bg-indigo-600 text-white shadow-sm shadow-indigo-900/50"
										: "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
								}`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				<div className="relative w-full h-64 mt-4">
					{isLoading ? (
						<div className="w-full h-full flex flex-col items-center justify-center gap-3 text-neutral-600">
							<div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
							<span className="text-xs text-neutral-500 animate-pulse">Loading data…</span>
						</div>
					) : error ? (
						<div className="w-full h-full flex flex-col items-center justify-center gap-3">
							<span className="text-sm text-red-400/80 text-center max-w-[220px]">
								Failed to load order data
							</span>
							<button
								onClick={handleRetry}
								disabled={isRetrying}
								className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<RefreshCw
									className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`}
								/>
								{isRetrying ? "Retrying…" : "Retry"}
							</button>
						</div>
					) : totalOrders === 0 ? (
						<div className="w-full h-full flex items-center justify-center">
							<span className="text-sm text-neutral-600">No orders in this period</span>
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
										itemStyle={{ color: "#e5e5e5" }}
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

							<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
								<h1 className="text-neutral-200 text-2xl font-bold tabular-nums">
									{totalOrders}
								</h1>
								<p className="text-neutral-500 text-sm">Total Orders</p>
							</div>

							<div className="gap-x-6 gap-y-2 justify-center flex-wrap text-xs hidden sm:hidden md:flex lg:hidden xl:flex mt-2">
								{formattedData.map((item: any) => (
									<div key={item.key} className="flex gap-1.5 items-center">
										<span
											className="h-2.5 w-2.5 rounded-full"
											style={{ backgroundColor: item.fill }}
										/>
										<p className="text-neutral-400 font-semibold">{item.name}</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Donut;