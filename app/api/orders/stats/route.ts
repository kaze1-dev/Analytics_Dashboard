import { orderStatsController } from "@/controllers/orders.controller";
import {NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  return await orderStatsController(req)
}