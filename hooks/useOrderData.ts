import { useQuery } from "@tanstack/react-query";

const fetchOrderData = async (page: number, size: number,orderBy: string, sortBy: string, statusFilter?: string) => {
  const res = await fetch(`/api/orders?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}&status=${statusFilter}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Orders")
  }
  return res.json();
}

export const useOrderData = (page: number, size: number, orderBy: string, sortBy: string, statusFilter?: string) => {
  return useQuery({
    queryKey: ['orders', page, size, orderBy, sortBy, statusFilter],
    queryFn: () => fetchOrderData(page, size, orderBy, sortBy, statusFilter),
  })
}