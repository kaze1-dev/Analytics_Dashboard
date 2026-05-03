import { useQuery } from "@tanstack/react-query";
import { size } from "zod";

const fetcher = async (page: number, size: number) => {
  const res = await fetch(`/api/tables/fetchCustomers?page=${page}&size=${size}`);
  if(!res.ok) {
    throw new Error("Failed to fetch customers")
  }
  return res.json
}

const useCustomerData = (page: number, size: number) => {
  return useQuery({
    queryKey: ['customersData', page, size],
    queryFn: async () => await fetcher(page,size)
  })
}

export default useCustomerData