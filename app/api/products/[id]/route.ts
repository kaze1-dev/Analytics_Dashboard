import { deleteProductController, getProductByIdController } from "@/controllers/product.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string } >}) {
  return await getProductByIdController(req, { params })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string } >}) {
  return await deleteProductController(req, { params});
}