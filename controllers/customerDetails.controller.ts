import { NextRequest, NextResponse } from "next/server";
import getSpecificCustomer from "@/services/customerDetails.service";

const customerDetails = async (req: NextRequest) => {
  try {
    const {searchParams} = new URL(req.url);
    const customerId = searchParams?.get("customerId")
    if(!customerId) {
      return NextResponse.json({
        success: false,
        message: `CustomerId is missing`
      }, {status: 400})
    }
    const customer = await getSpecificCustomer(customerId)
    return NextResponse.json(customer, {status: 200})
  } catch (error) {
    console.error("Error fetching customer details: ",error)
    return NextResponse.json({
      success: false,
      message: "Error feteching customer's details"
    }, {status: 500})
  }
}

export default customerDetails