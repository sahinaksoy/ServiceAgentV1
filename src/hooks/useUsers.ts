import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { User, UserFormData } from '../types/user';
import { userAPI } from '../services/api';

// QueryClient'ı configure edelim
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 dakika
      gcTime: 1000 * 60 * 10, // 10 dakika
      refetchOnWindowFocus: true, // Sekme değişiminde yeniden yükle
      refetchOnMount: true, // Komponent mount olduğunda yeniden yükle
      retry: false, // Hata durumunda tekrar deneme
    },
  },
});

// Mock API calls

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Kullanıcılar yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      
      // Durum alanını Türkçeleştir
      return data.map((user: any) => ({
        ...user,
        status: user.status === 'active' ? 'Aktif' : 'Pasif'
      }));
    },
    staleTime: 0, // Her zaman yeni veri çek
    gcTime: 1000 * 60 * 5, // 5 dakika
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.createUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Optimistik güncelleme
      const previousUsers = queryClient.getQueryData<User[]>(['users']) || [];
      queryClient.setQueryData(['users'], [...previousUsers, newUser]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormData }) =>
      userAPI.updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Optimistik güncelleme
      const previousUsers = queryClient.getQueryData<User[]>(['users']) || [];
      queryClient.setQueryData(['users'], 
        previousUsers.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Optimistik güncelleme
      const previousUsers = queryClient.getQueryData<User[]>(['users']) || [];
      queryClient.setQueryData(['users'], 
        previousUsers.filter(user => user.id !== deletedId)
      );
    },
  });
}; 