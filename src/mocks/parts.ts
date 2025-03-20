import { Part, PartUnit, PartStatus } from '../types/part';

export const mockParts: Part[] = [
  {
    id: 1,
    name: 'Kompresör',
    unit: PartUnit.ADET,
    price: 15000,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'Soğutucu Gaz R410a',
    unit: PartUnit.KILOGRAM,
    price: 800,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 3,
    name: 'Soğutma Suyu',
    unit: PartUnit.METREKUP,
    price: 250,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 4,
    name: 'Bakır Boru',
    unit: PartUnit.METRE,
    price: 350,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 5,
    name: 'Kompresör Yağı',
    unit: PartUnit.LITRE,
    price: 450,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 6,
    name: 'Kondenser',
    unit: PartUnit.ADET,
    price: 8000,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 7,
    name: 'Evaporatör',
    unit: PartUnit.ADET,
    price: 6000,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 8,
    name: 'Termostatik Genleşme Valfi',
    unit: PartUnit.ADET,
    price: 1200,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 9,
    name: 'Kuru Filtre',
    unit: PartUnit.ADET,
    price: 800,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 10,
    name: 'Görsel Göstergeler',
    unit: PartUnit.ADET,
    price: 400,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 11,
    name: 'Fan Motoru',
    unit: PartUnit.ADET,
    price: 2500,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 12,
    name: 'Fan Kanatları',
    unit: PartUnit.ADET,
    price: 1000,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 13,
    name: 'Kontrol Panosu',
    unit: PartUnit.ADET,
    price: 3500,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 14,
    name: 'Sensörler',
    unit: PartUnit.ADET,
    price: 300,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 15,
    name: 'İzolasyon Malzemesi',
    unit: PartUnit.METRE,
    price: 80,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 16,
    name: 'Yağ',
    unit: PartUnit.LITRE,
    price: 250,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 17,
    name: 'Kontaklar',
    unit: PartUnit.ADET,
    price: 150,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 18,
    name: 'Sigortalar',
    unit: PartUnit.ADET,
    price: 100,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 19,
    name: 'Kablolar',
    unit: PartUnit.METRE,
    price: 50,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 20,
    name: 'Vida ve Civatalar',
    unit: PartUnit.ADET,
    price: 5,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 21,
    name: 'Kauçuk Contalar',
    unit: PartUnit.METRE,
    price: 120,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 22,
    name: 'Termostat',
    unit: PartUnit.ADET,
    price: 900,
    status: PartStatus.ACTIVE,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
]; 