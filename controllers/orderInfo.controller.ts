import getOrderInfo from "@/services/orderInfo.service";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

const orderInfoController = async (req: NextRequest) => {
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

export default orderInfoController