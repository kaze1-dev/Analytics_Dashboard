import { useQuery } from "@tanstack/react-query";

const fetchOrderInfo = async (frame: string) => {
  const res = await fetch(`/api/analytics/orders?timeframe=${frame}`);
  if(!res.ok) {
    throw new Error("Failed to fetch order info")
  }
  return res.json();
}

const useOrderInfo = (frame: string) => {
  return useQuery({
    queryKey: ["orderInfo", frame],
    queryFn: () => fetchOrderInfo(frame)
  })
}

export default useOrderInfo;