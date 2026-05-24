import { CustomerData } from "@/services/customers.service";
import { useQuery } from "@tanstack/react-query";

interface CustomerResponse {
  data: CustomerData[];
  metadata: {
    totalPages: number;
    currentPage: number;
    totolCount: number;
  }
}

const fetcher = async (page: number, size: number) => {
  const res = await fetch(`/api/customers?page=${page}&size=${size}`);
  if(!res.ok) {
    throw new Error("Failed to fetch customers")
  }
  return res.json()
}

const useCustomerData = (page: number, size: number) => {
  return useQuery<CustomerResponse>({
    queryKey: ['customersData', page, size],
    queryFn: async () => await fetcher(page,size)
  })
}

export default useCustomerData