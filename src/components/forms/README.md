# Form Components

## Overview

This directory contains reusable form components built with **React Hook Form** and **Zod** validation. All field components use the existing `@/components/core` components as their foundation.

## Architecture

- **Base Components**: All form fields use `@/components/core` components (Input, Select, Checkbox, etc.)
- **Form Provider**: Uses React Hook Form's `FormProvider` for zero prop drilling
- **Validation**: Zod schemas with automatic error handling
- **Type-Safe**: Full TypeScript support with type inference

## Available Components

| Component | Based On | Description |
|-----------|----------|-------------|
| `Form` | FormProvider | Base form wrapper with validation |
| `TextField` | `core/input` | Text input with validation |
| `SelectField` | `core/select` | Dropdown select with options |
| `TextareaField` | `core/textarea` | Multi-line text input |
| `CheckboxField` | `core/checkbox` | Checkbox input |
| `RadioField` | HTML radio | Radio button group |
| `SwitchField` | `core/switch` | Toggle switch input |
| `DateField` | `core/modern-date-picker` | Modern date picker with calendar |
| `SubmitButton` | `core/button` | Submit button with loading state |

## Quick Start

```tsx
import { z } from 'zod'
import { Form, TextField, SelectField, SubmitButton } from '@/components/forms'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(1, 'Please select a role'),
})

function MyForm() {
  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form
      schema={schema}
      defaultValues={{ name: '', role: '' }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <TextField name="name" label="Name" required />
      <SelectField
        name="role"
        label="Role"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ]}
      />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
```

## Key Features

✅ **Uses core components** - All fields built on top of existing `@/components/core`
✅ **Zero prop drilling** - FormProvider/useFormContext pattern
✅ **Type-safe** - Full TypeScript with Zod inference
✅ **Nested fields** - Supports dot notation (e.g., `user.email`)
✅ **Auto error handling** - Error messages from Zod schema
✅ **Responsive** - Mobile-first design
✅ **Accessible** - Built-in ARIA attributes
✅ **i18n ready** - Works with locale system

## Integration with useFormChanged

```tsx
import { useFormChanged } from '@/hooks/use-form-changed'
import { useFormContext } from '@/components/forms'

function EditForm({ initialData }) {
  const { watch } = useFormContext()
  const hasChanges = useFormChanged(watch, initialData)

  return (
    <SubmitButton disabled={!hasChanges}>
      Save Changes
    </SubmitButton>
  )
}
```

## Component Dependencies

```
forms/
├── form.tsx              → react-hook-form (FormProvider)
├── text-field.tsx        → core/input, core/label
├── select-field.tsx      → core/select, core/label
├── textarea-field.tsx    → core/textarea, core/label
├── checkbox-field.tsx    → core/checkbox, core/label
├── radio-field.tsx       → core/label (uses native radio)
├── switch-field.tsx      → core/switch, core/label
├── date-field.tsx        → core/modern-date-picker, core/label
└── submit-button.tsx     → core/button, core/loading-spinner
```

## Documentation

See [USAGE_EXAMPLE.md](./USAGE_EXAMPLE.md) for comprehensive examples and API documentation.

## Migration Notes

All form fields now use the core components from `@/components/core`:
- ✅ Consistent styling across the app
- ✅ Shared component logic
- ✅ Easier maintenance
- ✅ Better DX (Developer Experience)

If you need custom styling, extend the core components first, then use them here.
