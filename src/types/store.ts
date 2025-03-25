export type StoreStatus = 'active' | 'inactive' | 'maintenance';

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'warning' | 'error' | 'maintenance';
  serialNumber: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  zone: string;
  company: string;
  status: StoreStatus;
  manager: string;
  managerPhone: string;
  devices: Device[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreFormData {
  name: string;
  address: string;
  city: string;
  region: string;
  zone: string;
  company: string;
  status: StoreStatus;
  manager: string;
  managerPhone: string;
  devices: Device[];
} 