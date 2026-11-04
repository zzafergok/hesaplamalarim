'use client';

import * as React from 'react';
import {
  useForm,
  FieldValues,
  FormProvider,
  UseFormReturn,
  DefaultValues,
  Resolver,
} from 'react-hook-form';
import { ZodTypeAny } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface FormProps<T extends FieldValues> {
  id?: string;
  className?: string;
  autoComplete?: 'on' | 'off';
  children: React.ReactNode;
  schema: ZodTypeAny;
  defaultValues?: DefaultValues<T>;
  methods?: UseFormReturn<T>;
  onKeyDown?: React.KeyboardEventHandler<HTMLFormElement>;
  onSubmit: (
    data: T,
    methods: UseFormReturn<T>,
  ) => void | Promise<void>;
}

export function Form<T extends FieldValues>({
  id,
  schema,
  onSubmit,
  children,
  className,
  autoComplete,
  defaultValues,
  methods: externalMethods,
  onKeyDown,
}: FormProps<T>) {
  const internalMethods = useForm<T>({
    resolver: zodResolver(
      schema as unknown as Parameters<typeof zodResolver>[0],
    ) as Resolver<T>,
    defaultValues,
    mode: 'onChange',
  });

  const methods: UseFormReturn<T> = externalMethods ?? internalMethods;

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        onKeyDown={onKeyDown}
        className={className}
        autoComplete={autoComplete}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export { useFormContext } from 'react-hook-form';
export type { UseFormReturn, FieldValues };
