import { http, HttpResponse } from 'msw';
import { Customer } from '../types/customer';
import { User, UserFormData } from '../types/user';
import { Store, StoreFormData } from '../types/store';
import { WorkOrder, WorkOrderFormData } from '../types/workOrder';
import dayjs from 'dayjs';

let customers: Customer[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '5551234567',
    address: 'İstanbul, Türkiye',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '5559876543',
    address: 'Ankara, Türkiye',
  },
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
    id: '1',
    name: 'Kadıköy Mağazası',
    address: 'Caferağa Mah. Moda Cad. No: 123 Kadıköy/İstanbul',
    phone: '5551234567',
    email: 'kadikoy@example.com',
    region: 'Kadıköy',
    company: 'Meser',
    status: 'active',
    manager: 'Ahmet Yılmaz',
    employeeCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Beşiktaş Mağazası',
    address: 'Sinanpaşa Mah. Beşiktaş Cad. No: 45 Beşiktaş/İstanbul',
    phone: '5559876543',
    email: 'besiktas@example.com',
    region: 'Beşiktaş',
    company: 'Arveta',
    status: 'active',
    manager: 'Ayşe Demir',
    employeeCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let workOrders: WorkOrder[] = [
  {
    id: '1',
    type: 'emergency',
    category: 'mechanical',
    priority: 'high',
    status: 'pending',
    summary: 'Klima arızası acil müdahale gerekiyor',
    dueDate: dayjs().add(1, 'day').format(),
    company: '1',
    contact: '1',
    email: 'john@example.com',
    phone: '5551234567',
    mobile: '5551234568',
    serviceAddress: 'İstanbul, Kadıköy',
    billingAddress: 'İstanbul, Kadıköy',
    preferredDate1: dayjs().add(1, 'day').format(),
    assignedTo: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'maintenance',
    category: 'electrical',
    priority: 'medium',
    status: 'approved',
    summary: 'Elektrik tesisatı yıllık bakım',
    dueDate: dayjs().add(5, 'day').format(),
    company: '2',
    contact: '2',
    email: 'jane@example.com',
    phone: '5559876543',
    mobile: '5559876544',
    serviceAddress: 'Ankara, Çankaya',
    billingAddress: 'Ankara, Çankaya',
    preferredDate1: dayjs().add(3, 'day').format(),
    assignedTo: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    type: 'renovation',
    category: 'mechanical',
    priority: 'low',
    status: 'inProgress',
    summary: 'Isıtma sistemi yenileme',
    dueDate: dayjs().add(10, 'day').format(),
    company: '1',
    contact: '1',
    email: 'john@example.com',
    phone: '5551234567',
    mobile: '5551234568',
    serviceAddress: 'İzmir, Konak',
    billingAddress: 'İzmir, Konak',
    preferredDate1: dayjs().add(7, 'day').format(),
    assignedTo: '3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    type: 'additional',
    category: 'electrical',
    priority: 'medium',
    status: 'completed',
    summary: 'Aydınlatma sistemi ek montaj',
    dueDate: dayjs().subtract(2, 'day').format(),
    company: '2',
    contact: '2',
    email: 'jane@example.com',
    phone: '5559876543',
    mobile: '5559876544',
    serviceAddress: 'Bursa, Nilüfer',
    billingAddress: 'Bursa, Nilüfer',
    preferredDate1: dayjs().subtract(3, 'day').format(),
    assignedTo: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    type: 'investment',
    category: 'electrical',
    priority: 'high',
    status: 'pending',
    summary: 'Yeni elektrik altyapısı kurulumu',
    dueDate: dayjs().add(15, 'day').format(),
    company: '1',
    contact: '1',
    email: 'john@example.com',
    phone: '5551234567',
    mobile: '5551234568',
    serviceAddress: 'Antalya, Muratpaşa',
    billingAddress: 'Antalya, Muratpaşa',
    preferredDate1: dayjs().add(10, 'day').format(),
    assignedTo: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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