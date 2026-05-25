"use client"
import React, { useState } from 'react'
import RevenueStat from '../stats/revenueStat'
import OrderStat from '../stats/orderStat'
import CustomerStat from '../stats/customerStat'
import ProductStat from '../stats/productStat'
import useStats from '@/hooks/useStats'


const Cards = () => {

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
  <div className='grid grid-cols-4 gap-4 cursor-default mb-4'>

    <RevenueStat value={revenue} loading={isLoading} />
    <OrderStat value={orders} loading={isLoading} />
    <CustomerStat value={customers} loading={isLoading} />
    <ProductStat value={products} loading={isLoading} />

  </div>


)
}

export default Cards