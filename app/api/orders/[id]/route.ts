import { orderByIdController } from "@/controllers/orders.controller";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return await orderByIdController(req, { params });
}