import { useQuery } from "@tanstack/react-query";

const useCustomer = () => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const res = await fetch("/api/cards/customers");
      if(!res.ok) {
        throw new Error("Error while fetching total customers")
      }
      const json = await res.json();
      return json.data;
    }
  })
}

export default useCustomer;