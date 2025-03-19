export enum PartUnit {
  ADET = 'ADET',
  KILOGRAM = 'KILOGRAM',
  METREKUP = 'METREKUP',
  METRE = 'METRE',
  LITRE = 'LITRE'
}

export enum PartStatus {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE'
}

export interface Part {
  id: number;
  name: string;
  description?: string;
  unit: PartUnit;
  price: number;
  status: PartStatus;
  createdAt: string;
  updatedAt: string;
}

export const partUnitLabels: Record<PartUnit, string> = {
  [PartUnit.ADET]: 'Adet',
  [PartUnit.KILOGRAM]: 'Kilogram',
  [PartUnit.METREKUP]: 'Metreküp',
  [PartUnit.METRE]: 'Metre',
  [PartUnit.LITRE]: 'Litre'
};

export const partStatusLabels: Record<PartStatus, string> = {
  [PartStatus.ACTIVE]: 'Aktif',
  [PartStatus.PASSIVE]: 'Pasif'
}; 