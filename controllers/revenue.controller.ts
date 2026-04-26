import getTotalRevenue from "@/services/revenue.service";
import { NextResponse, NextRequest } from "next/server";

const revenueController = async () => {

  try {
    const revenue = await getTotalRevenue()
    return NextResponse.json({
      success: true,
      data: revenue
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching revenue", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch revenue"
    },{status: 500})
  }

}

export default revenueController