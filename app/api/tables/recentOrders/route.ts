import recentOrderController from "@/controllers/recentOrder.controller";

export async function GET() {
  return await recentOrderController();
}