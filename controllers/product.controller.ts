  import { NextResponse } from "next/server";
  import productService from "@/services/product.service";

  const productController = async () => {

    try {
      const productSold = await productService();
      return NextResponse.json({
        success: true,
        data: productSold
      }, { status: 200 });
    } catch (error) {
      console.error("Error fetching product sold:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to fetch product sold"
      }, { status: 500 })
    }
  }

  export default productController;