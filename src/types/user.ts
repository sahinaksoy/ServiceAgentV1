export type UserRole = 'admin' | 'manager' | 'user';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: UserRole[];
  status: UserStatus;
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
  region: string;
  company: string;
} 