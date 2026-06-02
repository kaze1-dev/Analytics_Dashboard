import { NextRequest } from 'next/server';
import { getProductsController } from '@/controllers/product.controller';

export async function GET(req: NextRequest) {
  return await getProductsController(req);
}