import { z } from 'zod';

export const kidemFormSchema = z
  .object({
    iseGirisTarihi: z
      .string()
      .min(1, 'İşe giriş tarihi zorunludur')
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Geçerli bir tarih formatı (YYYY-AA-GG) giriniz'),
    istenCikisTarihi: z
      .string()
      .min(1, 'İşten çıkış tarihi zorunludur')
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Geçerli bir tarih formatı (YYYY-AA-GG) giriniz'),
    aylikBrutMaas: z
      .number({ invalid_type_error: 'Geçerli bir tutar giriniz' })
      .min(1, 'Aylık brüt maaş sıfırdan büyük olmalıdır'),
    aylikDuzenliYanHaklar: z
      .number({ invalid_type_error: 'Geçerli bir tutar giriniz' })
      .min(0, 'Yan haklar negatif olamaz')
      .default(0),
    dusulecekGunSayisi: z
      .number({ invalid_type_error: 'Geçerli bir gün sayısı giriniz' })
      .min(0, 'Düşülecek gün sayısı negatif olamaz')
      .default(0),
  })
  .refine(
    (data) => {
      if (!data.iseGirisTarihi || !data.istenCikisTarihi) return true;
      return data.istenCikisTarihi >= data.iseGirisTarihi;
    },
    {
      message: 'İşten çıkış tarihi, işe giriş tarihinden önce olamaz',
      path: ['istenCikisTarihi'],
    },
  );

export type KidemFormValues = z.infer<typeof kidemFormSchema>;

export const ihbarFormSchema = z.object({
  toplamGun: z
    .number({ invalid_type_error: 'Çalışma gün sayısı zorunludur' })
    .min(1, 'Çalışma süresi en az 1 gün olmalıdır'),
  giydirilmisBrutUcret: z
    .number({ invalid_type_error: 'Geçerli bir tutar giriniz' })
    .min(1, 'Giydirilmiş brüt ücret sıfırdan büyük olmalıdır'),
  gelirVergisiOrani: z
    .number()
    .min(0.15)
    .max(0.4)
    .default(0.15),
});

export type IhbarFormValues = z.infer<typeof ihbarFormSchema>;

