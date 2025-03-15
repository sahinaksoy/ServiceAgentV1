import { z } from 'zod';

export const customerSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyisim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(10, 'Telefon numarası en az 10 karakter olmalıdır'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
});

export type Customer = z.infer<typeof customerSchema>;

export type CustomerFormData = Omit<Customer, 'id'>; 