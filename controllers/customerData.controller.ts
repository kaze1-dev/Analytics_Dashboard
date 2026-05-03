import getCustomerData from "@/services/customersData.service";
import { NextResponse, NextRequest } from "next/server";

const customerDataController = async(req:NextRequest) => {
  try {
  const {searchParams} = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1
  const size = Number(searchParams.get("size")) || 25
  const customersData = await getCustomerData(page, size);
  return NextResponse.json(customersData, {status: 200})  
  } catch (error) {
    console.error("Failed to fetch customers data: ", error);
    return NextResponse.json({
      success: false,
      message: "Error while Fetching customers data"
    }, {status: 500})
  }
  
}

export default customerDataController