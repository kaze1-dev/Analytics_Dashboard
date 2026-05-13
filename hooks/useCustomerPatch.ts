import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCustomer = async ({id, data}: {id: string, data: any}) => {
  const response = await fetch(`/api/customers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey: ['customers', variables.id]})
      queryClient.invalidateQueries({queryKey: ['customersData']})
    }
  })
}

export default useUpdateCustomer