import { z } from 'zod';

export type CustomerStatus = 'active' | 'inactive';

export const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'İsim alanı zorunludur'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(1, 'Telefon alanı zorunludur'),
  mobile: z.string().min(1, 'Cep telefon alanı zorunludur'),
  contactPerson: z.string().min(1, 'İletişim kişisi alanı zorunludur'),
  address: z.string().min(1, 'Adres alanı zorunludur'),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  contactPerson: string;
  address: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export type CustomerFormData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>; 