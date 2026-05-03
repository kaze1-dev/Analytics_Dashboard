import { metadata } from "@/app/layout";
import prisma from "@/lib/prisma";

const getCustomerData = async (page: number = 1, pageSize: number = 25) => {
  const skip = (page - 1) * pageSize
  const [customers, totalCount] = await prisma.$transaction([
    prisma.customer.findMany({
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            orders: true
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.customer.count()
  ])

  const data = customers.map(customer => ({
    ...customer,
    orderCount: customer._count.orders,
    status: customer._count.orders > 0 ? "Active" : "Inactive"
  }))

  return {
    data,
    metadata: {
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      totalCount
    }
  }

}

export default getCustomerData;