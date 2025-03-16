import { useQuery } from '@tanstack/react-query';
import { storeAPI } from '../services/api';
import { Store } from '../types/store';

export const useGlobalStores = () => {
  return useQuery<Store[]>({
    queryKey: ['stores'],
    queryFn: storeAPI.getStores,
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
}; 