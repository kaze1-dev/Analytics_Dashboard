import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCustomer = async ({id, data}: {id: string, data: any}) => {
  const response = await fetch(`/api/customers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if(!response.ok) {
    throw new Error("Failed to update the customer")
  }
  return response.json()
}

const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey: ['customerDetails', variables.id]})
      queryClient.invalidateQueries({queryKey: ['customersData']})
    }
  })
}

export default useUpdateCustomer