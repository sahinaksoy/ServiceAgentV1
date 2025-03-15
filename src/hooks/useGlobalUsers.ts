import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../services/api';

export const USERS_QUERY_KEY = ['users'];

export const useGlobalUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: userAPI.getUsers,
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
}; 