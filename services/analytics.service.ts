import prisma from "@/lib/prisma";
import { format, subDays, subHours, subMonths, subYears, subWeeks } from "date-fns"
import { Label } from "recharts";

export class AnalyticsService {
  static async getSalesData(range: string) {
    let startDate: Date;

    switch (range) {
      case "1w": startDate = subWeeks(new Date(), 1); break;
      case "30d": startDate = subMonths(new Date(), 1); break;
      case "1y": startDate = subYears(new Date(), 1); break;
      default: startDate = subWeeks(new Date(), 1);
    }
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        status: { not: "cancelled" }
      },
      select: {
        totalAmount: true,
        createdAt: true
      },
      orderBy: { createdAt: "asc"}
    })

    const chartDataMap: Record<string, number> = {}

    orders.forEach((order) => {
      const pattern = range === "1y"? "MMM yyyy": "MMM dd";
      const label = format(order.createdAt, pattern);
      chartDataMap[label] = (chartDataMap[label] || 0) + order.totalAmount;
    })
  

    return  Object.entries(chartDataMap).map(([label, total]) => ({
      label,
      total: Math.round(total)
    }))

  }
}