import axios from 'axios';
import { Customer, CustomerFormData } from '../types/customer';
import { User, UserFormData } from '../types/user';
import { Store, StoreFormData } from '../types/store';
import { WorkOrder } from '../types/workOrder';
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
    mobile: '5551234567',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5559876543',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5553456789',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5557891234',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5552345678',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5558765432',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5554567890',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5556789012',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5550123456',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5559012345',
    contactPerson: 'Migros Yöneticisi',
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
    mobile: '5551234567',
    contactPerson: 'Ahmet Yılmaz',
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
    mobile: '5559876543',
    contactPerson: 'Ayşe Demir',
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
    mobile: '5554567890',
    contactPerson: 'Mehmet Kaya',
    address: 'Şişli, İstanbul',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock iş emirleri
const getInitialWorkOrders = (): WorkOrder[] => {
  const storedWorkOrders = localStorage.getItem('mockWorkOrders');
  if (storedWorkOrders) {
    return JSON.parse(storedWorkOrders);
  }
  
  const initialWorkOrders: WorkOrder[] = [
    {
      id: 1,
      summary: 'Klima bakımı yapılacak',
      type: 'emergency',
      category: 'mechanical',
      priority: 'high',
      status: 'pending',
      dueDate: dayjs().add(3, 'day').format(),
      createdAt: dayjs().subtract(1, 'day').format(),
      updatedAt: dayjs().subtract(1, 'day').format(),
      company: {
        id: '1',
        name: 'ABC Market',
        contactPerson: 'John Doe',
        email: 'info@abcmarket.com',
        mobile: '0532 555 0001',
        address: 'ABC Market Merkez Şube, İstanbul'
      },
      assignedTo: {
        id: '2',
        firstName: 'Ayşe',
        lastName: 'Demir',
        email: 'ayse.demir@arveta.com.tr',
        status: 'active'
      },
      services: [],
      parts: [],
      totalAmount: 0,
      totalDuration: 0
    },
    {
      id: 2,
      summary: 'Buzdolabı tamiri',
      type: 'maintenance',
      category: 'electrical',
      priority: 'medium',
      status: 'in_progress',
      dueDate: dayjs().add(5, 'day').format(),
      createdAt: dayjs().subtract(2, 'day').format(),
      updatedAt: dayjs().subtract(2, 'day').format(),
      company: {
        id: '2',
        name: 'XYZ Mağazası',
        contactPerson: 'Jane Smith',
        email: 'info@xyzmagaza.com',
        mobile: '0533 555 0002',
        address: 'XYZ Mağazası Ana Cadde Şubesi, Ankara'
      },
      assignedTo: {
        id: '3',
        firstName: 'Mehmet',
        lastName: 'Kaya',
        email: 'mehmet.kaya@noord.com.tr',
        status: 'active'
      },
      services: [],
      parts: [],
      totalAmount: 0,
      totalDuration: 0
    },
    {
      id: 3,
      summary: 'Elektrik tesisatı kontrolü',
      type: 'maintenance',
      category: 'electrical',
      priority: 'medium',
      status: 'pool',
      dueDate: dayjs().add(7, 'day').format(),
      createdAt: dayjs().subtract(1, 'day').format(),
      updatedAt: dayjs().subtract(1, 'day').format(),
      company: {
        id: '3',
        name: 'DEF Mağazası',
        contactPerson: 'Ali Yılmaz',
        email: 'info@defmagaza.com',
        mobile: '0534 555 0003',
        address: 'DEF Mağazası Merkez Şube, İzmir'
      },
      assignedTo: null,
      services: [],
      parts: [],
      totalAmount: 0,
      totalDuration: 0
    }
  ];

  localStorage.setItem('mockWorkOrders', JSON.stringify(initialWorkOrders));
  return initialWorkOrders;
};

let mockWorkOrders = getInitialWorkOrders();

