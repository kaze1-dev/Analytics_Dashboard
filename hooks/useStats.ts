import { useQuery } from "@tanstack/react-query";


const fetchStats = async (frame: string) => {
  const res = await fetch(`/api/stats?timeframe=${frame}`);
  if(!res.ok) {
    throw new Error('Failed to fetch stats')
  }
  return await res.json();
}

const useStats = (frame: string) => {
  return useQuery({
    queryKey: ['stats', frame],
    queryFn: () => fetchStats(frame),
  })
}

export default useStats;