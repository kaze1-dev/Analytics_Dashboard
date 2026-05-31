import { useQuery } from "@tanstack/react-query";

const fetchOrderStats = async () => {
  const res = await fetch(`/api/orders/stats`);
  if(!res.ok) {
    throw new Error("Failed to fetch order stats")
  }
  return await res.json();
}

const useOrderStats = () => {
  return useQuery({
    queryKey: ['orderStats'],
    queryFn: fetchOrderStats,
  })
}

export default useOrderStats;