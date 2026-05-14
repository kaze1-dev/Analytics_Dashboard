import { NextResponse, NextRequest } from "next/server";
import updateCustomer from "@/services/customerPatch.service";

const customerUpdateController = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const {id} = await params
    const body = await req.json();
    
    const updated = await updateCustomer(id, body); 
    return NextResponse.json({
      success: true,
      data: updated
    }, {status: 201})
  } catch (error) {
    console.error('Update error: ', error);
    return NextResponse.json({
      success: false,
      message: 'Could not update customer'
    }, {status: 500})
  }
}

export default customerUpdateController