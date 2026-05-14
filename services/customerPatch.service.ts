import prisma from "@/lib/prisma";

/**
 * 
 * @param {string} customerId 
 * @param data
 */

const updateCustomer = async (customerId:string, data: any) => {
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: customerId
    },
    data: data
  })
  return updatedCustomer
}

export default updateCustomer