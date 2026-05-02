/* import { useQuery } from "@tanstack/react-query";

const useOrder = () => {
  return useQuery({
    queryKey: ['order'],
    queryFn: async () => {
      const res = await fetch('/api/cards/orders');
      if (!res.ok) {throw new Error("Error while fetching total orders")}
      const json = await res.json();
      return json.data
    }
  })
}

export default useOrder */