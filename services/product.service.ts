import prisma from "@/lib/prisma";

export const getProducts = async (page: number, size: number, statusFilter?: string, search?: string) => {
  let whereClause: any = {};
  if (statusFilter) {
    whereClause.stock = statusFilter === 'in_stock' ? { gt: 10 } : statusFilter === 'low_stock' ? { lte: 10, gt: 0 } : 0
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { id: { contains: search, mode: 'insensitive' } },
    ]
  }
  const skip = (page - 1) * size;
  const LOW_STOCK_THRESHOLD = 10;
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      take: size,
      skip: skip,
      where: whereClause,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
      }
    }),
    prisma.product.count({ where: whereClause })
  ])

  const productsWithStatus = products.map((product) => ({
    ...product,
    status: product.stock === 0 ? 'Out of Stock' : product.stock <= LOW_STOCK_THRESHOLD ? 'Low Stock' : 'In Stock'
  }))
  return {
    products: productsWithStatus,
    metadata: {
      totalPages: Math.ceil(totalCount / size),
      currentPage: page,
      totalCount
    }
  };
}

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      createdAt: true,
    }
  });
  return product;
}