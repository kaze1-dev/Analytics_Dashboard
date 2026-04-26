
import { useQuery } from "@tanstack/react-query"

const useRevenue = () => {
  return useQuery({
    queryKey: ['revenue'],
    queryFn: async () => {
      const res = await fetch('api/cards/revenue')
      if(!res.ok) {
        throw new Error("Falied to fetch revenue")
      }
      const json = await res.json()
      return Math.round(json.data || 0);
    }
  })
}

export default useRevenue
