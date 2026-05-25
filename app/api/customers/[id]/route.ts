import { customerUpdateController, removeCustomerController } from "@/controllers/customers.controller";
import { NextRequest } from "next/server";

export async function PATCH (request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return await customerUpdateController(request, {params})
}

export async function DELETE ( req:NextRequest, {params}: {params: Promise<{id: string}>}) {
  return await removeCustomerController(req, {params})
}