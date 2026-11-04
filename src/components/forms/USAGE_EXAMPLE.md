# Form Components Usage Guide

## Compound Components Pattern Implementation

This is a complete, production-ready form system using React Hook Form and Zod validation.

---

## Basic Usage

### 1. Simple Login Form

```tsx
import { z } from 'zod'
import { Form, TextField, CheckboxField, SubmitButton } from '@/components/forms'

// Define validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginForm() {
  const handleSubmit = async (data: LoginFormValues) => {
    console.log('Login data:', data)
    // API call here
  }

  return (
    <Form
      schema={loginSchema}
      defaultValues={{
        email: '',
        password: '',
        remember: false,
      }}
      onSubmit={handleSubmit}
      className='space-y-4 max-w-md'
    >
      <TextField
        name='email'
        label='Email'
        type='email'
        placeholder='you@example.com'
        required
        autoComplete='email'
      />

      <TextField
        name='password'
        label='Password'
        type='password'
        placeholder='Enter your password'
        required
        autoComplete='current-password'
      />

      <CheckboxField
        name='remember'
        label='Remember me'
      />

      <SubmitButton>
        Sign In
      </SubmitButton>
    </Form>
  )
}
```

---

## Advanced Usage

### 2. Complete Registration Form

```tsx
import { z } from 'zod'
import {
  Form,
  TextField,
  SelectField,
  TextareaField,
  CheckboxField,
  RadioField,
  DateField,
  SubmitButton,
} from '@/components/forms'

// Define validation schema
const registerSchema = z.object({
  // Text fields
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number').optional(),

  // Password with confirmation
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),

  // Select field
  country: z.string().min(1, 'Please select a country'),

  // Textarea
  bio: z.string().max(500, 'Bio must not exceed 500 characters').optional(),

  // Radio field
  accountType: z.enum(['personal', 'business']),

  // Date field
  birthDate: z.date({
    required_error: 'Please select your birth date',
  }),

  // Checkboxes
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof registerSchema>

function RegisterForm() {
  const handleSubmit = async (data: RegisterFormValues) => {
    console.log('Registration data:', data)
    // API call here
  }

  return (
    <Form
      schema={registerSchema}
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        country: '',
        bio: '',
        accountType: 'personal',
        birthDate: undefined,
        acceptTerms: false,
        newsletter: false,
      }}
      onSubmit={handleSubmit}
      className='space-y-6 max-w-2xl'
    >
      {/* Personal Information */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Personal Information</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <TextField
            name='firstName'
            label='First Name'
            placeholder='John'
            required
          />

          <TextField
            name='lastName'
            label='Last Name'
            placeholder='Doe'
            required
          />
        </div>

        <TextField
          name='email'
          label='Email'
          type='email'
          placeholder='john.doe@example.com'
          required
        />

        <TextField
          name='phone'
          label='Phone Number'
          type='tel'
          placeholder='+1234567890'
          description='Optional - include country code'
        />

        <DateField
          name='birthDate'
          label='Birth Date'
          required
          maxDate={new Date()}
        />

        <SelectField
          name='country'
          label='Country'
          required
          placeholder='Select your country'
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'tr', label: 'Turkey' },
            { value: 'de', label: 'Germany' },
          ]}
        />
      </div>

      {/* Account Information */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Account Information</h3>

        <RadioField
          name='accountType'
          label='Account Type'
          required
          orientation='horizontal'
          options={[
            {
              value: 'personal',
              label: 'Personal',
              description: 'For individual use',
            },
            {
              value: 'business',
              label: 'Business',
              description: 'For company or team use',
            },
          ]}
        />

        <TextField
          name='password'
          label='Password'
          type='password'
          required
          autoComplete='new-password'
        />

        <TextField
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          required
          autoComplete='new-password'
        />

        <TextareaField
          name='bio'
          label='Bio'
          placeholder='Tell us about yourself...'
          rows={4}
          maxLength={500}
          showCharCount
          description='Optional - max 500 characters'
        />
      </div>

      {/* Terms and Newsletter */}
      <div className='space-y-4'>
        <CheckboxField
          name='acceptTerms'
          label='I accept the terms and conditions'
          required
        />

        <CheckboxField
          name='newsletter'
          label='Subscribe to newsletter'
          description='Receive updates and news via email'
        />
      </div>

      <SubmitButton>
        Create Account
      </SubmitButton>
    </Form>
  )
}
```

---

## Component API

### Form

Base form component with FormProvider.

**Props:**

```typescript
interface FormProps<T extends FieldValues> {
  schema: ZodSchema<T>           // Zod validation schema
  defaultValues: DefaultValues<T> // Initial form values
  onSubmit: (data: T) => void | Promise<void> // Submit handler
  children: ReactNode             // Form fields
  className?: string              // Form wrapper className
  id?: string                     // Form element ID
}
```

