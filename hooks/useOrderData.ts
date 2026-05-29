import {useQuery} from "@tanstack/react-query";

const fetchOrderData = async (page: number, size: number ) => {
  const res = await fetch(`/api/orders?page=${page}&size=${size}`);
  if(!res.ok) {
    throw new Error("Failed to fetch Orders")
  }
  return res.json();
}

export const useOrderData = (page: number, size: number) => {
  return useQuery({
    queryKey: ['orders', page, size],
    queryFn: () => fetchOrderData(page, size)
  })
}