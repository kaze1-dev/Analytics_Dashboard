import createCustomerController from "@/controllers/createCustomer.controller";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  return await createCustomerController(req)
}