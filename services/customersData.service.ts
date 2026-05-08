import { Customer } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export interface CustomerData {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  orderCount: number;
  status: "Active" | "Inactive";
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
  // Sum up the totalAmount from each order object
  const total = customer.orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return {
    ...customer,
    orderCount: customer._count.orders,
    status: customer._count.orders > 0 ? "Active" : "Inactive",
    totalAmount: total, // Now this is a NUMBER, not an object
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