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
    id: 1,
    summary: 'Klima Bakım ve Onarım',
    priority: 'high',
    type: 'maintenance',
    category: 'mechanical',
    status: 'awaiting_approval',
    dueDate: dayjs().add(2, 'day').toISOString(),
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().toISOString(),
    company: customers[0],
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
        name: 'Klima Bakım',
        description: 'Periyodik klima bakımı',
        duration: 2,
        price: 1500,
        hasServiceForm: true,
        status: 'completed',
        formData: {
          genelGorunum: {
            temizlik: true,
            paslanma: false,
            boyaBozulmasi: false,
            fizikselHasar: false,
            titresim: true,
            sesliCalisma: true
          },
          merkeziSistem: {
            marka: 'Mitsubishi',
            model: 'X-2000',
            seriNo: 'MIT123456',
            kapasiteKcal: '24000',
            uretimYili: '2022',
            yakitTipi: 'Elektrik'
          },
          sistemGorunum: {
            suBasinci: '2.4',
            calismaSicakligi: '22',
            donusSicakligi: '18',
            bacaGaziSicakligi: 'N/A'
          }
        }
      },
      {
        id: 2,
        name: 'Filtre Değişimi',
        description: 'Klima filtrelerinin değişimi',
        duration: 1,
        price: 500,
        hasServiceForm: false,
        status: 'completed'
      }
    ],
    parts: [
      {
        id: 1,
        name: 'Klima Filtresi',
        description: 'Hepa Filtre',
        unit: 'Adet',
        quantity: 2,
        unitPrice: 250
      },
      {
        id: 2,
        name: 'Temizlik Sıvısı',
        description: 'Klima temizleme solüsyonu',
        unit: 'Lt',
        quantity: 1,
        unitPrice: 150
      }
    ],
    totalAmount: 2650,
    totalDuration: 3
  },
  {
    id: 2,
    summary: 'Soğutma Sistemi Arıza Tespiti',
    priority: 'high',
    type: 'emergency',
    category: 'mechanical',
    status: 'awaiting_approval',
    dueDate: dayjs().add(1, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'hour').toISOString(),
    updatedAt: dayjs().toISOString(),
    company: customers[1],
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
        name: 'Arıza Tespiti',
        description: 'Soğutma sistemi arıza tespiti',
        duration: 1,
        price: 750,
        hasServiceForm: true,
        status: 'completed',
        formData: {
          genelGorunum: {
            temizlik: true,
            paslanma: true,
            boyaBozulmasi: false,
            fizikselHasar: false,
            titresim: false,
            sesliCalisma: true
          },
          merkeziSistem: {
            marka: 'Carrier',
            model: 'C-500',
            seriNo: 'CAR789012',
            kapasiteKcal: '36000',
            uretimYili: '2021',
            yakitTipi: 'Elektrik'
          },
          sistemGorunum: {
            suBasinci: '3.2',
            calismaSicakligi: '25',
            donusSicakligi: '20',
            bacaGaziSicakligi: 'N/A'
          }
        }
      }
    ],
    parts: [
      {
        id: 3,
        name: 'Kompresör',
        description: 'Soğutma sistemi kompresörü',
        unit: 'Adet',
        quantity: 1,
        unitPrice: 3500
      }
    ],
    totalAmount: 4250,
    totalDuration: 1
  },
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
    id: 4,
    summary: 'Yıllık bakım kontrolü',
    priority: 'low',
    type: 'maintenance',
    category: 'mechanical',
    status: 'completed',
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '6',
      name: 'Bakırköy 3M Migros',
      contactPerson: 'Hasan Kaya',
      email: 'bakirkoy@migros.com.tr',
      mobile: '5558765432',
      address: 'Bakırköy Mah. Bakırköy, İstanbul'
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
        description: 'Yıllık genel bakım',
        duration: 180,
        price: 1500
      }
    ],
    parts: [
      {
        id: 5,
        name: 'Kuru Filtre',
        description: 'Filtre değişimi',
        quantity: 2,
        unit: 'ADET',
        unitPrice: 800
      },
      {
        id: 14,
        name: 'Yağ',
        description: 'Kompresör yağı',
        quantity: 3,
        unit: 'LITRE',
        unitPrice: 250
      }
    ],
    totalAmount: 3850,
    totalDuration: 180
  },
  {
    id: 5,
    summary: 'Aydınlatma sistemi yenileme',
    priority: 'medium',
    type: 'renovation',
    category: 'electrical',
    status: 'cancelled',
    dueDate: dayjs().add(7, 'day').toISOString(),
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '7',
      name: 'Maltepe Makro Migros',
      contactPerson: 'Zeynep Aydın',
      email: 'maltepe@migros.com.tr',
      mobile: '5554567890',
      address: 'Maltepe Mah. Maltepe, İstanbul'
    },
    assignedTo: null,
    services: [],
    parts: [],
    totalAmount: 0,
    totalDuration: 0
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
      address: 'Şişli Mah. Şişli, İstanbul',
      previousWorkOrders: [
        {
          id: 102,
          summary: 'Elektrik arızası',
          priority: 'high',
          type: 'emergency',
          category: 'electrical',
          status: 'completed',
          dueDate: dayjs().subtract(15, 'day').toISOString(),
          createdAt: dayjs().subtract(16, 'day').toISOString(),
          updatedAt: dayjs().subtract(15, 'day').toISOString(),
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
              description: 'Acil pano arızası müdahalesi',
              duration: 120,
              price: 1000,
              status: 'completed'
            }
          ],
          parts: [
            {
              id: 15,
              name: 'Kontaklar',
              description: 'Kontaktör değişimi',
              quantity: 1,
              unit: 'ADET',
              unitPrice: 150
            }
          ],
          totalAmount: 1150,
          totalDuration: 120
        }
      ]
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
    summary: 'UPS sistemi kurulumu',
    priority: 'high',
    type: 'investment',
    category: 'electrical',
    status: 'completed',
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    company: {
      id: '1',
      name: 'Beşiktaş MM Migros',
      contactPerson: 'Mehmet Yılmaz',
      email: 'besiktas@migros.com.tr',
      mobile: '5559012345',
      address: 'Beşiktaş Mah. Beşiktaş, İstanbul'
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
        id: 148,
        name: 'HAT ÇEKİMİ(KUVVETLİ AKIM)',
        description: 'UPS güç hattı çekimi',
        duration: 180,
        price: 1500
      }
    ],
    parts: [
      {
        id: 17,
        name: 'Kablolar',
        description: 'UPS güç kablosu',
        quantity: 50,
        unit: 'METRE',
        unitPrice: 50
      }
    ],
    totalAmount: 4000,
    totalDuration: 180
  },
  {
    id: 10,
    summary: 'Havalandırma sistemi arızası',
    priority: 'high',
    type: 'emergency',
    category: 'mechanical',
    status: 'cancelled',
    dueDate: dayjs().add(1, 'day').toISOString(),
    createdAt: dayjs().subtract(8, 'hour').toISOString(),
    updatedAt: dayjs().subtract(6, 'hour').toISOString(),
    company: {
      id: '2',
      name: 'Şişli 3M Migros',
      contactPerson: 'Ayşe Yıldız',
      email: 'sisli@migros.com.tr',
      mobile: '5550123456',
      address: 'Şişli Mah. Şişli, İstanbul'
    },
    assignedTo: null,
    services: [],
    parts: [],
    totalAmount: 0,
    totalDuration: 0
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
        email: 'ahmet@example.com',
        phone: '5551234567',
        roles: ['saha_calisani'],
        status: 'active',
        region: 'Kadıköy',
        company: 'Meser',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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