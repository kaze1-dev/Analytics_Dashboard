import prisma from "@/lib/prisma";
import { format, subMonths, subYears, subWeeks } from "date-fns"
import { promises } from "dns";

const getStats = async (timeframe: string) => {
  let startDate: Date;

  switch (timeframe) {
    case "1w": startDate = subWeeks(new Date(), 1); break;
    case "1m": startDate = subMonths(new Date(), 1); break;
    case "1y": startDate = subYears(new Date(), 1); break;
    default: startDate = subWeeks(new Date(), 1);
  }

  const [revenue, customers, orders, products] = await Promise.all([
    prisma.order.aggregate({
      _sum: { totalAmount: true},
      where: {
        createdAt: { gte: startDate},
        status: "delivered"
      }
    }),
    prisma.customer.count({
      where: {
        createdAt: { gte: startDate}
      }
    }),
    prisma.order.count({
      where: {
        createdAt: { gte: startDate},
        status: { not: "cancelled"}
      }
    }),
    prisma.orderItem.aggregate({
      _sum: { quantity: true},
      where: {
        order: {
          createdAt: { gte: startDate }
        }
      }
    })
  ]);

let formatted = revenue._sum.totalAmount
formatted = Math.round(formatted ?? 0)
  return {
    totalRevenue: formatted,
    totalCustomers: customers,
    totalOrders: orders,
    productsSold: products._sum.quantity || 0
  }

}

export default getStats;