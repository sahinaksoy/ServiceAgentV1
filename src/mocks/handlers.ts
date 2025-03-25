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
    mobile: '5551234567',
    contactPerson: 'Ahmet Yılmaz',
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
    mobile: '5559876543',
    contactPerson: 'Ayşe Demir',
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
  }
];

let users: User[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '0532 123 4567',
    roles: ['saha_calisani', 'ekip_sefi'],
    status: 'active',
    city: 'İstanbul',
    district: 'Kadıköy',
    region: 'Bostancı',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@example.com',
    phone: '0533 765 4321',
    roles: ['muhendis', 'yonetici'],
    status: 'active',
    city: 'İstanbul',
    district: 'Beşiktaş',
    region: 'Levent',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@example.com',
    phone: '0532 987 6543',
    roles: ['taseron_saha_calisani', 'taseron_ekip_sefi'],
    status: 'active',
    city: 'İstanbul',
    district: 'Şişli',
    region: 'Mecidiyeköy',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    firstName: 'Fatma',
    lastName: 'Şahin',
    email: 'fatma.sahin@example.com',
    phone: '0533 234 5678',
    roles: ['saha_calisani'],
    status: 'active',
    city: 'İstanbul',
    district: 'Üsküdar',
    region: 'Acıbadem',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    firstName: 'Ali',
    lastName: 'Öztürk',
    email: 'ali.ozturk@example.com',
    phone: '0532 345 6789',
    roles: ['muhendis'],
    status: 'active',
    city: 'İstanbul',
    district: 'Maltepe',
    region: 'Cevizli',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    firstName: 'Zeynep',
    lastName: 'Çelik',
    email: 'zeynep.celik@example.com',
    phone: '0533 456 7890',
    roles: ['taseron_saha_calisani'],
    status: 'active',
    city: 'İstanbul',
    district: 'Ataşehir',
    region: 'Barbaros',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    firstName: 'Mustafa',
    lastName: 'Aydın',
    email: 'mustafa.aydin@example.com',
    phone: '0532 567 8901',
    roles: ['ekip_sefi'],
    status: 'active',
    city: 'İstanbul',
    district: 'Kartal',
    region: 'Kordonboyu',
    company: 'Meser',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    firstName: 'Elif',
    lastName: 'Yıldız',
    email: 'elif.yildiz@example.com',
    phone: '0533 678 9012',
    roles: ['yonetici'],
    status: 'active',
    city: 'İstanbul',
    district: 'Pendik',
    region: 'Yenişehir',
    company: 'Arveta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    firstName: 'Can',
    lastName: 'Aksoy',
    email: 'can.aksoy@example.com',
    phone: '0532 789 0123',
    roles: ['muhendis', 'ekip_sefi'],
    status: 'active',
    city: 'İstanbul',
    district: 'Bakırköy',
    region: 'Yeşilköy',
    company: 'Noord',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    firstName: 'Selin',
    lastName: 'Kara',
    email: 'selin.kara@example.com',
    phone: '0533 890 1234',
    roles: ['saha_calisani', 'muhendis'],
    status: 'active',
    city: 'İstanbul',
    district: 'Beylikdüzü',
    region: 'Cumhuriyet',
    company: 'Meser',
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
    status: 'maintenance',
    manager: 'Ahmet Yıldırım',
    managerPhone: '532 555 1122',
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
    manager: 'Zeynep Kaya',
    managerPhone: '533 444 5566',
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
    status: 'inactive',
    manager: 'Mehmet Demir',
    managerPhone: '542 333 7788',
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
    status: 'maintenance',
    manager: 'Ayşe Çelik',
    managerPhone: '535 666 9900',
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
    manager: 'Mustafa Şahin',
    managerPhone: '536 777 1234',
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
    manager: 'Elif Yılmaz',
    managerPhone: '537 888 5678',
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
    manager: 'Can Öztürk',
    managerPhone: '538 999 9012',
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
    manager: 'Selin Aydın',
    managerPhone: '539 111 3456',
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
    manager: 'Burak Aksoy',
    managerPhone: '532 222 7890',
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
    manager: 'Deniz Korkmaz',
    managerPhone: '533 333 1234',
    employeeCount: 21,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let workOrders: WorkOrder[] = [
  {
    id: 3,
    summary: 'Soğutma sistemi arızası',
    priority: 'high',
    type: 'emergency',
    category: 'mechanical',
    status: 'in_progress',
    dueDate: dayjs().add(1, 'day').toISOString(),
    createdAt: dayjs().subtract(6, 'hour').toISOString(),
    updatedAt: dayjs().subtract(1, 'hour').toISOString(),
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
        id: 143,
        name: 'BENMARİ ARIZASI',
        description: 'Soğutma sistemi onarımı',
        duration: 90,
        price: 500
      }
    ],
    parts: [
      {
        id: 1,
        name: 'Kompresör',
        description: 'Yeni kompresör',
        quantity: 1,
        unit: 'ADET',
        unitPrice: 15000
      },
      {
        id: 11,
        name: 'Soğutucu Gaz',
        description: 'R404a gaz',
        quantity: 2,
        unit: 'KILOGRAM',
        unitPrice: 150
      }
    ],
    totalAmount: 15800,
    totalDuration: 90
  },
  {
    id: 6,
    summary: 'Kompresör değişimi',
    priority: 'high',
    type: 'emergency',
    category: 'mechanical',
    status: 'pool',
    dueDate: dayjs().add(1, 'day').toISOString(),
    createdAt: dayjs().subtract(4, 'hour').toISOString(),
    updatedAt: dayjs().subtract(4, 'hour').toISOString(),
    company: {
      id: '8',
      name: 'Üsküdar MM Migros',
      contactPerson: 'Mustafa Özkan',
      email: 'uskudar@migros.com.tr',
      mobile: '5556789012',
      address: 'Üsküdar Mah. Üsküdar, İstanbul'
    },
    assignedTo: null,
    services: [],
    parts: [],
    totalAmount: 0,
    totalDuration: 0
  },
  {
    id: 7,
    summary: 'Elektrik panosu bakımı',
    priority: 'medium',
    type: 'maintenance',
    category: 'electrical',
    status: 'pending',
    dueDate: dayjs().add(3, 'day').toISOString(),
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '9',
      name: 'Şişli 3M Migros',
      contactPerson: 'Ayşe Yıldız',
      email: 'sisli@migros.com.tr',
      mobile: '5550123456',
      address: 'Şişli Mah. Şişli, İstanbul'
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
        id: 142,
        name: 'PANO ARIZASI',
        description: 'Elektrik panosu bakımı',
        duration: 120,
        price: 1000
      }
    ],
    parts: [
      {
        id: 16,
        name: 'Sigortalar',
        description: 'Sigorta değişimi',
        quantity: 4,
        unit: 'ADET',
        unitPrice: 100
      }
    ],
    totalAmount: 1400,
    totalDuration: 120
  },
  {
    id: 8,
    summary: 'Soğuk hava deposu iyileştirme',
    priority: 'medium',
    type: 'renovation',
    category: 'mechanical',
    status: 'in_progress',
    dueDate: dayjs().add(5, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(6, 'hour').toISOString(),
    company: {
      id: '10',
      name: 'Beşiktaş MM Migros',
      contactPerson: 'Mehmet Yılmaz',
      email: 'besiktas@migros.com.tr',
      mobile: '5559012345',
      address: 'Beşiktaş Mah. Beşiktaş, İstanbul'
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
        id: 156,
        name: 'PERİYODİK BAKIM',
        description: 'Soğuk hava deposu bakımı',
        duration: 180,
        price: 1500
      }
    ],
    parts: [
      {
        id: 2,
        name: 'Kondenser',
        description: 'Yeni kondenser',
        quantity: 1,
        unit: 'ADET',
        unitPrice: 8000
      },
      {
        id: 12,
        name: 'Bakır Boru',
        description: 'Bakır boru tesisatı',
        quantity: 10,
        unit: 'METRE',
        unitPrice: 200
      },
      {
        id: 13,
        name: 'İzolasyon Malzemesi',
        description: 'Boru izolasyonu',
        quantity: 12,
        unit: 'METRE',
        unitPrice: 80
      }
    ],
    totalAmount: 11460,
    totalDuration: 180
  },
  {
    id: 9,
    summary: 'Klima Sistemi Bakımı',
    priority: 'low',
    type: 'maintenance',
    category: 'mechanical',
    status: 'pending',
    dueDate: dayjs().add(7, 'day').toISOString(),
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '3',
      name: 'Ataşehir Makro Migros',
      contactPerson: 'Mehmet Demir',
      email: 'atasehir@migros.com.tr',
      mobile: '5553456789',
      address: 'Ataşehir Bulvarı, Ataşehir, İstanbul'
    },
    assignedTo: {
      id: '5',
      firstName: 'Ali',
      lastName: 'Öztürk',
      email: 'ali.ozturk@example.com',
      status: 'active'
    },
    services: [
      {
        id: 157,
        name: 'KLİMA BAKIMI',
        description: 'Yıllık klima bakımı',
        duration: 240,
        price: 2000
      }
    ],
    parts: [
      {
        id: 20,
        name: 'Klima Filtresi',
        description: 'Hepa filtre değişimi',
        quantity: 4,
        unit: 'ADET',
        unitPrice: 300
      }
    ],
    totalAmount: 3200,
    totalDuration: 240
  },
  {
    id: 10,
    summary: 'Aydınlatma Sistemi Arızası',
    priority: 'medium',
    type: 'emergency',
    category: 'electrical',
    status: 'pool',
    dueDate: dayjs().add(2, 'day').toISOString(),
    createdAt: dayjs().subtract(3, 'hour').toISOString(),
    updatedAt: dayjs().subtract(3, 'hour').toISOString(),
    company: {
      id: '4',
      name: 'Levent 5M Migros',
      contactPerson: 'Ayşe Çelik',
      email: 'levent@migros.com.tr',
      mobile: '5557891234',
      address: 'Levent Mah. Beşiktaş, İstanbul'
    },
    assignedTo: null,
    services: [],
    parts: [],
    totalAmount: 0,
    totalDuration: 0
  },
  {
    id: 11,
    summary: 'Soğutma Grubu Revizyonu',
    priority: 'high',
    type: 'renovation',
    category: 'mechanical',
    status: 'awaiting_approval',
    dueDate: dayjs().add(10, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
    company: {
      id: '6',
      name: 'Bakırköy 3M Migros',
      contactPerson: 'Elif Yılmaz',
      email: 'bakirkoy@migros.com.tr',
      mobile: '5558765432',
      address: 'Bakırköy Mah. Bakırköy, İstanbul'
    },
    assignedTo: {
      id: '3',
      firstName: 'Mehmet',
      lastName: 'Kaya',
      email: 'mehmet.kaya@example.com',
      status: 'active'
    },
    services: [
      {
        id: 158,
        name: 'SOĞUTMA GRUBU REVİZYONU',
        description: 'Soğutma grubu komple revizyon',
        duration: 480,
        price: 5000
      }
    ],
    parts: [
      {
        id: 21,
        name: 'Kompresör Grubu',
        description: 'Komple kompresör grubu',
        quantity: 1,
        unit: 'SET',
        unitPrice: 25000
      },
      {
        id: 22,
        name: 'Kontrol Paneli',
        description: 'Elektronik kontrol ünitesi',
        quantity: 1,
        unit: 'ADET',
        unitPrice: 8000
      }
    ],
    totalAmount: 38000,
    totalDuration: 480
  },
  {
    id: 12,
    summary: 'Yıllık Bakım Kontrolü',
    priority: 'low',
    type: 'maintenance',
    category: 'mechanical',
    status: 'pending',
    dueDate: dayjs().add(15, 'day').toISOString(),
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(5, 'day').toISOString(),
    company: {
      id: '7',
      name: 'Maltepe Makro Migros',
      contactPerson: 'Can Öztürk',
      email: 'maltepe@migros.com.tr',
      mobile: '5554567890',
      address: 'Maltepe Mah. Maltepe, İstanbul'
    },
    assignedTo: {
      id: '4',
      firstName: 'Fatma',
      lastName: 'Şahin',
      email: 'fatma.sahin@example.com',
      status: 'active'
    },
    services: [
      {
        id: 159,
        name: 'YILLIK BAKIM',
        description: 'Genel sistem kontrolü ve bakım',
        duration: 360,
        price: 3000
      }
    ],
    parts: [
      {
        id: 23,
        name: 'Filtre Seti',
        description: 'Yıllık filtre değişim seti',
        quantity: 1,
        unit: 'SET',
        unitPrice: 2500
      }
    ],
    totalAmount: 5500,
    totalDuration: 360
  },
  {
    id: 13,
    summary: 'Soğuk Oda Termostat Değişimi',
    priority: 'high',
    type: 'emergency',
    category: 'mechanical',
    status: 'completed',
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(6, 'hour').toISOString(),
    company: {
      id: '3',
      name: 'Bostancı 3M Migros',
      contactPerson: 'Ahmet Yıldırım',
      email: 'bostanci@migros.com.tr',
      mobile: '5551234567',
      address: 'Bostancı Mah. Kadıköy, İstanbul'
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
        id: 160,
        name: 'TERMOSTAT DEĞİŞİMİ',
        description: 'Soğuk oda termostat değişimi ve kalibrasyon',
        duration: 120,
        price: 800
      }
    ],
    parts: [
      {
        id: 24,
        name: 'Dijital Termostat',
        description: 'Endüstriyel tip dijital termostat',
        quantity: 1,
        unit: 'ADET',
        unitPrice: 1200
      },
      {
        id: 25,
        name: 'Sensör',
        description: 'Sıcaklık sensörü',
        quantity: 2,
        unit: 'ADET',
        unitPrice: 300
      }
    ],
    totalAmount: 2600,
    totalDuration: 120
  },
  {
    id: 14,
    summary: 'Vitrin Dolabı Tamir Bakım',
    priority: 'medium',
    type: 'maintenance',
    category: 'mechanical',
    status: 'cancelled',
    dueDate: dayjs().subtract(3, 'day').toISOString(),
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString(),
    company: {
      id: '4',
      name: 'Moda MM Migros',
      contactPerson: 'Zeynep Kaya',
      email: 'moda@migros.com.tr',
      mobile: '5559876543',
      address: 'Moda Cad. Kadıköy, İstanbul'
    },
    assignedTo: {
      id: '5',
      firstName: 'Ali',
      lastName: 'Öztürk',
      email: 'ali.ozturk@example.com',
      status: 'active'
    },
    services: [
      {
        id: 161,
        name: 'VİTRİN DOLABI BAKIM',
        description: 'Vitrin dolabı genel bakım ve onarım',
        duration: 180,
        price: 1500
      }
    ],
    parts: [
      {
        id: 26,
        name: 'Fan Motoru',
        description: 'Vitrin dolabı fan motoru',
        quantity: 2,
        unit: 'ADET',
        unitPrice: 450
      }
    ],
    totalAmount: 2400,
    totalDuration: 180
  }
];

