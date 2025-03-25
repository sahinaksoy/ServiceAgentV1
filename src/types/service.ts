export enum ServiceCategory {
  MECHANIC = 'MECHANIC',
  ELECTRICAL = 'ELECTRICAL'
}

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE'
}

export interface Service {
  id: number;
  name: string;
  category: string;
  description?: string;
  duration: number; // dakika cinsinden
  price: number;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  [ServiceCategory.MECHANIC]: 'Mekanik',
  [ServiceCategory.ELECTRICAL]: 'Elektrik'
};

export const serviceStatusLabels: Record<ServiceStatus, string> = {
  [ServiceStatus.ACTIVE]: 'Aktif',
  [ServiceStatus.PASSIVE]: 'Pasif'
}; 