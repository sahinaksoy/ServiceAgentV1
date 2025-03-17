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
    roles: ['meser_team_lead'],
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
    roles: ['meser_employee'],
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
    roles: ['meser_employee'],
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
    roles: ['contractor_employee'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
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
    id: '1',
    type: 'emergency',
    category: 'mechanical',
    priority: 'high',
    status: 'pool',
    summary: 'Soğuk oda derece yüksek sorunu',
    dueDate: dayjs().add(1, 'day').toISOString(),
    store: '4001 MMM FUAYE ISTANBUL',
    contact: 'Mağaza Müdürü',
    email: 'fuaye@migros.com.tr',
    phone: '5551234567',
    mobile: '5551234567',
    serviceAddress: 'MMM Fuaye İstanbul',
    billingAddress: 'MMM Fuaye İstanbul',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '',
    createdAt: dayjs().subtract(2, 'hour').toISOString(),
    updatedAt: dayjs().subtract(2, 'hour').toISOString()
  },
  {
    id: '2',
    type: 'maintenance',
    category: 'mechanical',
    priority: 'medium',
    status: 'inProgress',
    summary: 'Şarküteri odası otomatik çalışmıyor',
    dueDate: dayjs().add(2, 'day').toISOString(),
    store: 'Dudullu Toptan',
    contact: 'Mağaza Yetkilisi',
    email: 'dudullu@migros.com.tr',
    phone: '5552345678',
    mobile: '5552345678',
    serviceAddress: 'Dudullu Toptan Mağaza',
    billingAddress: 'Dudullu Toptan Mağaza',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '1',
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(12, 'hour').toISOString()
  },
  {
    id: '3',
    type: 'emergency',
    category: 'electrical',
    priority: 'high',
    status: 'waitingForCompletion',
    summary: 'Ada hizmet bağlantı sorunu ve sigorta problemi',
    dueDate: dayjs().add(1, 'day').toISOString(),
    store: 'Caddebostan Plajyolu Macro',
    contact: 'Teknik Sorumlu',
    email: 'caddebostan@migros.com.tr',
    phone: '5553456789',
    mobile: '5553456789',
    serviceAddress: 'Caddebostan Plajyolu Macro',
    billingAddress: 'Caddebostan Plajyolu Macro',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '2',
    createdAt: dayjs().subtract(6, 'hour').toISOString(),
    updatedAt: dayjs().subtract(1, 'hour').toISOString()
  },
  {
    id: '4',
    type: 'maintenance',
    category: 'mechanical',
    priority: 'medium',
    status: 'pool',
    summary: 'Dolap fanlarında paslanma ve temizlik ihtiyacı',
    dueDate: dayjs().add(3, 'day').toISOString(),
    store: 'MM Sebze Meyve',
    contact: 'Reyon Sorumlusu',
    email: 'mmsebze@migros.com.tr',
    phone: '5554567890',
    mobile: '5554567890',
    serviceAddress: 'MM Sebze Meyve Mağazası',
    billingAddress: 'MM Sebze Meyve Mağazası',
    preferredDate1: dayjs().add(1, 'day').toISOString(),
    assignedTo: '',
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString()
  },
  {
    id: '5',
    type: 'emergency',
    category: 'electrical',
    priority: 'high',
    status: 'inProgress',
    summary: 'Merkezi sistem bağlantı ve derece problemi',
    dueDate: dayjs().add(1, 'day').toISOString(),
    store: 'Göztepe MM',
    contact: 'Teknik Ekip',
    email: 'goztepe@migros.com.tr',
    phone: '5555678901',
    mobile: '5555678901',
    serviceAddress: 'Göztepe MM Mağaza',
    billingAddress: 'Göztepe MM Mağaza',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '1',
    createdAt: dayjs().subtract(4, 'hour').toISOString(),
    updatedAt: dayjs().subtract(2, 'hour').toISOString()
  },
  {
    id: '6',
    type: 'emergency',
    category: 'mechanical',
    priority: 'high',
    status: 'pool',
    summary: 'Unlu mamüller soğuk hava deposu buzlanma ve su akıtma',
    dueDate: dayjs().add(1, 'day').toISOString(),
    store: 'MM Unlu Mamüller',
    contact: 'Mağaza Müdürü',
    email: 'mmunlu@migros.com.tr',
    phone: '5556789012',
    mobile: '5556789012',
    serviceAddress: 'MM Unlu Mamüller Mağaza',
    billingAddress: 'MM Unlu Mamüller Mağaza',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '',
    createdAt: dayjs().subtract(8, 'hour').toISOString(),
    updatedAt: dayjs().subtract(8, 'hour').toISOString()
  },
  {
    id: '7',
    type: 'maintenance',
    category: 'electrical',
    priority: 'medium',
    status: 'pool',
    summary: 'QR kod eksikliği ve sistem izleme problemi',
    dueDate: dayjs().add(2, 'day').toISOString(),
    store: 'MM Kasap',
    contact: 'Reyon Sorumlusu',
    email: 'mmkasap@migros.com.tr',
    phone: '5557890123',
    mobile: '5557890123',
    serviceAddress: 'MM Kasap Reyonu',
    billingAddress: 'MM Kasap Reyonu',
    preferredDate1: dayjs().add(1, 'day').toISOString(),
    assignedTo: '',
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString()
  },
  {
    id: '8',
    type: 'emergency',
    category: 'mechanical',
    priority: 'high',
    status: 'waitingForAssignment',
    summary: 'Sütlük dolabı derece yüksek',
    dueDate: dayjs().add(1, 'day').toISOString(),
    store: 'Mjet Ziverbey',
    contact: 'Mağaza Müdürü',
    email: 'ziverbey@migros.com.tr',
    phone: '5551112233',
    mobile: '5551112233',
    serviceAddress: 'Mjet Ziverbey Mağaza',
    billingAddress: 'Mjet Ziverbey Mağaza',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '2',
    createdAt: dayjs().subtract(3, 'hour').toISOString(),
    updatedAt: dayjs().subtract(3, 'hour').toISOString()
  },
  {
    id: '9',
    type: 'emergency',
    category: 'electrical',
    priority: 'high',
    status: 'waitingForAssignment',
    summary: 'Merkezi sistem sigortası atıyor',
    dueDate: dayjs().add(1, 'day').toISOString(),
    store: 'Mazharbey M',
    contact: 'Teknik Sorumlu',
    email: 'mazharbey@migros.com.tr',
    phone: '5552223344',
    mobile: '5552223344',
    serviceAddress: 'Mazharbey M Mağaza',
    billingAddress: 'Mazharbey M Mağaza',
    preferredDate1: dayjs().toISOString(),
    assignedTo: '1',
    createdAt: dayjs().subtract(5, 'hour').toISOString(),
    updatedAt: dayjs().subtract(5, 'hour').toISOString()
  },
  {
    id: '10',
    type: 'maintenance',
    category: 'mechanical',
    priority: 'medium',
    status: 'waitingForAssignment',
    summary: 'Unlu mamüller oda kapı switch arızası',
    dueDate: dayjs().add(2, 'day').toISOString(),
    store: 'MM Kozzy',
    contact: 'Reyon Sorumlusu',
    email: 'kozzy@migros.com.tr',
    phone: '5553334455',
    mobile: '5553334455',
    serviceAddress: 'MM Kozzy Mağaza',
    billingAddress: 'MM Kozzy Mağaza',
    preferredDate1: dayjs().add(1, 'day').toISOString(),
    assignedTo: '2',
    createdAt: dayjs().subtract(7, 'hour').toISOString(),
    updatedAt: dayjs().subtract(7, 'hour').toISOString()
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
    const newWorkOrder: WorkOrder = {
      ...workOrderData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    workOrders.push(newWorkOrder);
    return HttpResponse.json(newWorkOrder, { status: 201 });
  }),

  http.put('/api/work-orders/:id', async ({ params, request }) => {
    const { id } = params;
    const workOrderData = (await request.json()) as WorkOrderFormData;
    const workOrderIndex = workOrders.findIndex(wo => wo.id === id);

    if (workOrderIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedWorkOrder: WorkOrder = {
      ...workOrders[workOrderIndex],
      ...workOrderData,
      updatedAt: new Date().toISOString(),
    };

    workOrders[workOrderIndex] = updatedWorkOrder;
    return HttpResponse.json(updatedWorkOrder);
  }),

  http.delete('/api/work-orders/:id', ({ params }) => {
    const { id } = params;
    const workOrderIndex = workOrders.findIndex(wo => wo.id === id);

    if (workOrderIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    workOrders = workOrders.filter(wo => wo.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
]; 