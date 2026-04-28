import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  return useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetch("/api/cards/products");
      if(!res.ok) {
        throw new Error("Failed to fetch product sold");
      }
      const json = await res.json();
      return json.data;
    }
  })
}

export default useProduct;