export const handlers = [
  http.get('/api/customers', () => {
    return HttpResponse.json(customers);
  }),

  http.get('/api/customers/:id', ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) {
      return new HttpResponse(null, { status: 400 });
    }
    const customer = customers.find((c) => c.id === id);
    if (!customer) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(customer);
  }),

  http.post('/api/customers', async ({ request }) => {
    const newCustomer = await request.json() as Omit<Customer, 'id'>;
    const customer: Customer = {
      ...newCustomer,
      id: String(Math.max(...customers.map((c) => Number(c.id))) + 1),
    };
    customers.push(customer);
    return HttpResponse.json(customer);
  }),

  http.put('/api/customers/:id', async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) {
      return new HttpResponse(null, { status: 400 });
    }
    const updatedCustomer = await request.json() as Customer;
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    customers[index] = { ...updatedCustomer, id };
    return HttpResponse.json(customers[index]);
  }),

  http.delete('/api/customers/:id', ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) {
      return new HttpResponse(null, { status: 400 });
    }
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    customers = customers.filter((c) => c.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/users', () => {
    return HttpResponse.json([
      {
        id: '1',
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        email: 'ahmet.yilmaz@meser.com.tr',
        phone: '0532 123 4567',
        roles: ['saha_calisani', 'ekip_sefi'],
        status: 'active',
        city: 'İstanbul',
        district: 'Kadıköy',
        region: 'Bostancı',
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
        city: 'İstanbul',
        district: 'Beşiktaş',
        region: 'Levent',
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
        city: 'İstanbul',
        district: 'Şişli',
        region: 'Mecidiyeköy',
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
        city: 'İstanbul',
        district: 'Üsküdar',
        region: 'Acıbadem',
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
        city: 'İstanbul',
        district: 'Maltepe',
        region: 'Cevizli',
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
        city: 'İstanbul',
        district: 'Ataşehir',
        region: 'Barbaros',
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
        city: 'İstanbul',
        district: 'Kartal',
        region: 'Kordonboyu',
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
        city: 'İstanbul',
        district: 'Pendik',
        region: 'Yenişehir',
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
        roles: ['muhendis', 'ekip_sefi'],
        status: 'active',
        city: 'İstanbul',
        district: 'Bakırköy',
        region: 'Yeşilköy',
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
        city: 'İstanbul',
        district: 'Beylikdüzü',
        region: 'Cumhuriyet',
        company: 'Meser',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
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

  http.get('/api/work-orders/:id', ({ params }) => {
    const { id } = params;
    const workOrder = workOrders.find(wo => wo.id === Number(id));

    if (!workOrder) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(workOrder);
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