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
    name: 'Bostancı 3M Migros',
    email: 'bostanci@migros.com.tr',
    phone: '5551234567',
    address: 'Bostancı Mah. Kadıköy, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Moda MM Migros',
    email: 'moda@migros.com.tr',
    phone: '5559876543',
    address: 'Moda Cad. Kadıköy, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ataşehir Makro Migros',
    email: 'atasehir@migros.com.tr',
    phone: '5553456789',
    address: 'Ataşehir Bulvarı, Ataşehir, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Levent 5M Migros',
    email: 'levent@migros.com.tr',
    phone: '5557891234',
    address: 'Levent Mah. Beşiktaş, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Beylikdüzü MM Migros',
    email: 'beylikduzu@migros.com.tr',
    phone: '5552345678',
    address: 'Beylikdüzü Mah. Beylikdüzü, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Bakırköy 3M Migros',
    email: 'bakirkoy@migros.com.tr',
    phone: '5558765432',
    address: 'Bakırköy Mah. Bakırköy, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Maltepe Makro Migros',
    email: 'maltepe@migros.com.tr',
    phone: '5554567890',
    address: 'Maltepe Mah. Maltepe, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Üsküdar MM Migros',
    email: 'uskudar@migros.com.tr',
    phone: '5556789012',
    address: 'Üsküdar Mah. Üsküdar, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Şişli 3M Migros',
    email: 'sisli@migros.com.tr',
    phone: '5550123456',
    address: 'Şişli Mah. Şişli, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Beşiktaş MM Migros',
    email: 'besiktas@migros.com.tr',
    phone: '5559012345',
    address: 'Beşiktaş Mah. Beşiktaş, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Eski müşteriler
  {
    id: '11',
    name: 'Meser Teknoloji',
    email: 'info@meser.com.tr',
    phone: '0212 555 1234',
    address: 'Kadıköy, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'Arveta',
    email: 'info@arveta.com.tr',
    phone: '0216 444 5678',
    address: 'Beşiktaş, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '13',
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
    category: 'mechanical',
    priority: 'high',
    status: 'pending',
    summary: 'Klima bakımı yapılacak',
    dueDate: dayjs().add(3, 'day').format(),
    store: '1',
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
    category: 'electrical',
    priority: 'medium',
    status: 'inProgress',
    summary: 'Buzdolabı tamiri',
    dueDate: dayjs().add(5, 'day').format(),
    store: '2',
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
    phone: '5551234567',
    roles: ['director'],
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
    email: 'ayse.demir@meser.com.tr',
    phone: '5559876543',
    roles: ['team_lead'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@noord.com.tr',
    phone: '5554567890',
    roles: ['contractor_manager'],
    status: 'active',
    region: 'Şişli',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    firstName: 'Zeynep',
    lastName: 'Şahin',
    email: 'zeynep.sahin@meser.com.tr',
    phone: '5553334444',
    roles: ['monitoring_unit'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    firstName: 'Can',
    lastName: 'Öztürk',
    email: 'can.ozturk@meser.com.tr',
    phone: '5552223333',
    roles: ['field_employee'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    firstName: 'Elif',
    lastName: 'Yıldız',
    email: 'elif.yildiz@noord.com.tr',
    phone: '5551112222',
    roles: ['contractor_employee'],
    status: 'active',
    region: 'Şişli',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    firstName: 'Murat',
    lastName: 'Aydın',
    email: 'murat.aydin@meser.com.tr',
    phone: '5557778888',
    roles: ['field_employee', 'engineer'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    firstName: 'Selin',
    lastName: 'Arslan',
    email: 'selin.arslan@noord.com.tr',
    phone: '5559990000',
    roles: ['contractor_employee', 'engineer'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    firstName: 'Burak',
    lastName: 'Yılmaz',
    email: 'burak.yilmaz@meser.com.tr',
    phone: '5553332211',
    roles: ['manager'],
    status: 'active',
    region: 'Şişli',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock mağazalar
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Bostancı 3M Migros',
    address: 'Bostancı Mah. Kadıköy, İstanbul',
    phone: '0216 555 1234',
    email: 'bostanci@migros.com.tr',
    region: 'Kadıköy',
    company: 'Migros',
    status: 'active',
    authorizedName: 'Ali Yıldırım',
    authorizedPhone: '0532 111 1111',
    employeeCount: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Moda MM Migros',
    address: 'Moda Cad. Kadıköy, İstanbul',
    phone: '0216 555 2345',
    email: 'moda@migros.com.tr',
    region: 'Kadıköy',
    company: 'Migros',
    status: 'active',
    authorizedName: 'Ayşe Çelik',
    authorizedPhone: '0532 222 2222',
    employeeCount: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ataşehir Makro Migros',
    address: 'Ataşehir Bulvarı, Ataşehir, İstanbul',
    phone: '0216 555 3456',
    email: 'atasehir@migros.com.tr',
    region: 'Ataşehir',
    company: 'Migros',
    status: 'maintenance',
    authorizedName: 'Mehmet Demir',
    authorizedPhone: '0532 333 3333',
    employeeCount: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Levent 5M Migros',
    address: 'Levent Mah. Beşiktaş, İstanbul',
    phone: '0212 555 4567',
    email: 'levent@migros.com.tr',
    region: 'Beşiktaş',
    company: 'Migros',
    status: 'active',
    authorizedName: 'Zeynep Kaya',
    authorizedPhone: '0532 444 4444',
    employeeCount: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Beylikdüzü MM Migros',
    address: 'Beylikdüzü Mah. Beylikdüzü, İstanbul',
    phone: '0212 555 5678',
    email: 'beylikduzu@migros.com.tr',
    region: 'Beylikdüzü',
    company: 'Migros',
    status: 'inactive',
    authorizedName: 'Can Yılmaz',
    authorizedPhone: '0532 555 5555',
    employeeCount: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Bakırköy 3M Migros',
    address: 'Bakırköy Mah. Bakırköy, İstanbul',
    phone: '0212 555 6789',
    email: 'bakirkoy@migros.com.tr',
    region: 'Bakırköy',
    company: 'Migros',
    status: 'active',
    authorizedName: 'Selin Öztürk',
    authorizedPhone: '0532 666 6666',
    employeeCount: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Maltepe Makro Migros',
    address: 'Maltepe Mah. Maltepe, İstanbul',
    phone: '0216 555 7890',
    email: 'maltepe@migros.com.tr',
    region: 'Maltepe',
    company: 'Migros',
    status: 'active',
    authorizedName: 'Burak Aydın',
    authorizedPhone: '0532 777 7777',
    employeeCount: 55,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Üsküdar MM Migros',
    address: 'Üsküdar Mah. Üsküdar, İstanbul',
    phone: '0216 555 8901',
    email: 'uskudar@migros.com.tr',
    region: 'Üsküdar',
    company: 'Migros',
    status: 'maintenance',
    authorizedName: 'Elif Şahin',
    authorizedPhone: '0532 888 8888',
    employeeCount: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// API fonksiyonları
export const customerAPI = {
  getCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await api.get('/customers');
      // API yanıtının bir dizi olduğundan emin olalım
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('API yanıtı bir dizi değil:', response.data);
        return []; // Boş dizi döndür
      }
    } catch (error) {
      console.error('Müşteriler alınırken hata oluştu:', error);
      return []; // Hata durumunda boş dizi döndür
    }
  },

  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Müşteri (ID: ${id}) alınırken hata oluştu:`, error);
      return undefined;
    }
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
    // Simüle edilmiş API gecikmesi
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStores;
  },

  getStoreById: async (id: string): Promise<Store | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStores.find(store => store.id === id);
  },

  createStore: async (data: StoreFormData): Promise<Store> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newStore: Store = {
      id: String(mockStores.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockStores.push(newStore);
    return newStore;
  },

  updateStore: async (id: string, data: Partial<StoreFormData>): Promise<Store> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockStores.findIndex(store => store.id === id);
    if (index === -1) throw new Error('Mağaza bulunamadı');
    
    mockStores[index] = {
      ...mockStores[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockStores[index];
  },

  deleteStore: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockStores.findIndex(store => store.id === id);
    if (index === -1) throw new Error('Mağaza bulunamadı');
    mockStores.splice(index, 1);
  },
};

export const workOrderAPI = {
  getWorkOrders: async (): Promise<WorkOrder[]> => {
    try {
      const response = await api.get('/work-orders');
      // API yanıtının bir dizi olduğundan emin olalım
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('API yanıtı bir dizi değil:', response.data);
        return []; // Boş dizi döndür
      }
    } catch (error) {
      console.error('İş emirleri alınırken hata oluştu:', error);
      return []; // Hata durumunda boş dizi döndür
    }
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