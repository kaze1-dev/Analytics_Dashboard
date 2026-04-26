import getTotalCustomer from "@/services/orders.service";
import { NextResponse, NextRequest } from "next/server";

const ordersController = async () => {

  try {
    const total = await getTotalCustomer();
    return NextResponse.json({
      success: true,
      data: total
    }, {status: 200})
  } catch (error) {
    console.error("Failed to fetch total customers")
    NextResponse.json({
      success: false,
      message: "Error while fetching customers"
    }, {status: 200})
  }

}

export default ordersController