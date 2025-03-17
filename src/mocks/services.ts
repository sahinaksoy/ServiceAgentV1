import { Service, ServiceCategory, ServiceStatus } from '../types/service';

export const mockServices: Service[] = [
  {
    id: 1,
    category: ServiceCategory.MARKETING,
    name: 'Marka Oluşturma',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    category: ServiceCategory.MARKETING,
    name: 'Kampanya',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 3,
    category: ServiceCategory.MARKETING,
    name: 'Metin Hazırlama',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 4,
    category: ServiceCategory.SOFTWARE,
    name: 'Yazılım Test',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 5,
    category: ServiceCategory.MARKETING,
    name: 'İlk Görüşme',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 6,
    category: ServiceCategory.MARKETING,
    name: 'Sosyal Medya',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 7,
    category: ServiceCategory.OTHER,
    name: 'Satış Sonrası Destek',
    duration: 45,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 8,
    category: ServiceCategory.MARKETING,
    name: 'Pazarlama',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 10,
    category: ServiceCategory.OTHER,
    name: 'Personel Tanıma Testi',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 142,
    category: ServiceCategory.ELECTRICAL,
    name: 'PANO ARIZASI',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 143,
    category: ServiceCategory.MECHANIC,
    name: 'BENMARİ ARIZASI',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 144,
    category: ServiceCategory.OTHER,
    name: 'İSG',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 145,
    category: ServiceCategory.ELECTRICAL,
    name: 'AYDINLATMA ARIZASI',
    duration: 45,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 146,
    category: ServiceCategory.ELECTRICAL,
    name: 'TOPRAKLAMA KONTROLÜ',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 147,
    category: ServiceCategory.ELECTRICAL,
    name: 'DATA HATTI KONTROL',
    duration: 45,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 148,
    category: ServiceCategory.ELECTRICAL,
    name: 'HAT ÇEKİMİ(KUVVETLİ AKIM)',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 149,
    category: ServiceCategory.ELECTRICAL,
    name: 'HAT ÇEKİMİ(ZAYIF AKIM)',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 150,
    category: ServiceCategory.OTHER,
    name: 'KEŞİF',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 151,
    category: ServiceCategory.ELECTRICAL,
    name: 'KOMPANZASYON-OTOMASYON',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 152,
    category: ServiceCategory.MECHANIC,
    name: 'M-FIRIN ARIZASI',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 153,
    category: ServiceCategory.MECHANIC,
    name: 'SİNEKLİK ARIZASI',
    duration: 45,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 154,
    category: ServiceCategory.OTHER,
    name: 'KAPANIŞ',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 156,
    category: ServiceCategory.MECHANIC,
    name: 'PERİYODİK BAKIM',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 157,
    category: ServiceCategory.MECHANIC,
    name: 'EVAPORATÖR DEĞİŞİMİ',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 158,
    category: ServiceCategory.MECHANIC,
    name: 'GİDER ARIZASI',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 159,
    category: ServiceCategory.MECHANIC,
    name: 'KOMPRESÖR DEĞİŞİMİ',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 160,
    category: ServiceCategory.INSTALLATION,
    name: 'GRUP YER DEĞİŞİMİ',
    duration: 240,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 161,
    category: ServiceCategory.ELECTRICAL,
    name: 'ELEKTRİK TADİLAT',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 162,
    category: ServiceCategory.MECHANIC,
    name: 'SOĞUTMA TADİLAT',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 163,
    category: ServiceCategory.INSTALLATION,
    name: 'SOĞUTMA MONTAJ',
    duration: 240,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 164,
    category: ServiceCategory.ELECTRICAL,
    name: 'İZLEME KABLO ÇEKİMİ',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 165,
    category: ServiceCategory.MECHANIC,
    name: 'REYON ARIZASI',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 166,
    category: ServiceCategory.INSTALLATION,
    name: 'OTOMASYON PANO KURULUMU',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 167,
    category: ServiceCategory.ELECTRICAL,
    name: 'OTOMASYON KONTROL',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 168,
    category: ServiceCategory.SOFTWARE,
    name: 'REYONDA İZLEME YOK',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 169,
    category: ServiceCategory.OTHER,
    name: 'NAKLİYE',
    duration: 120,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 170,
    category: ServiceCategory.OTHER,
    name: 'ARAÇ MUAYENE',
    duration: 60,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 171,
    category: ServiceCategory.MECHANIC,
    name: 'ARAÇ BAKIM/ARIZA',
    duration: 180,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 172,
    category: ServiceCategory.ELECTRICAL,
    name: 'PRİZ ARIZASI',
    duration: 45,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 173,
    category: ServiceCategory.ELECTRICAL,
    name: 'CİHAZLARA ENERJİ GELMİYOR',
    duration: 90,
    status: ServiceStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
]; 