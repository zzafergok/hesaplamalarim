/**
 * Formats a raw number or string value into Turkish currency input format.
 * Examples:
 *   1123 -> "1.123"
 *   1123.12 or "1123.12" or "1123,12" -> "1.123,12"
 *   1111123.5 -> "1.111.123,5"
 */
export function formatAmountInput(
  value: string | number | undefined | null,
): string {
  if (value === undefined || value === null || value === '') return '';

  const rawStr = String(value).trim();
  if (!rawStr) return '';

  // If string contains comma, split by comma; replace dots
  const hasComma = rawStr.includes(',');
  const hasDot = rawStr.includes('.');

  // If it's a JS number string like "1123.12" (without comma)
  let normalized = rawStr;
  if (!hasComma && hasDot) {
    // Check if dot is a decimal point or thousand separator
    const parts = rawStr.split('.');
    if (parts.length === 2 && parts[1].length <= 2) {
      normalized = `${parts[0]},${parts[1]}`;
    } else {
      normalized = rawStr.replace(/\./g, '');
    }
  }

  // Trailing comma/dot check (user typing "123,")
  const hasTrailingSeparator = rawStr.endsWith(',') || rawStr.endsWith('.');

  const cleanIntStr = normalized.split(',')[0].replace(/[^0-9]/g, '');
  const decStr = normalized.split(',')[1];

  if (!cleanIntStr && decStr === undefined) return '';

  const intNum = cleanIntStr ? BigInt(cleanIntStr) : BigInt(0);
  const intFormatted = new Intl.NumberFormat('tr-TR', {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(intNum);

  if (decStr !== undefined) {
    const cleanDec = decStr.replace(/[^0-9]/g, '').slice(0, 2);
    return `${intFormatted},${cleanDec}`;
  }

  if (hasTrailingSeparator) {
    return `${intFormatted},`;
  }

  return intFormatted;
}

/**
 * Parses a Turkish formatted currency string back to a numeric float value.
 * Examples:
 *   "1.123,12" -> 1123.12
 *   "1.111.123,5" -> 1111123.5
 *   "1.123" -> 1123
 */
export function parseAmountInput(
  formattedValue: string | number | undefined | null,
): number {
  if (
    formattedValue === undefined ||
    formattedValue === null ||
    formattedValue === ''
  )
    return 0;
  if (typeof formattedValue === 'number')
    return Number.isFinite(formattedValue) ? formattedValue : 0;

  const raw = String(formattedValue)
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}
