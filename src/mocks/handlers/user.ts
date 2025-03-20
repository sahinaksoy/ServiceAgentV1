import { http, HttpResponse } from 'msw';

const users = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@example.com',
    phone: '5551234567',
    roles: ['saha_calisani'],
    status: 'active',
    region: 'Kadıköy',
    company: 'Meser',
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z'
  },
  {
    id: '2',
    firstName: 'Mehmet',
    lastName: 'Demir',
    email: 'mehmet@example.com',
    phone: '5551234568',
    roles: ['ekip_sefi', 'muhendis'],
    status: 'active',
    region: 'Beşiktaş',
    company: 'Arveta',
    createdAt: '2024-01-02T10:00:00.000Z',
    updatedAt: '2024-01-02T10:00:00.000Z'
  },
  {
    id: '3',
    firstName: 'Ayşe',
    lastName: 'Kaya',
    email: 'ayse@example.com',
    phone: '5551234569',
    roles: ['muhendis'],
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
