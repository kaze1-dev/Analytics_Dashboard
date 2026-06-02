import { getProductById, getProducts } from "@/services/product.service";
import { NextResponse, NextRequest } from "next/server";

export const getProductsController = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get('size')) || 25;
    const statusFilter = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const productsData = await getProducts(page, size, statusFilter, search);
    return NextResponse.json(productsData, { status: 200 })
  } catch (error) {
    console.error("Error fetching products: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch products"
    }, { status: 500 })
  }
}

export const getProductByIdController = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch product details",

    }, { status: 500 });
  }
}
