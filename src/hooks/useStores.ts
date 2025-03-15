import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Store, StoreFormData } from '../types/store';
import { storeAPI } from '../services/api';

export const useStores = () => {
  return useQuery<Store[], Error>({
    queryKey: ['stores'],
    queryFn: storeAPI.getStores,
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeAPI.createStore,
    onSuccess: (newStore) => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      // Optimistik güncelleme
      const previousStores = queryClient.getQueryData<Store[]>(['stores']) || [];
      queryClient.setQueryData(['stores'], [...previousStores, newStore]);
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StoreFormData }) =>
      storeAPI.updateStore(id, data),
    onSuccess: (updatedStore) => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      // Optimistik güncelleme
      const previousStores = queryClient.getQueryData<Store[]>(['stores']) || [];
      queryClient.setQueryData(['stores'], 
        previousStores.map(store => 
          store.id === updatedStore.id ? updatedStore : store
        )
      );
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeAPI.deleteStore,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      // Optimistik güncelleme
      const previousStores = queryClient.getQueryData<Store[]>(['stores']) || [];
      queryClient.setQueryData(['stores'], 
        previousStores.filter(store => store.id !== deletedId)
      );
    },
  });
}; 