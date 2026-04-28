import { NextResponse, NextRequest } from "next/server";
import customerService from "@/services/customers.service";

const customerController = async () => {
  try {
    const totalCustomers = await customerService();
    return NextResponse.json({
      success: true,
      data: totalCustomers
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching total customers:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch total customers"
    }, { status: 500 })
  }
}

export default customerController;