import { customerUpdateController } from "@/controllers/customers.controller";
import { NextRequest } from "next/server";

export async function PATCH (request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return await customerUpdateController(request, {params})
}