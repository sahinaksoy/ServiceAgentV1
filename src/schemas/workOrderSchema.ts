import { z } from 'zod';
import { WorkOrderType } from '../types/workOrder';

export const workOrderSchema = z.object({
  type: z.enum(['emergency', 'maintenance', 'investment'] as const, {
    required_error: 'Arıza türü seçilmelidir',
  }),
  region: z.string()
    .min(2, 'Bölge seçilmelidir'),
  date: z.string()
    .min(1, 'Tarih seçilmelidir'),
  description: z.string()
    .min(10, 'Açıklama en az 10 karakter olmalıdır')
    .max(500, 'Açıklama en fazla 500 karakter olabilir'),
  assignedTo: z.string()
    .min(1, 'Atanacak kişi seçilmelidir'),
}); 