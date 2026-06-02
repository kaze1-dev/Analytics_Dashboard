import { useMutation, useQueryClient } from '@tanstack/react-query';

const createProduct = async (data: { name: string, price: number, stock: number }) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(!res.ok) {
    throw new Error("Failed to create Product");
  }
  return await res.json();
}

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  })
}

export default useCreateProduct;