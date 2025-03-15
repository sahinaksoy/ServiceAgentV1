import axios from 'axios';
import { User, UserFormData } from '../types/user';
import { Store, StoreFormData } from '../types/store';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const userAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (userData: UserFormData): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: UserFormData): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

export const storeAPI = {
  getStores: async (): Promise<Store[]> => {
    const response = await api.get('/stores');
    return response.data;
  },

  createStore: async (storeData: StoreFormData): Promise<Store> => {
    const response = await api.post('/stores', storeData);
    return response.data;
  },

  updateStore: async (id: string, storeData: StoreFormData): Promise<Store> => {
    const response = await api.put(`/stores/${id}`, storeData);
    return response.data;
  },

  deleteStore: async (id: string): Promise<void> => {
    await api.delete(`/stores/${id}`);
  },
}; 