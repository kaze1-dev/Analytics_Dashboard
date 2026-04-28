import prisma from "@/lib/prisma";

const productService = async () => {
  const productSold = await prisma.order.count({
    where: {
      status: {
        in: ['delivered', 'shipped']
      }
    }
  }) 
  return productSold;
}

export default productService;