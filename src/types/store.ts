export type StoreStatus = 'active' | 'inactive' | 'maintenance';

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  region: string;
  company: string;
  status: StoreStatus;
  manager: string;
  managerPhone: string;
  employeeCount: number;
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
  manager: string;
  managerPhone: string;
  employeeCount: number;
} 