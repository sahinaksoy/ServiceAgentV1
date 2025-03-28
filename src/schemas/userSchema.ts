import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir'),
  lastName: z.string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir'),
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string()
    .regex(/^(\+90|0)?[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz'),
  roles: z.array(z.enum(['saha_calisani', 'ekip_sefi', 'muhendis', 'yonetici', 'taseron_saha_calisani', 'taseron_ekip_sefi', 'admin'] as const))
    .min(1, 'En az bir rol seçilmelidir'),
  status: z.enum(['active', 'inactive', 'pending'] as const),
  city: z.string()
    .min(2, 'İl seçilmelidir'),
  district: z.string()
    .min(2, 'İlçe seçilmelidir'),
  region: z.string()
    .min(2, 'Bölge seçilmelidir'),
  company: z.string()
    .min(2, 'Şirket seçilmelidir'),
}); 