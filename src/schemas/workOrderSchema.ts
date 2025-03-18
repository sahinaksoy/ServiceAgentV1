import { z } from 'zod';

export const workOrderSchema = z.object({
  summary: z.string()
    .min(10, 'Özet en az 10 karakter olmalıdır')
    .max(500, 'Özet en fazla 500 karakter olabilir'),
  priority: z.enum(['high', 'medium', 'low'] as const, {
    required_error: 'Öncelik seçilmelidir',
  }),
  type: z.enum(['emergency', 'maintenance', 'renovation', 'additional', 'investment'] as const, {
    required_error: 'İş emri tipi seçilmelidir',
  }),
  category: z.enum(['mechanical', 'electrical', 'sensor', 'maintenance', 'temperature', 'glass', 'water', 'monitoring'] as const, {
    required_error: 'Kategori seçilmelidir',
  }),
  dueDate: z.string()
    .min(1, 'Son tarih seçilmelidir'),
  company: z.string()
    .min(1, 'Firma seçilmelidir'),
  contact: z.string()
    .min(1, 'İletişim kişisi seçilmelidir'),
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .optional()
    .or(z.literal('')),
  mobile: z.string()
    .min(10, 'Mobil numara en az 10 karakter olmalıdır')
    .optional()
    .or(z.literal('')),
  serviceAddress: z.string()
    .min(10, 'Servis adresi en az 10 karakter olmalıdır')
    .max(500, 'Servis adresi en fazla 500 karakter olabilir'),
  preferredDate1: z.string()
    .optional()
    .or(z.literal('')),
  assignedTo: z.string()
    .optional()
    .or(z.literal('')),
  services: z.array(z.number())
    .min(1, 'En az bir servis seçilmelidir'),
}); 