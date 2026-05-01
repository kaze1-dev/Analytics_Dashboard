import { NextResponse, NextRequest } from "next/server";
import { AnalyticsService } from "@/services/analytics.service";

export class AnalyticsController {
  static async getSales(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const range = searchParams.get("range") || "7d";

      const data = await AnalyticsService.getSalesData(range);
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error("Error fetching sales data: ", error);
      return NextResponse.json({
        success: false,
        message: "Failed to fetch sales data"
      }, { status: 500 })
    }
  }
}