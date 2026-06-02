import { useQuery } from '@tanstack/react-query';

const fetchProducts = async (page: number, size: number, statusFilter?: string) => {
  const res = await fetch(`/api/products?page=${page}&size=${size}&status=${statusFilter}`);
  if(!res.ok) {
    throw new Error("Failed to fetch Products");
  }
  return res.json();
}

const useProducts = (page: number, size: number, statusFilter?: string) => {
  return useQuery({
    queryKey: ['products', page, size, statusFilter],
    queryFn: async () => await fetchProducts(page, size, statusFilter)
  })
}

export default useProducts;