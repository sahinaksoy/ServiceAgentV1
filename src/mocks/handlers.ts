import { http, HttpResponse } from 'msw';
import { Customer } from '../types/customer';
import { User, UserFormData } from '../types/user';
import { Store, StoreFormData } from '../types/store';
import { WorkOrder, WorkOrderFormData } from '../types/workOrder';
import dayjs from 'dayjs';

let customers: Customer[] = [
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
  }
];

let users: User[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '5551234567',
    roles: ['admin'],
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
    email: 'ayse.demir@example.com',
    phone: '5559876543',
    roles: ['manager'],
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
    email: 'mehmet.kaya@example.com',
    phone: '5554567890',
    roles: ['user'],
    status: 'inactive',
    region: 'Şişli',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let stores: Store[] = [
  {
    id: '3',
    name: 'Bostancı 3M Migros',
    address: 'Bostancı Mah. Kadıköy, İstanbul',
    phone: '5551234567',
    email: 'bostanci@migros.com.tr',
    region: 'Kadıköy',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Moda MM Migros',
    address: 'Moda Cad. Kadıköy, İstanbul',
    phone: '5559876543',
    email: 'moda@migros.com.tr',
    region: 'Kadıköy',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Ataşehir Makro Migros',
    address: 'Ataşehir Bulvarı, Ataşehir, İstanbul',
    phone: '5553456789',
    email: 'atasehir@migros.com.tr',
    region: 'Ataşehir',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Levent 5M Migros',
    address: 'Levent Mah. Beşiktaş, İstanbul',
    phone: '5557891234',
    email: 'levent@migros.com.tr',
    region: 'Beşiktaş',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Beylikdüzü MM Migros',
    address: 'Beylikdüzü Mah. Beylikdüzü, İstanbul',
    phone: '5552345678',
    email: 'beylikduzu@migros.com.tr',
    region: 'Beylikdüzü',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Bakırköy 3M Migros',
    address: 'Bakırköy Mah. Bakırköy, İstanbul',
    phone: '5558765432',
    email: 'bakirkoy@migros.com.tr',
    region: 'Bakırköy',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 22,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Maltepe Makro Migros',
    address: 'Maltepe Mah. Maltepe, İstanbul',
    phone: '5554567890',
    email: 'maltepe@migros.com.tr',
    region: 'Maltepe',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 28,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Üsküdar MM Migros',
    address: 'Üsküdar Mah. Üsküdar, İstanbul',
    phone: '5556789012',
    email: 'uskudar@migros.com.tr',
    region: 'Üsküdar',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 19,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Şişli 3M Migros',
    address: 'Şişli Mah. Şişli, İstanbul',
    phone: '5550123456',
    email: 'sisli@migros.com.tr',
    region: 'Şişli',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 24,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '1',
    name: 'Beşiktaş MM Migros',
    address: 'Beşiktaş Mah. Beşiktaş, İstanbul',
    phone: '5559012345',
    email: 'besiktas@migros.com.tr',
    region: 'Beşiktaş',
    company: 'Migros',
    status: 'active',
    manager: 'Migros Yöneticisi',
    employeeCount: 21,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let workOrders: WorkOrder[] = [
  {
    id: 1,
    summary: 'Klima bakım ve onarım',
    priority: 'high',
    type: 'emergency',
    category: 'mechanical',
    status: 'pending',
    dueDate: dayjs().add(1, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'hour').toISOString(),
    updatedAt: dayjs().subtract(2, 'hour').toISOString(),
    company: {
      id: '3',
      name: 'Ataşehir Makro Migros',
      contactPerson: 'Ali Yılmaz',
      email: 'atasehir@migros.com.tr',
      mobile: '5553456789',
      address: 'Ataşehir Bulvarı, Ataşehir, İstanbul'
    },
    assignedTo: {
      id: '1',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      status: 'active'
    },
    services: [
      {
        id: 1,
        name: 'Klima Genel Kontrol',
        description: 'Klima sisteminin genel kontrolü ve temizliği',
        duration: 60,
        price: 750
      },
      {
        id: 2,
        name: 'Kompresör Bakımı',
        description: 'Klima kompresörünün bakımı ve yağ kontrolü',
        duration: 90,
        price: 1200
      }
    ],
    parts: [
      {
        id: 1,
        name: 'Klima Filtresi',
        description: 'Yüksek performanslı hava filtresi',
        quantity: 2,
        unit: 'adet',
        unitPrice: 250
      },
      {
        id: 2,
        name: 'Kompresör Yağı',
        description: 'Özel klima kompresör yağı',
        quantity: 1,
        unit: 'litre',
        unitPrice: 300
      }
    ],
    totalAmount: 2750,
    totalDuration: 150
  },
  {
    id: 2,
    summary: 'Elektrik tesisatı yenileme',
    priority: 'medium',
    type: 'renovation',
    category: 'electrical',
    status: 'in_progress',
    dueDate: dayjs().add(5, 'day').toISOString(),
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(12, 'hour').toISOString(),
    company: {
      id: '4',
      name: 'Levent 5M Migros',
      contactPerson: 'Mehmet Demir',
      email: 'levent@migros.com.tr',
      mobile: '5557891234',
      address: 'Levent Mah. Beşiktaş, İstanbul'
    },
    assignedTo: {
      id: '2',
      firstName: 'Ayşe',
      lastName: 'Demir',
      email: 'ayse.demir@example.com',
      status: 'active'
    },
    services: [
      {
        id: 3,
        name: 'Kablo Döşeme',
        description: 'Yeni elektrik kablolarının döşenmesi',
        duration: 240,
        price: 3500
      },
      {
        id: 4,
        name: 'Pano Montajı',
        description: 'Yeni elektrik panosunun montajı',
        duration: 120,
        price: 2000
      }
    ],
    parts: [
      {
        id: 3,
        name: 'NYM Kablo',
        description: '3x2.5 NYM Kablo',
        quantity: 100,
        unit: 'metre',
        unitPrice: 15
      },
      {
        id: 4,
        name: 'Elektrik Panosu',
        description: '24 Sigortalı Elektrik Panosu',
        quantity: 1,
        unit: 'adet',
        unitPrice: 1800
      },
      {
        id: 5,
        name: 'Sigorta',
        description: '16A Otomatik Sigorta',
        quantity: 12,
        unit: 'adet',
        unitPrice: 45
      }
    ],
    totalAmount: 8840,
    totalDuration: 360
  },
  {
    id: 3,
    summary: 'Periyodik soğutucu bakımı',
    priority: 'low',
    type: 'maintenance',
    category: 'mechanical',
    status: 'completed',
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '5',
      name: 'Beylikdüzü MM Migros',
      contactPerson: 'Fatma Şahin',
      email: 'beylikduzu@migros.com.tr',
      mobile: '5552345678',
      address: 'Beylikdüzü Mah. Beylikdüzü, İstanbul'
    },
    assignedTo: {
      id: '1',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      status: 'active'
    },
    services: [
      {
        id: 5,
        name: 'Soğutucu Bakımı',
        description: 'Periyodik soğutucu bakımı ve temizlik',
        duration: 120,
        price: 1500
      }
    ],
    parts: [],
    totalAmount: 1500,
    totalDuration: 120
  },
  {
    id: 4,
    summary: 'Acil aydınlatma arızası',
    priority: 'high',
    type: 'emergency',
    category: 'electrical',
    status: 'cancelled',
    dueDate: dayjs().subtract(2, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
    company: {
      id: '6',
      name: 'Bakırköy 3M Migros',
      contactPerson: 'Hasan Kaya',
      email: 'bakirkoy@migros.com.tr',
      mobile: '5558765432',
      address: 'Bakırköy Mah. Bakırköy, İstanbul'
    },
    assignedTo: null,
    services: [],
    parts: [],
    totalAmount: 0,
    totalDuration: 0
  },
  {
    id: 5,
    summary: 'Yeni soğutma sistemi kurulumu',
    priority: 'medium',
    type: 'investment',
    category: 'mechanical',
    status: 'pending',
    dueDate: dayjs().add(10, 'day').toISOString(),
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '7',
      name: 'Maltepe Makro Migros',
      contactPerson: 'Zeynep Aydın',
      email: 'maltepe@migros.com.tr',
      mobile: '5554567890',
      address: 'Maltepe Mah. Maltepe, İstanbul'
    },
    assignedTo: {
      id: '2',
      firstName: 'Ayşe',
      lastName: 'Demir',
      email: 'ayse.demir@example.com',
      status: 'active'
    },
    services: [
      {
        id: 6,
        name: 'Sistem Kurulumu',
        description: 'Yeni soğutma sistemi kurulumu',
        duration: 480,
        price: 8500
      },
      {
        id: 7,
        name: 'Test ve Devreye Alma',
        description: 'Sistemin test edilmesi ve devreye alınması',
        duration: 240,
        price: 3500
      }
    ],
    parts: [
      {
        id: 6,
        name: 'Soğutma Ünitesi',
        description: 'Endüstriyel tip soğutma ünitesi',
        quantity: 1,
        unit: 'adet',
        unitPrice: 25000
      },
      {
        id: 7,
        name: 'Bakır Boru Seti',
        description: 'Soğutma sistemi bakır boru seti',
        quantity: 1,
        unit: 'set',
        unitPrice: 4500
      },
      {
        id: 8,
        name: 'İzolasyon Malzemesi',
        description: 'Boru izolasyon malzemesi',
        quantity: 50,
        unit: 'metre',
        unitPrice: 35
      }
    ],
    totalAmount: 43250,
    totalDuration: 720
  }
];

export const handlers = [
  http.get('/api/customers', () => {
    return HttpResponse.json(customers);
  }),

  http.get('/api/customers/:id', ({ params }) => {
    const customer = customers.find((c) => c.id === Number(params.id));
    if (!customer) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(customer);
  }),

  http.post('/api/customers', async ({ request }) => {
    const newCustomer = await request.json() as Omit<Customer, 'id'>;
    const customer: Customer = {
      ...newCustomer,
      id: Math.max(...customers.map((c) => c.id ?? 0)) + 1,
    };
    customers.push(customer);
    return HttpResponse.json(customer);
  }),

  http.put('/api/customers/:id', async ({ params, request }) => {
    const updatedCustomer = await request.json() as Customer;
    const index = customers.findIndex((c) => c.id === Number(params.id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    customers[index] = { ...updatedCustomer, id: Number(params.id) };
    return HttpResponse.json(customers[index]);
  }),

  http.delete('/api/customers/:id', ({ params }) => {
    const index = customers.findIndex((c) => c.id === Number(params.id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    customers = customers.filter((c) => c.id !== Number(params.id));
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.post('/api/users', async ({ request }) => {
    const userData = (await request.json()) as UserFormData;
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const userData = (await request.json()) as UserFormData;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    return HttpResponse.json(updatedUser);
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    users = users.filter(user => user.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/stores', () => {
    return HttpResponse.json(stores);
  }),

  http.post('/api/stores', async ({ request }) => {
    const storeData = (await request.json()) as StoreFormData;
    const newStore: Store = {
      ...storeData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    stores.push(newStore);
    return HttpResponse.json(newStore, { status: 201 });
  }),

  http.put('/api/stores/:id', async ({ params, request }) => {
    const { id } = params;
    const storeData = (await request.json()) as StoreFormData;
    const storeIndex = stores.findIndex(store => store.id === id);

    if (storeIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedStore: Store = {
      ...stores[storeIndex],
      ...storeData,
      updatedAt: new Date().toISOString(),
    };

    stores[storeIndex] = updatedStore;
    return HttpResponse.json(updatedStore);
  }),

  http.delete('/api/stores/:id', ({ params }) => {
    const { id } = params;
    const storeIndex = stores.findIndex(store => store.id === id);

    if (storeIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    stores = stores.filter(store => store.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/work-orders', () => {
    return HttpResponse.json(workOrders);
  }),

  http.post('/api/work-orders', async ({ request }) => {
    const workOrderData = (await request.json()) as WorkOrderFormData;
    const selectedUser = users.find(user => user.id === workOrderData.assignedTo);
    const selectedCustomer = customers.find(customer => customer.id === workOrderData.company);

    if (!selectedCustomer || !selectedUser) {
      return new HttpResponse(null, { status: 400 });
    }

    const newWorkOrder: WorkOrder = {
      id: Date.now(),
      summary: workOrderData.summary,
      priority: workOrderData.priority,
      type: workOrderData.type,
      category: workOrderData.category,
      status: 'pending',
      dueDate: workOrderData.dueDate,
      company: {
        id: selectedCustomer.id,
        name: selectedCustomer.name,
        contactPerson: workOrderData.contact,
        email: workOrderData.email,
        mobile: workOrderData.mobile,
        address: workOrderData.serviceAddress
      },
      assignedTo: {
        id: selectedUser.id,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        status: selectedUser.status
      },
      services: [],
      parts: [],
      totalAmount: 0,
      totalDuration: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    workOrders.push(newWorkOrder);
    return HttpResponse.json(newWorkOrder, { status: 201 });
  }),

  http.put('/api/work-orders/:id', async ({ params, request }) => {
    const { id } = params;
    const workOrderData = (await request.json()) as WorkOrderFormData;
    const workOrderIndex = workOrders.findIndex(wo => wo.id === Number(id));

    if (workOrderIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const selectedUser = users.find(user => user.id === workOrderData.assignedTo);
    const selectedCustomer = customers.find(customer => customer.id === workOrderData.company);

    if (!selectedCustomer || !selectedUser) {
      return new HttpResponse(null, { status: 400 });
    }

    const updatedWorkOrder: WorkOrder = {
      ...workOrders[workOrderIndex],
      id: Number(id),
      summary: workOrderData.summary,
      priority: workOrderData.priority,
      type: workOrderData.type,
      category: workOrderData.category,
      dueDate: workOrderData.dueDate,
      company: {
        id: selectedCustomer.id,
        name: selectedCustomer.name,
        contactPerson: workOrderData.contact,
        email: workOrderData.email,
        mobile: workOrderData.mobile,
        address: workOrderData.serviceAddress
      },
      assignedTo: {
        id: selectedUser.id,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        status: selectedUser.status
      },
      updatedAt: new Date().toISOString(),
    };

    workOrders[workOrderIndex] = updatedWorkOrder;
    return HttpResponse.json(updatedWorkOrder);
  }),

  http.delete('/api/work-orders/:id', ({ params }) => {
    const { id } = params;
    const workOrderIndex = workOrders.findIndex(wo => wo.id === Number(id));

    if (workOrderIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    workOrders = workOrders.filter(wo => wo.id !== Number(id));
    return new HttpResponse(null, { status: 204 });
  }),
]; 