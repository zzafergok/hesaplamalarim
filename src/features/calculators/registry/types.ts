export type CalculatorCategoryId =
  | 'finans'
  | 'bordro-vergi'
  | 'gunluk-alisveris'
  | 'saglik-beslenme'
  | 'gayrimenkul-hukuk'
  | 'zaman-takvim'
  | 'matematik-muhendislik';

export type CalculatorFieldType = 'amount' | 'number' | 'select' | 'date';

export interface CalculatorFieldOption {
  value: string;
  label: string;
}

export interface CalculatorFieldConfig {
  name: string;
  label: string;
  type: CalculatorFieldType;
  defaultValue: string | number;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
  options?: CalculatorFieldOption[];
}

export interface CalculatorResultMetric {
  label: string;
  value: string;
  tone?: 'default' | 'positive' | 'negative';
}

export interface CalculatorResultTable {
  headers: string[];
  rows: string[][];
}

export interface CalculatorExecutionResult {
  primaryLabel: string;
  primaryValue: string;
  primarySubtitle?: string;
  badge?: string;
  metrics: CalculatorResultMetric[];
  table?: CalculatorResultTable;
}

export type CalculatorFormRawValues = Record<string, string | number>;

export interface CalculatorDefinition {
  id: string;
  categoryId: CalculatorCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  legalNote?: string;
  fields: CalculatorFieldConfig[];
  calculate: (values: CalculatorFormRawValues) => CalculatorExecutionResult;
}

export interface CalculatorCategoryMeta {
  id: CalculatorCategoryId;
  title: string;
  shortTitle: string;
  description: string;
}

