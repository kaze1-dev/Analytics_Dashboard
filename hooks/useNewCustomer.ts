import { useMutation, useQueryClient } from "@tanstack/react-query";


const fetcher = async (data: any) => {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(!response.ok) {
    throw new Error("Error while creating the customer.")
  }
  return response.json()
}

const useNewCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customersData']});
    }
  })
}

export default useNewCustomer;