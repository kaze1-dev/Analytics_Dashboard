import customerController from "@/controllers/customers.controller";

export async function GET() {
  return await customerController();
}