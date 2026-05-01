import { AnalyticsController } from "@/controllers/analytics.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await AnalyticsController.getSales(req)
}