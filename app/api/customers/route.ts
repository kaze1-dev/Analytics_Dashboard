import { createCustomerController, customerDataController } from "@/controllers/customers.controller";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  return await createCustomerController(req)
}

export async function GET(req: NextRequest) {
  return await customerDataController(req)
}