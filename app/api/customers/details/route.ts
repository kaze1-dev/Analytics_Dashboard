import { customerDetails } from "@/controllers/customers.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await customerDetails(req)
}