import { useQuery } from "@tanstack/react-query";

const fetcher = async () => {
  const res = await fetch("/api/tables/recentOrders");
  if(!res.ok) {
    throw new Error("Failed to fetch recent orders")
  }
  return res.json();
}

const useRecentOrders = () => {
  return useQuery({
    queryKey: ['recentOrders'],
    queryFn: () => fetcher()
  })
}

export default useRecentOrders;