---

### TextField

Text input field with validation.

**Props:**

```typescript
interface TextFieldProps {
  name: string                    // Field name (required)
  label: string                   // Field label (required)
  placeholder?: string            // Input placeholder
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number'
  required?: boolean              // Show required asterisk
  description?: string            // Help text below input
  className?: string              // Wrapper className
  disabled?: boolean              // Disable input
  autoComplete?: string           // HTML autocomplete attribute
  maxLength?: number              // Max character limit
  minLength?: number              // Min character limit
  pattern?: string                // HTML pattern attribute
}
```

**Example:**

```tsx
<TextField
  name='username'
  label='Username'
  placeholder='Enter username'
  required
  minLength={3}
  maxLength={20}
  description='3-20 characters, alphanumeric only'
/>
```

---

### SelectField

Dropdown select field with validation.

**Props:**

```typescript
interface SelectFieldProps {
  name: string                    // Field name (required)
  label: string                   // Field label (required)
  options: SelectOption[]         // Options array (required)
  placeholder?: string            // Placeholder text
  required?: boolean              // Show required asterisk
  description?: string            // Help text below select
  className?: string              // Wrapper className
  disabled?: boolean              // Disable select
  allowNone?: boolean             // Allow "None" option
  noneLabel?: string              // Label for "None" option
}

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}
```

**Example:**

```tsx
<SelectField
  name='role'
  label='Role'
  required
  placeholder='Select a role'
  allowNone
  noneLabel='No role'
  options={[
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'Regular User' },
    { value: 'guest', label: 'Guest', disabled: true },
  ]}
/>
```

---

### TextareaField

Multi-line textarea field with validation.

**Props:**

```typescript
interface TextareaFieldProps {
  name: string                    // Field name (required)
  label: string                   // Field label (required)
  placeholder?: string            // Textarea placeholder
  required?: boolean              // Show required asterisk
  description?: string            // Help text below textarea
  className?: string              // Wrapper className
  disabled?: boolean              // Disable textarea
  rows?: number                   // Number of visible rows (default: 4)
  maxLength?: number              // Max character limit
  showCharCount?: boolean         // Show character counter
}
```

**Example:**

```tsx
<TextareaField
  name='comment'
  label='Comment'
  placeholder='Leave a comment...'
  rows={6}
  maxLength={1000}
  showCharCount
  description='Share your thoughts'
/>
```

---

### CheckboxField

Checkbox field with validation.

**Props:**

```typescript
interface CheckboxFieldProps {
  name: string                    // Field name (required)
  label: string                   // Field label (required)
  description?: string            // Help text below checkbox
  className?: string              // Wrapper className
  disabled?: boolean              // Disable checkbox
  required?: boolean              // Show required asterisk
}
```

**Example:**

```tsx
<CheckboxField
  name='agreeToTerms'
  label='I agree to the terms of service'
  required
  description='You must agree to continue'
/>
```

---

### RadioField

Radio button group with validation.

**Props:**

```typescript
interface RadioFieldProps {
  name: string                    // Field name (required)
  label: string                   // Field label (required)
  options: RadioOption[]          // Options array (required)
  required?: boolean              // Show required asterisk
  description?: string            // Help text above radio group
  className?: string              // Wrapper className
  disabled?: boolean              // Disable all radios
  orientation?: 'vertical' | 'horizontal' // Layout direction
}

interface RadioOption {
  value: string
  label: string
  description?: string            // Optional description per option
  disabled?: boolean
}
```

**Example:**

```tsx
<RadioField
  name='plan'
  label='Choose a Plan'
  required
  orientation='vertical'
  options={[
    {
      value: 'free',
      label: 'Free',
      description: 'Basic features for personal use',
    },
    {
      value: 'pro',
      label: 'Pro',
      description: 'Advanced features for professionals',
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      description: 'Full features for teams',
      disabled: true,
    },
  ]}
/>
```

---

### DateField

Date picker field with validation.

**Props:**

```typescript
interface DateFieldProps {
  name: string                    // Field name (required)
  label: string                   // Field label (required)
  placeholder?: string            // Input placeholder
  required?: boolean              // Show required asterisk
  description?: string            // Help text below input
  className?: string              // Wrapper className
  disabled?: boolean              // Disable input
  minDate?: Date                  // Minimum selectable date
  maxDate?: Date                  // Maximum selectable date
  dateFormat?: string             // Date format string (default: 'yyyy-MM-dd')
}
```

**Example:**

```tsx
<DateField
  name='eventDate'
  label='Event Date'
  required
  minDate={new Date()}
  maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
  description='Select a date within the next 90 days'
/>
```

---

### SubmitButton

Submit button with loading state.

**Props:**

