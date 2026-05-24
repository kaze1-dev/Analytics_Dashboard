import createCustomer from "@/services/createCustomer.service";
import { NextRequest, NextResponse } from "next/server";


const createCustomerController = async (req: NextRequest) => {
  try {

    const body = await req.json()
    const newCustomer = await createCustomer(body);
    return NextResponse.json(newCustomer, {status: 201})    
  } catch (error) {
    console.error("Error creating customer: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create Customer. Please try again later."
    }, {status: 500})
  }

}

export default createCustomerController