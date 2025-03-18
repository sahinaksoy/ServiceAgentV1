export enum PartUnit {
  PIECE = 'PIECE',
  KILOGRAM = 'KILOGRAM',
  CUBIC_METER = 'CUBIC_METER',
  METER = 'METER',
  LITER = 'LITER'
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
  [PartUnit.PIECE]: 'Adet',
  [PartUnit.KILOGRAM]: 'Kilogram',
  [PartUnit.CUBIC_METER]: 'Metreküp',
  [PartUnit.METER]: 'Metre',
  [PartUnit.LITER]: 'Litre'
};

export const partStatusLabels: Record<PartStatus, string> = {
  [PartStatus.ACTIVE]: 'Aktif',
  [PartStatus.PASSIVE]: 'Pasif'
}; 