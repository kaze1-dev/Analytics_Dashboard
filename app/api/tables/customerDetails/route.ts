import customerDetails from "@/controllers/customerDetails.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await customerDetails(req)
}