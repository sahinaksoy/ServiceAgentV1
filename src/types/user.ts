export type UserRole = 'saha_calisani' | 'ekip_sefi' | 'muhendis' | 'yonetici' | 'taseron_saha_calisani' | 'taseron_ekip_sefi' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: UserRole[];
  status: UserStatus;
  city: string;
  district: string;
  region: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: UserRole[];
  status: UserStatus;
  city: string;
  district: string;
  region: string;
  company: string;
} 