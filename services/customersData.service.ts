import { Customer } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export interface CustomerData {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  orderCount: number;
  status: string;
  totalAmount: number
} 

const getCustomerData = async (page: number = 1, pageSize: number = 25) => {
  const skip = (page - 1) * pageSize
  const [customers, totalCount, ] = await Promise.all([
    prisma.customer.findMany({
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
        orders: {
          select: {
            totalAmount: true
          }
        },
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
    prisma.customer.count(),
  ])

// Inside getCustomerData.ts
const data: CustomerData[] = customers.map(customer => {

  const total = customer.orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return {
    ...customer,
    orderCount: customer._count.orders,
    totalAmount: total,
  };
});

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