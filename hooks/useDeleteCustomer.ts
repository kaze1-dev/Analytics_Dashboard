import { useMutation, useQueryClient } from "@tanstack/react-query";


const removeCustomer = async (id: string) => {
  const response = await fetch(`/api/customer/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(!response.ok) {
    throw new Error('Something went wrong while removing customer.');
  }
  return response.json();
}

const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customersData']})
    }
  })
}

export default useDeleteCustomer;