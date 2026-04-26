import ordersController from "@/controllers/orders.controller";

export async function GET() {
  return await ordersController()
}