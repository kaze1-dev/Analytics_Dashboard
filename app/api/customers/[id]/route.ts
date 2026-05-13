import customerUpdateController from "@/controllers/customerPatch.controller";
import { NextRequest } from "next/server";

export async function PATCH (request: NextRequest, { params }: { params: { id: string } }) {
  return await customerUpdateController(request, {params})
}