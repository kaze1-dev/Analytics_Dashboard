import prisma from "@/lib/prisma";
import { format, subMonths, subYears, subWeeks, startOfDay, eachMonthOfInterval, eachDayOfInterval } from "date-fns"
import { Label } from "recharts";

export class AnalyticsService {
  static async getSalesData(range: string) {
    let startDate: Date;

    /* switch (range) {
      case "1w": startDate = subWeeks(new Date(), 1); break;
      case "30d": startDate = subMonths(new Date(), 1); break;
      case "1y": startDate = subYears(new Date(), 1); break;
      default: startDate = subWeeks(new Date(), 1);
    } */

    const today = startOfDay(new Date());
    switch (range) {
      case "1w": startDate = subWeeks(today, 1); break;
      case "30d": startDate = subMonths(today, 1); break;
      case "1y": startDate = subYears(today, 1); break;
      default: startDate = subWeeks(today, 1);
    }

    const chartDataMap: Record<string, number> = {};
    const pattern = range === "1y" ? "MMM yyyy" : "MMM dd"
    const intevral = range === "1y"
      ? eachMonthOfInterval({ start: startDate, end: new Date() })
      : eachDayOfInterval({ start: startDate, end: new Date() })

    intevral.forEach((data) => {
      const label = format(data, pattern)
      chartDataMap[label] = 0
    })
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        status: { not: "cancelled" }
      },
      select: {
        totalAmount: true,
        createdAt: true
      },
      orderBy: { createdAt: "asc" }
    })

    orders.forEach((order) => {
      const label = format(order.createdAt, pattern);
      if(chartDataMap.hasOwnProperty(label)) {
        chartDataMap[label] += order.totalAmount;
      }
    })


    return Object.entries(chartDataMap).map(([label, total]) => ({
      label,
      total: Math.round(total)
    }))

  }
}