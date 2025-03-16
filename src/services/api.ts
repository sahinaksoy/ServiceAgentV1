import axios from 'axios';
import { Customer, CustomerFormData } from '../types/customer';
import { User, UserFormData } from '../types/user';
import { Store, StoreFormData } from '../types/store';
import { WorkOrder, WorkOrderFormData } from '../types/workOrder';
import dayjs from 'dayjs';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

// Mock veriler
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Meser Teknoloji',
    email: 'info@meser.com.tr',
    phone: '0212 555 1234',
    address: 'Kadıköy, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Arveta',
    email: 'info@arveta.com.tr',
    phone: '0216 444 5678',
    address: 'Beşiktaş, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Noord',
    email: 'info@noord.com.tr',
    phone: '0212 333 9012',
    address: 'Şişli, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock iş emirleri
const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    type: 'emergency',
    priority: 'high',
    status: 'pending',
    summary: 'Klima bakımı yapılacak',
    dueDate: dayjs().add(3, 'day').format(),
    company: '1',
    contact: '1',
    email: 'info@abcmarket.com',
    phone: '0212 555 0001',
    mobile: '0532 555 0001',
    serviceAddress: 'ABC Market Merkez Şube, İstanbul',
    billingAddress: 'ABC Market Merkez Şube, İstanbul',
    preferredDate1: dayjs().add(2, 'day').format(),
    assignedTo: '2',
    createdAt: dayjs().subtract(1, 'day').format(),
    updatedAt: dayjs().subtract(1, 'day').format(),
  },
  {
    id: '2',
    type: 'maintenance',
    priority: 'medium',
    status: 'inProgress',
    summary: 'Buzdolabı tamiri',
    dueDate: dayjs().add(5, 'day').format(),
    company: '2',
    contact: '2',
    email: 'info@xyzmagaza.com',
    phone: '0216 555 0002',
    mobile: '0533 555 0002',
    serviceAddress: 'XYZ Mağazası Ana Cadde Şubesi, Ankara',
    billingAddress: 'XYZ Mağazası Ana Cadde Şubesi, Ankara',
    preferredDate1: dayjs().add(4, 'day').format(),
    assignedTo: '3',
    createdAt: dayjs().subtract(2, 'day').format(),
    updatedAt: dayjs().subtract(2, 'day').format(),
  }
];

// Mock kullanıcılar
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@meser.com.tr',
    phone: '0532 123 4567',
    roles: ['user'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@arveta.com.tr',
    phone: '0533 765 4321',
    roles: ['user'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@noord.com.tr',
    phone: '0532 987 6543',
    roles: ['user'],
    status: 'active',
    region: 'Şişli',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// API fonksiyonları
export const customerAPI = {
  getCustomers: async (): Promise<Customer[]> => {
    // Simüle edilmiş API gecikmesi
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCustomers;
  },

  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCustomers.find(customer => customer.id === id);
  },

  createCustomer: async (data: CustomerFormData): Promise<Customer> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCustomer: Customer = {
      id: String(mockCustomers.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  updateCustomer: async (id: string, data: Partial<CustomerFormData>): Promise<Customer> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockCustomers.findIndex(customer => customer.id === id);
    if (index === -1) throw new Error('Müşteri bulunamadı');
    
    mockCustomers[index] = {
      ...mockCustomers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockCustomers[index];
  },

  deleteCustomer: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockCustomers.findIndex(customer => customer.id === id);
    if (index === -1) throw new Error('Müşteri bulunamadı');
    mockCustomers.splice(index, 1);
  },
};

export const userAPI = {
  getUsers: async (): Promise<User[]> => {
    // Simüle edilmiş API gecikmesi
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers.find(user => user.id === id);
  },

  createUser: async (data: UserFormData): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, data: Partial<UserFormData>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('Kullanıcı bulunamadı');
    
    mockUsers[index] = {
      ...mockUsers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockUsers[index];
  },

  deleteUser: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('Kullanıcı bulunamadı');
    mockUsers.splice(index, 1);
  },
};

export const storeAPI = {
  getStores: async (): Promise<Store[]> => {
    const response = await api.get('/stores');
    return response.data;
  },

  getStoreById: async (id: string): Promise<Store> => {
    const response = await api.get(`/stores/${id}`);
    return response.data;
  },

  createStore: async (data: StoreFormData): Promise<Store> => {
    const response = await api.post('/stores', data);
    return response.data;
  },

  updateStore: async (id: string, data: Partial<StoreFormData>): Promise<Store> => {
    const response = await api.put(`/stores/${id}`, data);
    return response.data;
  },

  deleteStore: async (id: string): Promise<void> => {
    await api.delete(`/stores/${id}`);
  },
};

export const workOrderAPI = {
  getWorkOrders: async (): Promise<WorkOrder[]> => {
    const response = await api.get('/work-orders');
    return response.data;
  },

  getWorkOrderById: async (id: string): Promise<WorkOrder> => {
    const response = await api.get(`/work-orders/${id}`);
    return response.data;
  },

  createWorkOrder: async (data: WorkOrderFormData): Promise<WorkOrder> => {
    const response = await api.post('/work-orders', data);
    return response.data;
  },

  updateWorkOrder: async (id: string, data: Partial<WorkOrderFormData>): Promise<WorkOrder> => {
    const response = await api.put(`/work-orders/${id}`, data);
    return response.data;
  },

  deleteWorkOrder: async (id: string): Promise<void> => {
    await api.delete(`/work-orders/${id}`);
  },
}; 