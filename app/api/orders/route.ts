import { ordersDataController } from "@/controllers/orders.controller";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
  return ordersDataController(req);
}