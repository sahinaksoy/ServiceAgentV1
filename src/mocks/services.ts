import { Service, ServiceCategory, ServiceStatus } from '../types/service';

export const mockServices: Service[] = [
  {
    id: 1,
    category: ServiceCategory.MECHANIC,
    name: 'Soğutma Sistemi Bakımı',
    duration: 120,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    description: 'Periyodik soğutma sistemi bakımı ve kontrolleri',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    category: ServiceCategory.MECHANIC,
    name: 'Kompresör Arızası',
    duration: 180,
    price: 2500,
    status: ServiceStatus.ACTIVE,
    description: 'Soğutma sistemi kompresör arıza tespiti ve onarımı',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 3,
    category: ServiceCategory.MECHANIC,
    name: 'Gaz Kaçağı Kontrolü',
    duration: 90,
    price: 800,
    status: ServiceStatus.ACTIVE,
    description: 'Soğutucu gaz kaçağı tespiti ve onarımı',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 4,
    category: ServiceCategory.ELECTRICAL,
    name: 'Kontrol Kartı Arızası',
    duration: 120,
    price: 1800,
    status: ServiceStatus.ACTIVE,
    description: 'Soğutma sistemi elektronik kontrol kartı arıza tespiti ve onarımı',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 5,
    category: ServiceCategory.MECHANIC,
    name: 'Fan Motoru Değişimi',
    duration: 60,
    price: 1200,
    status: ServiceStatus.ACTIVE,
    description: 'Kondenser/Evaporatör fan motoru değişimi',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 6,
    category: ServiceCategory.MECHANIC,
    name: 'Yeni Sistem Kurulumu',
    duration: 480,
    price: 15000,
    status: ServiceStatus.ACTIVE,
    description: 'Endüstriyel soğutma sistemi komple kurulum',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 7,
    category: ServiceCategory.MECHANIC,
    name: 'Filtre Değişimi',
    duration: 45,
    price: 500,
    status: ServiceStatus.ACTIVE,
    description: 'Soğutma sistemi filtre bakımı ve değişimi',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 8,
    category: ServiceCategory.ELECTRICAL,
    name: 'Sensör Arızası',
    duration: 90,
    price: 900,
    status: ServiceStatus.ACTIVE,
    description: 'Sıcaklık/basınç sensörü arıza tespiti ve değişimi',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 9,
    category: ServiceCategory.ELECTRICAL,
    name: 'Keşif ve Ekspertiz',
    duration: 60,
    price: 400,
    status: ServiceStatus.ACTIVE,
    description: 'Soğutma sistemi arıza tespiti ve maliyet analizi',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 10,
    category: ServiceCategory.MECHANIC,
    name: 'Kondenser Temizliği',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    description: 'Kondenser ünitesi detaylı temizlik ve bakım',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 142,
    category: ServiceCategory.ELECTRICAL,
    name: 'PANO ARIZASI',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 143,
    category: ServiceCategory.MECHANIC,
    name: 'BENMARİ ARIZASI',
    duration: 90,
    price: 500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 144,
    category: ServiceCategory.ELECTRICAL,
    name: 'İSG',
    duration: 60,
    price: 300,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 145,
    category: ServiceCategory.ELECTRICAL,
    name: 'AYDINLATMA ARIZASI',
    duration: 45,
    price: 200,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 146,
    category: ServiceCategory.ELECTRICAL,
    name: 'TOPRAKLAMA KONTROLÜ',
    duration: 60,
    price: 300,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 147,
    category: ServiceCategory.ELECTRICAL,
    name: 'DATA HATTI KONTROL',
    duration: 45,
    price: 200,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 148,
    category: ServiceCategory.ELECTRICAL,
    name: 'HAT ÇEKİMİ(KUVVETLİ AKIM)',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 149,
    category: ServiceCategory.ELECTRICAL,
    name: 'HAT ÇEKİMİ(ZAYIF AKIM)',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 150,
    category: ServiceCategory.ELECTRICAL,
    name: 'KEŞİF',
    duration: 60,
    price: 300,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 151,
    category: ServiceCategory.ELECTRICAL,
    name: 'KOMPANZASYON-OTOMASYON',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 152,
    category: ServiceCategory.MECHANIC,
    name: 'M-FIRIN ARIZASI',
    duration: 90,
    price: 500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 153,
    category: ServiceCategory.MECHANIC,
    name: 'SİNEKLİK ARIZASI',
    duration: 45,
    price: 200,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 154,
    category: ServiceCategory.ELECTRICAL,
    name: 'KAPANIŞ',
    duration: 60,
    price: 300,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 156,
    category: ServiceCategory.MECHANIC,
    name: 'PERİYODİK BAKIM',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 157,
    category: ServiceCategory.MECHANIC,
    name: 'EVAPORATÖR DEĞİŞİMİ',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 158,
    category: ServiceCategory.MECHANIC,
    name: 'GİDER ARIZASI',
    duration: 90,
    price: 500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 159,
    category: ServiceCategory.MECHANIC,
    name: 'KOMPRESÖR DEĞİŞİMİ',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 160,
    category: ServiceCategory.MECHANIC,
    name: 'GRUP YER DEĞİŞİMİ',
    duration: 240,
    price: 2000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 161,
    category: ServiceCategory.ELECTRICAL,
    name: 'ELEKTRİK TADİLAT',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 162,
    category: ServiceCategory.MECHANIC,
    name: 'SOĞUTMA TADİLAT',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 163,
    category: ServiceCategory.MECHANIC,
    name: 'SOĞUTMA MONTAJ',
    duration: 240,
    price: 2000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 164,
    category: ServiceCategory.ELECTRICAL,
    name: 'İZLEME KABLO ÇEKİMİ',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 165,
    category: ServiceCategory.MECHANIC,
    name: 'REYON ARIZASI',
    duration: 90,
    price: 500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 166,
    category: ServiceCategory.ELECTRICAL,
    name: 'OTOMASYON PANO KURULUMU',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 167,
    category: ServiceCategory.ELECTRICAL,
    name: 'OTOMASYON KONTROL',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 168,
    category: ServiceCategory.ELECTRICAL,
    name: 'REYONDA İZLEME YOK',
    duration: 60,
    price: 300,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 169,
    category: ServiceCategory.MECHANIC,
    name: 'NAKLİYE',
    duration: 120,
    price: 1000,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 170,
    category: ServiceCategory.MECHANIC,
    name: 'ARAÇ MUAYENE',
    duration: 60,
    price: 300,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 171,
    category: ServiceCategory.MECHANIC,
    name: 'ARAÇ BAKIM/ARIZA',
    duration: 180,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 172,
    category: ServiceCategory.ELECTRICAL,
    name: 'PRİZ ARIZASI',
    duration: 45,
    price: 200,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 173,
    category: ServiceCategory.ELECTRICAL,
    name: 'CİHAZLARA ENERJİ GELMİYOR',
    duration: 90,
    price: 500,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
]; 