import { z } from 'zod';

export const storeSchema = z.object({
  name: z.string()
    .min(2, 'Mağaza adı en az 2 karakter olmalıdır')
    .max(100, 'Mağaza adı en fazla 100 karakter olabilir'),
  address: z.string()
    .min(10, 'Adres en az 10 karakter olmalıdır')
    .max(200, 'Adres en fazla 200 karakter olabilir'),
  phone: z.string()
    .regex(/^(\+90|0)?[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz'),
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz'),
  region: z.string()
    .min(2, 'Bölge seçilmelidir'),
  company: z.string()
    .min(2, 'Şirket seçilmelidir'),
  status: z.enum(['active', 'inactive', 'maintenance'] as const),
  manager: z.string()
    .min(2, 'Yönetici adı en az 2 karakter olmalıdır')
    .max(100, 'Yönetici adı en fazla 100 karakter olabilir')
}); 