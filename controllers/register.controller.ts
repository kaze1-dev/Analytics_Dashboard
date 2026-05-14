import { NextRequest, NextResponse } from "next/server";
import {registerSchema} from "../validaton";
import registerUser from "../services/register.service";

const registerController = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const parsed = registerSchema.parse(body)
    const user = await registerUser(parsed)
    return NextResponse.json(
      {success: true, user},
      {status: 201}
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        success:false,
        message: error.message || "Something went wrong"
      },
      {status: 400}
    )
  }
}

export default registerController