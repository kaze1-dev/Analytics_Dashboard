import getRecentOrders from "@/services/recentOrder.service";
import { NextResponse, NextRequest } from "next/server";

const recentOrderController = async () => {
  try {
    const recentOrders = await getRecentOrders();
    return NextResponse.json(recentOrders, {status: 200})
  } catch (error) {
    console.error("Error fetching recent orders: ", error);
    return NextResponse.json({ error: "Failed to fetch recent orders"}, { status: 500});
  }
}

export default recentOrderController;