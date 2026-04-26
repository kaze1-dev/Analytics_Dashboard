"use client"
import React from 'react'
import RevenueStat from './stats/revenueStat'
import OrderStat from './stats/orderStat'
import CustomerStat from './stats/customerStat'
import ProductStat from './stats/productstat'


const Cards = () => {



  return (
    <div className='grid grid-cols-4 gap-4 cursor-default mb-4'>

      <RevenueStat />
      <OrderStat />
      <CustomerStat />
      <ProductStat />

    </div>


  )
}

export default Cards