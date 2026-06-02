import { useQuery } from '@tanstack/react-query';

const fetchProducts = async (page: number, size: number, statusFilter?: string, search?: string) => {
  const res = await fetch(`/api/products?page=${page}&size=${size}&status=${statusFilter}&search=${search}`);
  if(!res.ok) {
    throw new Error("Failed to fetch Products");
  }
  return res.json();
}

const useProducts = (page: number, size: number, statusFilter?: string, search?: string) => {
  return useQuery({
    queryKey: ['products', page, size, statusFilter, search],
    queryFn: async () => await fetchProducts(page, size, statusFilter, search)
  })
}

export default useProducts;