import prisma from "@/lib/prisma";
import { subWeeks, subYears, subMonths } from "date-fns";



export const getOrderInfo = async (timeFrame: string) => {
  let startDate: Date;

  switch (timeFrame) {
    case "1w": startDate = subWeeks(new Date(), 1); break;
    case "1m": startDate = subMonths(new Date(), 1); break;
    case "1y": startDate = subYears(new Date(), 1); break;
    default: startDate = subWeeks(new Date(), 1);
  }
  const stats = await prisma.order.groupBy({
    by: ['status'],
    where: {
      createdAt: {gte: startDate}
    },
    _count: {
      status: true
    }
  })
  return stats
}

export const getOrders = async (page:number=1, pageSize:number=25) => {
  const skip = (page - 1) * pageSize;
  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
    take: pageSize,
    skip: skip,
    select: {
      id: true,
      status: true,
      totalAmount: true,
      customer: {
        select: {
          name: true,
          phone: true
        },
      }
    }
  }),
  prisma.order.count()
  ])
 
  return {
    orders,
    metadata: {
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      totalCount
    }
  };
}

