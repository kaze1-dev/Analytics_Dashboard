import { useQuery } from "@tanstack/react-query";

const fetchProductDetails = async (id: string) => {
  const res = await fetch(`api/products/${id}`);
  if(!res.ok) {
    throw new Error("Something went wrong fetching details");
  }
  return await res.json();
}

const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => await fetchProductDetails(id)
  })
}

export default useProductDetails