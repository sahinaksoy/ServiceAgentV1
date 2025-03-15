import axios from 'axios';
import { Customer, CustomerFormData } from '../types/customer';

const API_URL = '/api/customers';

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: number): Promise<Customer> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (customer: CustomerFormData): Promise<Customer> => {
    const response = await axios.post(API_URL, customer);
    return response.data;
  },

  update: async (id: number, customer: CustomerFormData): Promise<Customer> => {
    const response = await axios.put(`${API_URL}/${id}`, customer);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
}; 