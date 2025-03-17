export type UserRole = 
  | 'field_employee'        // Saha Çalışanı (eski: meser_employee)
  | 'team_lead'            // Ekip Şefi (eski: meser_team_lead)
  | 'monitoring_unit'      // İzleme Birimi
  | 'contractor_manager'   // Taşeron Firma Şefi
  | 'contractor_employee'  // Taşeron Firma Çalışanı
  | 'director'            // Müdür
  | 'manager'             // Yönetici
  | 'engineer';           // Mühendis

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

export const roleLabels: Record<UserRole, string> = {
  field_employee: 'Saha Çalışanı',
  team_lead: 'Ekip Şefi',
  monitoring_unit: 'İzleme Birimi',
  contractor_manager: 'Taşeron Firma Şefi',
  contractor_employee: 'Taşeron Firma Çalışanı',
  director: 'Müdür',
  manager: 'Yönetici',
  engineer: 'Mühendis'
}; 