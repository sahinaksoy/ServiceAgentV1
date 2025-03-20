import { http, HttpResponse } from 'msw';
import { User, UserFormData } from '../../types/user';

const users: User[] = [
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
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z'
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
    createdAt: '2024-01-02T10:00:00.000Z',
    updatedAt: '2024-01-02T10:00:00.000Z'
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
    createdAt: '2024-01-03T10:00:00.000Z',
    updatedAt: '2024-01-03T10:00:00.000Z'
  },
  {
    id: '4',
    firstName: 'Fatma',
    lastName: 'Şahin',
    email: 'fatma@example.com',
    phone: '5551234570',
    roles: ['mudur'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: '2024-01-04T10:00:00.000Z',
    updatedAt: '2024-01-04T10:00:00.000Z'
  },
  {
    id: '5',
    firstName: 'Ali',
    lastName: 'Öztürk',
    email: 'ali@example.com',
    phone: '5551234571',
    roles: ['yonetici'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Arveta',
    createdAt: '2024-01-05T10:00:00.000Z',
    updatedAt: '2024-01-05T10:00:00.000Z'
  },
  {
    id: '6',
    firstName: 'Can',
    lastName: 'Yıldız',
    email: 'can@example.com',
    phone: '5551234572',
    roles: ['taseron_saha_calisani'],
    status: 'active',
    region: 'Şişli',
    company: 'Noord',
    createdAt: '2024-01-06T10:00:00.000Z',
    updatedAt: '2024-01-06T10:00:00.000Z'
  },
  {
    id: '7',
    firstName: 'Zeynep',
    lastName: 'Aksoy',
    email: 'zeynep@example.com',
    phone: '5551234573',
    roles: ['taseron_ekip_sefi'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: '2024-01-07T10:00:00.000Z',
    updatedAt: '2024-01-07T10:00:00.000Z'
  }
];

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json() as UserFormData;
    const user: User = {
      id: String(users.length + 1),
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(user);
    return HttpResponse.json(user);
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json() as UserFormData;
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    users[userIndex] = updatedUser;
    return HttpResponse.json(updatedUser);
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    users.splice(userIndex, 1);
    return new HttpResponse(null, { status: 204 });
  })
];
