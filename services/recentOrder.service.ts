import prisma from "@/lib/prisma";
import { subDays } from "date-fns";


const getRecentOrders = async () => {
  const lastWeek = subDays(new Date(), 7)
  const recentOrders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: lastWeek
      },
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      customer: true
    },
    take: 10

  })
  return recentOrders
}

export default getRecentOrders;