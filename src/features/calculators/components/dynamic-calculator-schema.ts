import { z } from 'zod';
import { parseAmountInput } from '@/lib/utils';
import { CalculatorFieldConfig } from '../registry/types';

export function buildCalculatorSchema(fields: CalculatorFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    if (field.type === 'select' || field.type === 'date') {
      shape[field.name] = field.required
        ? z.string().min(1, `${field.label} alanı zorunludur`)
        : z.string().optional();
    } else {
      shape[field.name] = z
        .union([z.number(), z.string()])
        .refine(
          (val) => {
            if (!field.required && (val === '' || val === undefined)) {
              return true;
            }
            const parsed =
              typeof val === 'number'
                ? val
                : (parseAmountInput(String(val)) ?? Number(val));
            if (!Number.isFinite(parsed)) return false;
            if (field.min !== undefined && parsed < field.min) return false;
            if (field.max !== undefined && parsed > field.max) return false;
            return true;
          },
          {
            message:
              field.min !== undefined && field.max !== undefined
                ? `${field.label} (${field.min} - ${field.max}) aralığında olmalıdır`
                : field.min !== undefined
                  ? `${field.label} en az ${field.min} olmalıdır`
                  : `Geçerli bir ${field.label.toLowerCase()} giriniz`,
          },
        );
    }
  }

  return z.object(shape);
}

