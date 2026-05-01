import { NextRequest, NextResponse } from "next/server";
import getStats from "@/services/stats.service";

const StatsController = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get("timeframe");

  try {
    const stats = await getStats(timeframe as string);
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch stats data"
    }, { status: 500 })
  }

}

export default StatsController;