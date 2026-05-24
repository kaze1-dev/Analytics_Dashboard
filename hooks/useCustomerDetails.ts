import { useQuery } from "@tanstack/react-query";

const fetcher = async (customerId:string | null) => {
  const res = await fetch(`/api/customers/details?customerId=${customerId}`);
  if(!res.ok) {
    throw new Error("Error while fetching customer's details")
  }
  return res.json()
}

const useCustomerDetails = (customerId:string | null) => {
  return useQuery({
    queryKey: ['customerDetails', customerId],
    queryFn: async () => await fetcher(customerId as string),
    enabled: !!customerId
  })
}

export default useCustomerDetails