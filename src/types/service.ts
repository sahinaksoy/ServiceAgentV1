export enum ServiceCategory {
  MECHANIC = 'MECHANIC',
  ELECTRICAL = 'ELECTRICAL',
  INSTALLATION = 'INSTALLATION',
  SOFTWARE = 'SOFTWARE',
  MARKETING = 'MARKETING',
  OTHER = 'OTHER'
}

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE'
}

export interface Service {
  id: number;
  category: ServiceCategory;
  name: string;
  duration: number; // dakika cinsinden
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  [ServiceCategory.MECHANIC]: 'Mekanik',
  [ServiceCategory.ELECTRICAL]: 'Elektrik',
  [ServiceCategory.INSTALLATION]: 'Kurulum',
  [ServiceCategory.SOFTWARE]: 'Yazılım',
  [ServiceCategory.MARKETING]: 'Pazarlama',
  [ServiceCategory.OTHER]: 'Diğer'
};

export const serviceStatusLabels: Record<ServiceStatus, string> = {
  [ServiceStatus.ACTIVE]: 'Aktif',
  [ServiceStatus.PASSIVE]: 'Pasif'
}; 