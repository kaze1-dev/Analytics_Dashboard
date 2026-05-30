import { getOrderById, getOrderInfo, getOrders, } from "@/services/orders.service";
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
    }, { status: 500 })
  }
}

export const ordersDataController = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get('size')) || 25;
    const statusFilter = searchParams.get('status') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const orderBy = searchParams.get('orderBy') || "asc"
    const orders = await getOrders(page, size, orderBy, sortBy, statusFilter);
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch orders"
    }, { status: 500 })
  }
}

export const orderByIdController = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const order = await getOrderById(id);
    if(!order) {
      return NextResponse.json({
        success: false,
        message: "Order not found"
      }, { status: 404 })
    }
    return NextResponse.json(order, { status: 200 }) 
  } catch(error) {
    console.error("Error fetching order by ID: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch order details"
    }, { status: 500 })
  }
}
