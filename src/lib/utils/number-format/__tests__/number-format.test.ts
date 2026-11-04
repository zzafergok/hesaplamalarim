import { describe, expect, it } from 'vitest';
import {
  formatAmountInput,
  formatCurrency,
  formatDuration,
  formatPercent,
  parseAmountInput,
  roundTo,
} from '../index';

describe('Number Formatting Utilities', () => {
  describe('formatCurrency', () => {
    it('should format numbers with currency symbol and defaults', () => {
      const result = formatCurrency(1250.5, { locale: 'tr' });
      // In tr locale, includes ₺ and 1.250,50
      expect(result).toContain('1.250,50');
    });

    it('should support compact notation for large numbers', () => {
      const result = formatCurrency(2500000, {
        compact: true,
        locale: 'tr',
        symbol: false,
      });
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle non-finite numbers safely', () => {
      expect(formatCurrency(NaN, { fallback: '-' })).toBe('-');
      expect(formatCurrency(Infinity, { fallback: 'N/A' })).toBe('N/A');
    });
  });

  describe('formatPercent', () => {
    it('should format percentage values with optional suffix and locale', () => {
      expect(formatPercent(45.5, { suffix: true, locale: 'tr' })).toBe(
        '45,50%',
      );
      expect(formatPercent(45.5, { suffix: false, locale: 'tr' })).toBe(
        '45,50',
      );
      expect(formatPercent(45.5, { suffix: true, locale: 'en' })).toBe(
        '45.50%',
      );
    });

    it('should clamp values between 0 and 100 by default', () => {
      expect(
        formatPercent(150, { clamp: true, suffix: true, locale: 'tr' }),
      ).toBe('100,00%');
      expect(
        formatPercent(-20, { clamp: true, suffix: true, locale: 'tr' }),
      ).toBe('0,00%');
      expect(
        formatPercent(150, { clamp: true, suffix: true, locale: 'en' }),
      ).toBe('100.00%');
    });
  });

  describe('formatDuration', () => {
    it('should format milliseconds to seconds', () => {
      expect(formatDuration(1500, { unit: 'milliseconds', suffix: true })).toBe(
        '1,5s',
      );
    });

    it('should support compact format for hours and minutes', () => {
      expect(formatDuration(3600, { unit: 'seconds', compact: true })).toContain(
        '1',
      );
    });
  });

  describe('formatAmountInput & parseAmountInput', () => {
    it('should format input strings to Turkish localized display', () => {
      expect(formatAmountInput('1123')).toBe('1.123');
      expect(formatAmountInput('1123,50')).toBe('1.123,50');
      expect(formatAmountInput('1111123.5')).toBe('1.111.123,5');
    });

    it('should parse Turkish formatted string back to float', () => {
      expect(parseAmountInput('1.123,50')).toBe(1123.5);
      expect(parseAmountInput('1.111.123,5')).toBe(1111123.5);
      expect(parseAmountInput('')).toBe(0);
      expect(parseAmountInput(null)).toBe(0);
    });
  });

  describe('roundTo', () => {
    it('should round numbers to specified decimal places', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.14159, 3)).toBe(3.142);
      expect(roundTo(NaN)).toBe(0);
    });
  });
});
