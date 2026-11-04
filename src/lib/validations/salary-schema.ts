import { z } from 'zod';

export const salaryFormSchema = z.object({
  hesaplamaYonu: z.enum(['brutten-nete', 'netten-brute']).default('brutten-nete'),
  tutar: z
    .number({ invalid_type_error: 'Geçerli bir tutar giriniz' })
    .min(1, 'Maaş tutarı sıfırdan büyük olmalıdır'),
  kumulatifMatrah: z
    .number({ invalid_type_error: 'Geçerli bir matrah giriniz' })
    .min(0, 'Kümülatif matrah negatif olamaz')
    .default(0),
});

export type SalaryFormValues = z.infer<typeof salaryFormSchema>;

