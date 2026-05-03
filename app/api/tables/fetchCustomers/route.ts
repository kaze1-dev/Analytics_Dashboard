import customerDataController from "@/controllers/customerData.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await customerDataController(req)
}