import registerController from "@/controllers/register.controller";

export async function POST(req: Request) {
  return await registerController(req as any)
}