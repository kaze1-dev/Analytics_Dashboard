import prisma from "@/lib/prisma"

const createCustomer = async (data: {
  name: string
  email: string
  phone: string
  address: string
  status: string
}) => {
  const { name, email, phone, address, status } = data;
  const existingCustomer = await prisma.customer.findUnique({
    where: {email}
  });
  if(existingCustomer) {
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

export default createCustomer