import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';

export default function useProducts({ search, category, page, sort }) {
  return useQuery({
    queryKey: ['products', search, category, page, sort],
    queryFn: () => getProducts({ search, category, page, sort }),
  });
}
