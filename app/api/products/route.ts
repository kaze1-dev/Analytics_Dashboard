import { NextRequest } from 'next/server';
import { getProductsController, newProductController } from '@/controllers/product.controller';

export async function GET(req: NextRequest) {
  return await getProductsController(req);
}

export async function POST(req: NextRequest) {
  return await newProductController(req);
}