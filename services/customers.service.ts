import prisma from "@/lib/prisma";

const customerService = async () => {
  const totalCustomers = await prisma.customer.count();
  return totalCustomers;
}

export default customerService;