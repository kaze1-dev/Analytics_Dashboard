import prisma from "@/lib/prisma";
import { subWeeks, subYears, subMonths } from "date-fns";


const getOrderInfo = async (timeFrame: string) => {
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

export default getOrderInfo