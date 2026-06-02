import { getProductByIdController } from "@/controllers/product.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string } >}) {
  return await getProductByIdController(req, { params })
}