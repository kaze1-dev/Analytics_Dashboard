import prisma from "@/lib/prisma";

const getTotalRevenue = async () => {
  const aggregation = await prisma.order.aggregate({
    _sum: {
      totalAmount: true
    },
    where: {
      status: "delivered"
    }
  })

  return aggregation._sum.totalAmount ?? 0;
}

export default getTotalRevenue