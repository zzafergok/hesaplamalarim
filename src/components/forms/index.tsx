'use client';

/**
 * Compound Components Pattern Form System
 *
 * A reusable, type-safe form system built with React Hook Form and Zod.
 *
 * @example
 * ```tsx
 * import { Form, TextField, SelectField, SubmitButton } from '@/components/forms'
 *
 * const schema = z.object({
 *   name: z.string().min(2),
 *   email: z.string().email(),
 * })
 *
 * function MyForm() {
 *   const handleSubmit = (data) => console.log(data)
 *
 *   return (
 *     <Form schema={schema} defaultValues={{ name: '', email: '' }} onSubmit={handleSubmit}>
 *       <TextField name="name" label="Name" required />
 *       <TextField name="email" label="Email" type="email" required />
 *       <SubmitButton>Submit</SubmitButton>
 *     </Form>
 *   )
 * }
 * ```
 */

// Base Form Component
export { Form, useFormContext } from './form';
export type { UseFormReturn, FieldValues } from './form';

// Field Components
export { TextField } from './text-field';
export { AmountField } from './amount-field';
export { DateField } from './date-field';
export { FileField } from './file-field';
export { RadioField } from './radio-field';
export { SelectField } from './select-field';
export { SwitchField } from './switch-field';
export { TextareaField } from './textarea-field';
export { CheckboxField } from './checkbox-field';
export { ChoiceCardField } from './choice-card-field';
export type { RadioOption } from './radio-field';
export type { SelectOption } from './select-field';
export type { ChoiceCardOption } from './choice-card-field';

// Button Component
export { SubmitButton } from './submit-button';

// Re-export commonly used types from react-hook-form
export type { FieldErrors, FieldError } from 'react-hook-form';
