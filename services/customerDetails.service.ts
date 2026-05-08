import prisma from "@/lib/prisma";

const getSpecificCustomer = async (customerId: string) => {
  const [customer, aggregate] = await Promise.all([
    prisma.customer.findUnique({
      where: {
        id: customerId
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        },
      }
    }),
    prisma.order.aggregate({
      where: {
        customerId: customerId
      },
      _sum: {
        totalAmount: true
      }
    })
  ])

  if (!customer) {
    return null
  }

  return {
    ...customer,
    orderCount: customer._count.orders,
    status: customer._count.orders > 0 ? "Active" : "Inactive",
    totalSpent: aggregate._sum.totalAmount || 0
  }
}

export default getSpecificCustomer