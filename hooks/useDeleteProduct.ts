import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProduct = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(!response.ok) {
    throw new Error('Something went wrong while removing product.')
  }
  return await response.json();
}

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    }
  })
}

export default useDeleteProduct;