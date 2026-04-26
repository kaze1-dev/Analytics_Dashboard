import prisma from "@/lib/prisma";

const getTotalOrders = async () => {
  const aggregation = await prisma.order.aggregate({
    _count: {
      id: true
    },
  })

  return aggregation._count.id ?? 0;
}

export default getTotalOrders