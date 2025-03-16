import { useQuery } from '@tanstack/react-query';
import { customerAPI } from '../services/api';

export const CUSTOMERS_QUERY_KEY = ['customers'];

export const useGlobalCustomers = () => {
  return useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: customerAPI.getCustomers,
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
}; 