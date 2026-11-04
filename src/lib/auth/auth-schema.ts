import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-posta adresi zorunludur' })
    .email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  password: z
    .string()
    .min(1, { message: 'Şifre alanı zorunludur' })
    .min(6, { message: 'Şifre en az 6 karakter olmalıdır' }),
  isAdmin: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const userSettingsSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: 'Görünen isim zorunludur' })
    .max(50, { message: 'Görünen isim en fazla 50 karakter olabilir' }),
  emailUpdates: z.boolean().default(true),
});

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>;

export const adminSettingsSchema = z.object({
  siteName: z
    .string()
    .min(1, { message: 'Platform adı zorunludur' })
    .max(50, { message: 'Platform adı en fazla 50 karakter olabilir' }),
  maintenanceMode: z.boolean().default(false),
  allowRegistration: z.boolean().default(true),
});

export type AdminSettingsFormData = z.infer<typeof adminSettingsSchema>;
