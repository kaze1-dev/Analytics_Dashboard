import revenueController from "@/controllers/revenue.controller";

export async function GET() {
  return await revenueController()
}