import { useQuery } from "@tanstack/react-query";

const fetchSalesData = async (range: string) => {
  const res = await fetch(`/api/analytics/sales?range=${range}`)
  if(!res.ok) {
    throw new Error('Failed to fetch sales')
  }
  return await res.json();
}

const useAnalytics = (range: string) => {
  return useQuery({
    queryKey: ['analytics', range],
    queryFn: () => fetchSalesData(range),
    staleTime: 1000 * 60 * 5
  })
}

export default useAnalytics;