import prisma from "@/lib/prisma";

export const customerService = async () => {
  const totalCustomers = await prisma.customer.count();
  return totalCustomers;
}


/**
 * 
 * @param {string} customerId 
 * @param data
 */

export const updateCustomer = async (customerId: string, data: any) => {
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: customerId
    },
    data: data
  })
  return updatedCustomer
}

export const createCustomer = async (data: {
  name: string
  email: string
  phone: string
  address: string
  status: string
}) => {
  const { name, email, phone, address, status } = data;
  const existingCustomer = await prisma.customer.findUnique({
    where: { email }
  });
  if (existingCustomer) {
    throw new Error("Customer already exists")
  }
  const newCustomer = await prisma.customer.create({
    data: {
      name,
      email,
      phone,
      address,
      status
    }
  })

  return {
    ...newCustomer
  }
}

export interface CustomerData {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  orderCount: number;
  status: string;
  totalAmount: number
} 

export const getCustomerData = async (page: number = 1, pageSize: number = 25) => {
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


export const getSpecificCustomer = async (customerId: string) => {
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
        orders: {
          include: {
            items: {
              include: {
                product: {
                  select: {
                    name: true,
                    price: true
                  }
                }
              }
            }
          }
        }
      },
      
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
    totalSpent: aggregate._sum.totalAmount || 0
  }
}


// export { customerService, updateCustomer, createCustomer, getCustomerData };