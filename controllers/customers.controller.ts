import { NextResponse, NextRequest } from "next/server";
import { createCustomer, customerService, getCustomerData, getSpecificCustomer, removeCustomer, updateCustomer } from "@/services/customers.service";

export const customerController = async () => {
  try {
    const totalCustomers = await customerService();
    return NextResponse.json({
      success: true,
      data: totalCustomers
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching total customers:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch total customers"
    }, { status: 500 })
  }
}

export const customerUpdateController = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    const body = await req.json();

    const updated = await updateCustomer(id, body);
    return NextResponse.json({
      success: true,
      data: updated
    }, { status: 201 })
  } catch (error) {
    console.error('Update error: ', error);
    return NextResponse.json({
      success: false,
      message: 'Could not update customer'
    }, { status: 500 })
  }
}


export const createCustomerController = async (req: NextRequest) => {
  try {

    const body = await req.json()
    const newCustomer = await createCustomer(body);
    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    console.error("Error creating customer: ", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create Customer. Please try again later."
    }, { status: 500 })
  }

}

export const customerDataController = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1
    const size = Number(searchParams.get("size")) || 25
    const sortBy = searchParams.get("sortBy") || "name";
    const orderBy = searchParams.get("orderBy") || "asc";
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const customersData = await getCustomerData(page, size, sortBy, orderBy, status, search);
    return NextResponse.json(customersData, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch customers data: ", error);
    return NextResponse.json({
      success: false,
      message: "Error while Fetching customers data"
    }, { status: 500 })
  }

}

export const customerDetails = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams?.get("customerId")
    if (!customerId) {
      return NextResponse.json({
        success: false,
        message: `CustomerId is missing`
      }, { status: 400 })
    }
    const customer = await getSpecificCustomer(customerId)
    return NextResponse.json(customer, { status: 200 })
  } catch (error) {
    console.error("Error fetching customer details: ", error)
    return NextResponse.json({
      success: false,
      message: "Error feteching customer's details"
    }, { status: 500 })
  }
}

export const removeCustomerController = async (req:NextRequest, { params }: { params: Promise<{ id: string }> }) => {

  try {
    const { id } = await params;
    const removed = await removeCustomer(id)
    return NextResponse.json({
      success: true,
    }, { status: 200 })
  } catch (error) {
    console.error("Error while removing customer: ", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while removing customer. Please try again later"
    }, { status: 500 })
  }

}

// export {customerController, customerUpdateController, createCustomerController};