```typescript
interface SubmitButtonProps {
  children?: ReactNode            // Button text (default: 'Submit')
  loadingText?: string            // Text when submitting (default: 'Submitting...')
  className?: string              // Button className
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean              // Disable button
  disableIfNoChanges?: boolean    // Disable if form hasn't changed
  icon?: ReactNode                // Optional icon before text
}
```

**Example:**

```tsx
<SubmitButton
  variant='default'
  size='lg'
  icon={<Save className='w-4 h-4' />}
  disableIfNoChanges
>
  Save Changes
</SubmitButton>
```

---

## Advanced Patterns

### Nested Fields

Use dot notation for nested object fields:

```tsx
const schema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  settings: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  }),
})

<TextField name='user.name' label='Name' />
<TextField name='user.email' label='Email' type='email' />
<SelectField name='settings.theme' label='Theme' options={themeOptions} />
<CheckboxField name='settings.notifications' label='Enable Notifications' />
```

### Conditional Fields

```tsx
function ConditionalForm() {
  const { watch } = useFormContext()
  const accountType = watch('accountType')

  return (
    <>
      <RadioField
        name='accountType'
        label='Account Type'
        options={[
          { value: 'personal', label: 'Personal' },
          { value: 'business', label: 'Business' },
        ]}
      />

      {accountType === 'business' && (
        <TextField
          name='companyName'
          label='Company Name'
          required
        />
      )}
    </>
  )
}
```

### Dynamic Field Arrays

```tsx
import { useFieldArray } from 'react-hook-form'

function DynamicFieldsForm() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <TextField
            name={`items.${index}.name`}
            label={`Item ${index + 1}`}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={() => append({ name: '' })}>Add Item</Button>
    </>
  )
}
```

---

## Best Practices

### 1. Always use type-safe schemas

```tsx
// ✅ Good - Type inference from schema
const schema = z.object({ name: z.string() })
type FormValues = z.infer<typeof schema>

// ❌ Bad - Manual types can drift from schema
interface FormValues { name: string }
```

### 2. Provide meaningful validation messages

```tsx
// ✅ Good - Clear, actionable messages
z.string().min(8, 'Password must be at least 8 characters')

// ❌ Bad - Generic messages
z.string().min(8)
```

### 3. Use appropriate input types

```tsx
// ✅ Good - Correct type provides better UX
<TextField name='email' type='email' />
<TextField name='phone' type='tel' />
<TextField name='age' type='number' />

// ❌ Bad - Generic text type
<TextField name='email' type='text' />
```

### 4. Add descriptions for clarity

```tsx
<TextField
  name='username'
  label='Username'
  description='3-20 characters, letters and numbers only'
/>
```

### 5. Use disableIfNoChanges for edit forms

```tsx
<SubmitButton disableIfNoChanges>
  Save Changes
</SubmitButton>
```

---

## Integration with useFormChanged Hook

```tsx
import { useFormChanged } from '@/hooks/use-form-changed'
import { useFormContext } from '@/components/forms'

function MyForm() {
  const { watch } = useFormContext()
  const hasChanges = useFormChanged(watch, initialValues)

  return (
    <>
      {/* Form fields */}
      <SubmitButton disabled={!hasChanges}>
        Save Changes
      </SubmitButton>
    </>
  )
}
```

---

## TypeScript Support

All components are fully typed with TypeScript:

```tsx
import { z } from 'zod'
import type { SelectOption, RadioOption } from '@/components/forms'

// Schema with complex types
const schema = z.object({
  // ... your schema
})

// Type inference
type FormValues = z.infer<typeof schema>

// Typed submit handler
const handleSubmit = (data: FormValues) => {
  // data is fully typed
  console.log(data.email) // ✅ TypeScript knows this exists
  console.log(data.invalid) // ❌ TypeScript error
}
```

---

## Error Handling

Form errors are automatically handled by each field component:

```tsx
// Errors are displayed automatically
<TextField name='email' label='Email' />
// If validation fails, error message appears below input

// Manual error checking
import { useFormContext } from '@/components/forms'

function CustomComponent() {
  const { formState: { errors } } = useFormContext()

  if (errors.email) {
    console.log(errors.email.message)
  }
}
```

---

## Accessibility

All form components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Error announcements

---

## Common Validation Schemas

### Email
```tsx
z.string().email('Please enter a valid email address')
```

### Password
```tsx
z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
```

### URL
```tsx
z.string().url('Please enter a valid URL')
```

### Phone
```tsx
z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
```

### Required Checkbox
```tsx
z.literal(true, {
  errorMap: () => ({ message: 'You must accept this' })
})
```

---

## Summary

This form system provides:

✅ **Type-safe** forms with Zod validation
✅ **Zero prop drilling** with FormProvider/useFormContext
✅ **Reusable** components across your entire app
✅ **Accessible** by default
✅ **Mobile-friendly** with responsive design
✅ **Easy to use** with minimal boilerplate

**All components are production-ready and fully tested!**
