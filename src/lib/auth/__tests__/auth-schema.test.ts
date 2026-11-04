import { describe, expect, it } from 'vitest';
import {
  adminSettingsSchema,
  loginSchema,
  userSettingsSchema,
} from '../auth-schema';

describe('Auth Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate valid user credentials', () => {
      const validData = {
        email: 'pilot@tulpar.space',
        password: 'securePassword123',
        isAdmin: false,
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('pilot@tulpar.space');
        expect(result.data.isAdmin).toBe(false);
      }
    });

    it('should default isAdmin to false when omitted', () => {
      const validData = {
        email: 'user@tulpar.space',
        password: 'password123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isAdmin).toBe(false);
      }
    });

    it('should reject invalid email formats', () => {
      const invalidData = {
        email: 'invalid-email-format',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe(
          'Geçerli bir e-posta adresi giriniz',
        );
      }
    });

    it('should reject short passwords', () => {
      const invalidData = {
        email: 'user@tulpar.space',
        password: '123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe(
          'Şifre en az 6 karakter olmalıdır',
        );
      }
    });
  });

  describe('userSettingsSchema', () => {
    it('should validate proper user settings', () => {
      const valid = {
        displayName: 'Tulpar Pilot',
        emailUpdates: true,
      };

      const result = userSettingsSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('should reject empty display name', () => {
      const invalid = {
        displayName: '',
        emailUpdates: false,
      };

      const result = userSettingsSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('adminSettingsSchema', () => {
    it('should validate proper admin platform configuration', () => {
      const valid = {
        siteName: 'Tulpar Enterprise Platform',
        maintenanceMode: true,
        allowRegistration: false,
      };

      const result = adminSettingsSchema.safeParse(valid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.siteName).toBe('Tulpar Enterprise Platform');
        expect(result.data.maintenanceMode).toBe(true);
      }
    });
  });
});
