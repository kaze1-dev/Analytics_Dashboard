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

const fetcher = async (page: number, size: number, sortBy:string, orderBy:string, status:string, search:string) => {
  const res = await fetch(`/api/customers?page=${page}&size=${size}&sortBy=${sortBy}&orderBy=${orderBy}&status=${status}&search=${search}`);
  if(!res.ok) {
    throw new Error("Failed to fetch customers")
  }
  return res.json()
}

const useCustomerData = (page: number, size: number, sortBy:string, orderBy:string, status:string, search:string) => {
  return useQuery<CustomerResponse>({
    queryKey: ['customersData', page, size, sortBy, orderBy, status,search],
    queryFn: async () => await fetcher(page,size,sortBy,orderBy,status,search)
  })
}

export default useCustomerData