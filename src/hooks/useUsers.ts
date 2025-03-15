import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, UserFormData } from '../types/user';
import { userAPI } from '../services/api';

// Mock API calls
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '5551234567',
    roles: ['admin'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock users as needed
];

const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockUsers;
};

const createUser = async (data: UserFormData): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newUser: User = {
    id: Math.random().toString(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  return newUser;
};

const updateUser = async (id: string, data: UserFormData): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockUsers.findIndex(user => user.id === id);
  if (index === -1) throw new Error('User not found');
  
  const updatedUser: User = {
    ...mockUsers[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockUsers[index] = updatedUser;
  return updatedUser;
};

const deleteUser = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockUsers.findIndex(user => user.id === id);
  if (index === -1) throw new Error('User not found');
  mockUsers.splice(index, 1);
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: userAPI.getUsers,
    staleTime: 0, // Her zaman yeni veri çek
    cacheTime: 0, // Önbelleğe alma
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