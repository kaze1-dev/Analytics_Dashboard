import productController from "@/controllers/product.controller";

export async function GET() {
  return await productController();
}