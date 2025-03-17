import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, UserFormData } from '../types/user';
import { userAPI } from '../services/api';

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: userAPI.getUsers,
    staleTime: 0, // Her zaman yeni veri çek
    gcTime: 0, // Önbelleğe alma
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