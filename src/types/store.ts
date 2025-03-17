export type StoreStatus = 'active' | 'inactive' | 'maintenance';

export interface Device {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  region: string;
  company: string;
  status: StoreStatus;
  authorizedName: string;
  authorizedPhone: string;
  employeeCount: number;
  devices: Device[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  region: string;
  company: string;
  status: StoreStatus;
  authorizedName: string;
  authorizedPhone: string;
  employeeCount: number;
  devices: Device[];
} 