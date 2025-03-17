import { Store } from '../types/store';

export const mockStores: Store[] = [
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
    devices: [
      {
        id: '1-1',
        name: 'Merkezi Klima Sistemi',
        type: 'Klima',
        serialNumber: 'KL-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-02-15',
        nextMaintenanceDate: '2024-05-15'
      },
      {
        id: '1-2',
        name: 'Soğutma Kulesi',
        type: 'Soğutma Kulesi',
        serialNumber: 'SK-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-01-20',
        nextMaintenanceDate: '2024-04-20'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
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
    devices: [
      {
        id: '2-1',
        name: 'VRF Klima Sistemi',
        type: 'VRF',
        serialNumber: 'VRF-2024-001',
        status: 'maintenance',
        lastMaintenanceDate: '2024-02-01',
        nextMaintenanceDate: '2024-05-01'
      },
      {
        id: '2-2',
        name: 'Soğutma Kompresörü',
        type: 'Kompresör',
        serialNumber: 'KMP-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-03-01',
        nextMaintenanceDate: '2024-06-01'
      }
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-16T00:00:00Z'
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
    devices: [
      {
        id: '3-1',
        name: 'Endüstriyel Soğutma Sistemi',
        type: 'Endüstriyel Soğutma',
        serialNumber: 'ES-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-03-01',
        nextMaintenanceDate: '2024-06-01'
      },
      {
        id: '3-2',
        name: 'Soğutma Kontrol Paneli',
        type: 'Kontrol Paneli',
        serialNumber: 'KP-2024-001',
        status: 'inactive',
        lastMaintenanceDate: '2024-02-15',
        nextMaintenanceDate: '2024-05-15'
      }
    ],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-17T00:00:00Z'
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
    devices: [
      {
        id: '4-1',
        name: 'Split Klima Sistemi',
        type: 'Split Klima',
        serialNumber: 'SPL-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-03-01',
        nextMaintenanceDate: '2024-06-01'
      },
      {
        id: '4-2',
        name: 'Soğutma Fanı',
        type: 'Fan',
        serialNumber: 'FN-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-02-15',
        nextMaintenanceDate: '2024-05-15'
      }
    ],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-03-18T00:00:00Z'
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
    devices: [
      {
        id: '5-1',
        name: 'Merkezi Soğutma Sistemi',
        type: 'Merkezi Soğutma',
        serialNumber: 'MS-2024-001',
        status: 'inactive',
        lastMaintenanceDate: '2024-01-15',
        nextMaintenanceDate: '2024-04-15'
      },
      {
        id: '5-2',
        name: 'Soğutma Boru Hattı',
        type: 'Boru Hattı',
        serialNumber: 'BH-2024-001',
        status: 'inactive',
        lastMaintenanceDate: '2024-02-01',
        nextMaintenanceDate: '2024-05-01'
      }
    ],
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-03-19T00:00:00Z'
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
    devices: [
      {
        id: '6-1',
        name: 'Soğutma Ekipmanları',
        type: 'Soğutma Ekipmanı',
        serialNumber: 'SE-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-03-01',
        nextMaintenanceDate: '2024-06-01'
      },
      {
        id: '6-2',
        name: 'Soğutma Sensörleri',
        type: 'Sensör',
        serialNumber: 'SNS-2024-001',
        status: 'maintenance',
        lastMaintenanceDate: '2024-02-15',
        nextMaintenanceDate: '2024-05-15'
      }
    ],
    createdAt: '2024-02-25T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z'
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
    devices: [
      {
        id: '7-1',
        name: 'Soğutma Sistemi',
        type: 'Soğutma Sistemi',
        serialNumber: 'SS-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-03-01',
        nextMaintenanceDate: '2024-06-01'
      },
      {
        id: '7-2',
        name: 'Soğutma Kontrol Ünitesi',
        type: 'Kontrol Ünitesi',
        serialNumber: 'KU-2024-001',
        status: 'active',
        lastMaintenanceDate: '2024-02-15',
        nextMaintenanceDate: '2024-05-15'
      }
    ],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-21T00:00:00Z'
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
    devices: [
      {
        id: '8-1',
        name: 'Soğutma Sistemi',
        type: 'Soğutma Sistemi',
        serialNumber: 'SS-2024-002',
        status: 'maintenance',
        lastMaintenanceDate: '2024-02-01',
        nextMaintenanceDate: '2024-05-01'
      },
      {
        id: '8-2',
        name: 'Soğutma Sensörleri',
        type: 'Sensör',
        serialNumber: 'SNS-2024-002',
        status: 'active',
        lastMaintenanceDate: '2024-03-01',
        nextMaintenanceDate: '2024-06-01'
      }
    ],
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-22T00:00:00Z'
  }
]; 