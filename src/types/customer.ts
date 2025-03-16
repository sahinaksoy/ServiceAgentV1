export type CustomerStatus = 'active' | 'inactive';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export type CustomerFormData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>; 