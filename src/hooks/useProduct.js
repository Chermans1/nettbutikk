import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../api/products';

export default function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });
}