// Mock kullanıcılar
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@meser.com.tr',
    phone: '0532 123 4567',
    roles: ['saha_calisani', 'ekip_sefi'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@arveta.com.tr',
    phone: '0533 765 4321',
    roles: ['muhendis', 'yonetici'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@noord.com.tr',
    phone: '0532 987 6543',
    roles: ['taseron_saha_calisani', 'taseron_ekip_sefi'],
    status: 'active',
    region: 'Şişli',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    firstName: 'Fatma',
    lastName: 'Şahin',
    email: 'fatma.sahin@meser.com.tr',
    phone: '0533 234 5678',
    roles: ['saha_calisani'],
    status: 'active',
    region: 'Üsküdar',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    firstName: 'Ali',
    lastName: 'Öztürk',
    email: 'ali.ozturk@arveta.com.tr',
    phone: '0532 345 6789',
    roles: ['muhendis'],
    status: 'active',
    region: 'Maltepe',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    firstName: 'Zeynep',
    lastName: 'Çelik',
    email: 'zeynep.celik@noord.com.tr',
    phone: '0533 456 7890',
    roles: ['taseron_saha_calisani'],
    status: 'active',
    region: 'Ataşehir',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    firstName: 'Mustafa',
    lastName: 'Aydın',
    email: 'mustafa.aydin@meser.com.tr',
    phone: '0532 567 8901',
    roles: ['ekip_sefi'],
    status: 'active',
    region: 'Kartal',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    firstName: 'Elif',
    lastName: 'Yıldız',
    email: 'elif.yildiz@arveta.com.tr',
    phone: '0533 678 9012',
    roles: ['yonetici'],
    status: 'active',
    region: 'Pendik',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '9',
    firstName: 'Can',
    lastName: 'Aksoy',
    email: 'can.aksoy@noord.com.tr',
    phone: '0532 789 0123',
    roles: ['taseron_ekip_sefi'],
    status: 'active',
    region: 'Bakırköy',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '10',
    firstName: 'Selin',
    lastName: 'Kara',
    email: 'selin.kara@meser.com.tr',
    phone: '0533 890 1234',
    roles: ['saha_calisani', 'muhendis'],
    status: 'active',
    region: 'Beylikdüzü',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
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
    try {
      const response = await api.get('/stores');
      // API yanıtının bir dizi olduğundan emin olalım
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('API yanıtı bir dizi değil:', response.data);
        return []; // Boş dizi döndür
      }
    } catch (error) {
      console.error('Mağazalar alınırken hata oluştu:', error);
      return []; // Hata durumunda boş dizi döndür
    }
  },

  getStoreById: async (id: string): Promise<Store | undefined> => {
    try {
      const response = await api.get(`/stores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Mağaza (ID: ${id}) alınırken hata oluştu:`, error);
      return undefined;
    }
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
    try {
      const response = await api.get('/work-orders');
      if (Array.isArray(response.data)) {
        return response.data;
      }
      // Mock veriyi localStorage'dan al
      const storedWorkOrders = localStorage.getItem('mockWorkOrders');
      if (storedWorkOrders) {
        const parsedWorkOrders = JSON.parse(storedWorkOrders);
        mockWorkOrders = parsedWorkOrders; // Global mockWorkOrders'ı güncelle
        return parsedWorkOrders;
      }
      return mockWorkOrders;
    } catch (error) {
      console.error('İş emirleri alınırken hata oluştu:', error);
      // Mock veriyi localStorage'dan al
      const storedWorkOrders = localStorage.getItem('mockWorkOrders');
      if (storedWorkOrders) {
        const parsedWorkOrders = JSON.parse(storedWorkOrders);
        mockWorkOrders = parsedWorkOrders; // Global mockWorkOrders'ı güncelle
        return parsedWorkOrders;
      }
      return mockWorkOrders;
    }
  },

  getWorkOrderById: async (id: number): Promise<WorkOrder> => {
    try {
      const response = await api.get(`/work-orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`İş emri (ID: ${id}) alınırken hata oluştu:`, error);
      const workOrder = mockWorkOrders.find(wo => wo.id === id);
      if (!workOrder) throw new Error('İş emri bulunamadı');
      return workOrder;
    }
  },

  createWorkOrder: async (workOrder: WorkOrder): Promise<WorkOrder> => {
    try {
      const response = await api.post('/work-orders', workOrder);
      return response.data;
    } catch (error) {
      console.error('İş emri oluşturulurken hata oluştu:', error);
      // Mock veri oluştur
      const newWorkOrder = {
        ...workOrder,
        id: mockWorkOrders.length + 1,
      };
      mockWorkOrders.push(newWorkOrder);
      return newWorkOrder;
    }
  },

  updateWorkOrder: async (id: number, workOrder: Partial<WorkOrder>): Promise<WorkOrder> => {
    try {
      // Mock veriyi güncelle
      const index = mockWorkOrders.findIndex(wo => wo.id === id);
      
      // İş emri bulunamazsa yeni bir iş emri oluştur
      if (index === -1) {
        const newWorkOrder: WorkOrder = {
          id: id,
          summary: workOrder.summary || 'Yeni İş Emri',
          type: workOrder.type || 'maintenance',
          category: workOrder.category || 'mechanical',
          priority: workOrder.priority || 'medium',
          status: workOrder.status || 'pending',
          dueDate: workOrder.dueDate || dayjs().add(7, 'day').format(),
          company: workOrder.company || {
            id: '1',
            name: 'Yeni Şirket',
            contactPerson: 'İletişim Kişisi',
            email: 'info@example.com',
            mobile: '0500 000 0000',
            address: 'Adres'
          },
          assignedTo: workOrder.assignedTo ? {
            ...workOrder.assignedTo,
            id: workOrder.assignedTo.id,
            firstName: workOrder.assignedTo.firstName,
            lastName: workOrder.assignedTo.lastName,
            email: workOrder.assignedTo.email,
            status: workOrder.assignedTo.status
          } : null,
          services: workOrder.services || [],
          parts: workOrder.parts || [],
          totalAmount: workOrder.totalAmount || 0,
          totalDuration: workOrder.totalDuration || 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Yeni diziyi oluştur ve localStorage'a kaydet
        const newWorkOrders = [...mockWorkOrders, newWorkOrder];
        mockWorkOrders = newWorkOrders;
        localStorage.setItem('mockWorkOrders', JSON.stringify(newWorkOrders));
        
        return { ...newWorkOrder }; // Yeni referans döndür
      }
      
      // Mevcut iş emrini güncelle
      const updatedWorkOrder: WorkOrder = {
        ...mockWorkOrders[index],
        ...workOrder,
        id: id,
        updatedAt: new Date().toISOString(),
        assignedTo: workOrder.assignedTo ? {
          ...workOrder.assignedTo,
          id: workOrder.assignedTo.id,
          firstName: workOrder.assignedTo.firstName,
          lastName: workOrder.assignedTo.lastName,
          email: workOrder.assignedTo.email,
          status: workOrder.assignedTo.status
        } : null
      };
      
      // Yeni diziyi oluştur ve localStorage'a kaydet
      const updatedWorkOrders = [...mockWorkOrders];
      updatedWorkOrders[index] = updatedWorkOrder;
      mockWorkOrders = updatedWorkOrders;
      localStorage.setItem('mockWorkOrders', JSON.stringify(updatedWorkOrders));
      
      // API çağrısını simüle et
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { ...updatedWorkOrder }; // Yeni referans döndür
    } catch (error) {
      console.error('İş emri güncellenirken hata oluştu:', error);
      throw error;
    }
  },

  deleteWorkOrder: async (id: number): Promise<void> => {
    try {
      await api.delete(`/work-orders/${id}`);
    } catch (error) {
      console.error('İş emri silinirken hata oluştu:', error);
      // Mock veriyi sil
      const index = mockWorkOrders.findIndex(wo => wo.id === id);
      if (index === -1) throw new Error('İş emri bulunamadı');
      mockWorkOrders.splice(index, 1);
    }
  }
}; 