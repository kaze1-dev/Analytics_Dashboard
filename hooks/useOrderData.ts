import { useQuery } from "@tanstack/react-query";

const fetchOrderData = async (page: number, size: number,orderBy: string, sortBy: string, statusFilter?: string, searchQuery?: string) => {
  const res = await fetch(`/api/orders?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}&status=${statusFilter}&search=${searchQuery}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Orders")
  }
  return res.json();
}

export const useOrderData = (page: number, size: number, orderBy: string, sortBy: string, statusFilter?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['orders', page, size, orderBy, sortBy, statusFilter, searchQuery],
    queryFn: () => fetchOrderData(page, size, orderBy, sortBy, statusFilter, searchQuery),
  })
}