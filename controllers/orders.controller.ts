import  { getOrderInfo, getOrders, } from "@/services/orders.service";
import { NextResponse, NextRequest } from "next/server";


export const orderInfoController = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const timeFrame = searchParams.get("timeframe")
  try {
    const data = await getOrderInfo(timeFrame as string)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching order info: ", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch order information"
    }, {status: 500})
  }
}

export const ordersDataController = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get('size')) || 25;
    const orders = await getOrders(page, size);
    return NextResponse.json(orders, {status: 200});
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch orders"
    }, {status: 500})
  }
}
