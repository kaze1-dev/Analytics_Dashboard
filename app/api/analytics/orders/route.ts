import orderInfoController from "@/controllers/orderInfo.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await orderInfoController(req)
}