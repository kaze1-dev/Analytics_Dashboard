"use client";
import useRecentOrders from '@/hooks/useRecentOrder';
import { MoveRight } from 'lucide-react';
import React from 'react'

/* type Order = {
  id: string
  customer: string
  date: string
  status: "Delivered" | "Pending" | "Returned",
  amount: number
  items: OrderItem[]
}

type OrderItem = {
  name: string
  quantity: number
  price: number
}

const orders: Order[] = [
  {
    id: "#1024",
    customer: "John Kaisen",
    date: "2026-4-16",
    status: "Delivered",
    amount: 12000,
    items: [
      { name: "Shoes", quantity: 1, price: 8000 },
      { name: "airbuds", quantity: 1, price: 4000 }
    ]
  },

  {
    id: "#1025",
    customer: "Ali khan",
    date: "2026-4-16",
    status: "Pending",
    amount: 7000,
    items: [
      { name: "watch", quantity: 1, price: 4000 },
      { name: "necklece", quantity: 1, price: 3000 }
    ]
  },

  {
    id: "#1026",
    customer: "Kazuki",
    date: "2026-4-17",
    status: "Returned",
    amount: 5000,
    items: [
      { name: "watch", quantity: 2, price: 2500 }
    ]
  },

  {
    id: "#1027",
    customer: "Naruto",
    date: "2026-4-17",
    status: "Delivered",
    amount: 5000,
    items: [
      { name: "watch", quantity: 2, price: 2500 }
    ]
  },

  {
    id: "#1028",
    customer: "Madara",
    date: "2026-4-17",
    status: "Delivered",
    amount: 5000,
    items: [
      { name: "watch", quantity: 2, price: 2500 }
    ]
  },

  {
    id: "#1029",
    customer: "Itachi",
    date: "2026-4-17",
    status: "Returned",
    amount: 5000,
    items: [
      { name: "watch", quantity: 2, price: 2500 }
    ]
  },

] */

const statusStyles = {
  delivered: "bg-green-950/50  text-green-600",
  pending: "bg-yellow-950 text-yellow-600",
  cancelled: "bg-red-950 text-red-600",
  shipped: "bg-indigo-500/10 text-indigo-500"
}

const OrdersTable = () => {
  const { data: orders, isLoading, error } = useRecentOrders()
  console.log(orders)
  return (

    <div className=''>
      {
        isLoading
          ? (<div className='h-90 p-5 w-full rounded-2xl bg-neutral-900 animate-pulse transition-all' />)
          : (
          <div className=' bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all rounded-2xl p-5 h-90 overflow-auto no-scrollbar'>
        <h1 className='text-xl font-semibold mb-4 text-neutral-400'>
          Recent Orders
        </h1>
        <div className='overflow-x-auto'>
          <table className='w-full text-left overflow-y-scroll'>
            <thead>
              <tr className='text-neutral-400 text-sm border-b border-neutral-700'>
                <th className='py-2'>Order ID</th>
                <th className='py-2'>Customer</th>
                <th className='py-2'>Date</th>
                <th className='py-2'>Status</th>
                <th className='py-2'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any) => (
                <tr
                  key={order.id}
                  className='border-b border-neutral-800 last:border-none text-sm hover:bg-neutral-900/40 cursor-pointer rounded'
                >
                  <td className='py-6 font-bold text-neutral-400'>
                    {order.id.slice(-4).toUpperCase()}
                  </td>
                  <td className='py-6 text-neutral-400 font-bold'>
                    {order.customer?.name || "unknown"}
                  </td>
                  <td className='py-6 text-neutral-400 font-bold'>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className='py-6'>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[order.status as keyof typeof statusStyles]}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className='text-neutral-400 font-bold'>
                    {order.totalAmount.toLocaleString()}
                  </td>
                </tr>
              ))

              }

            </tbody>

          </table>
        </div>
        <div className='flex gap-2 text-blue-600 font-bold text-sm items-center justify-center mt-4 cursor-pointer'>
          <span className=''>
            View all
          </span>
          <MoveRight />
        </div>
      </div>
        )
      }
      
    </div>

  )
}

export default OrdersTable
