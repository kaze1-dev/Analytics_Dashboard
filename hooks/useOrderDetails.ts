import {useQuery} from "@tanstack/react-query";

const fetchOrderDetails = async (orderId: string) => {
  const response = await fetch(`/api/orders/${orderId}`);
  if(!response.ok) {
    throw new Error("Failed to fetch order details")
  }
  return response.json();
}

const useOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId
  })
}

export default useOrderDetails;