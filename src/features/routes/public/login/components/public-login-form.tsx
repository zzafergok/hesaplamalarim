'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Form, SubmitButton, TextField } from '@/components/forms';
import { toast } from '@/components/core/toast';
import { loginSchema, type LoginFormData } from '@/lib/auth/auth-schema';
import { demoLoginCredentials } from '@/lib/auth/demo-credentials';
import type { PublicLoginCopy } from '../types';

interface PublicLoginFormProps {
  copy: PublicLoginCopy;
}

export function PublicLoginForm({ copy }: PublicLoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, isAdmin: false }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? 'Giriş yapılamadı');
        return;
      }

      toast.success(result.message ?? 'Giriş başarılı');
      router.push('/home');
      router.refresh();
    } catch {
      toast.error('Bağlantı hatası oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      schema={loginSchema}
      defaultValues={{ ...demoLoginCredentials.user, isAdmin: false }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <TextField
        name="email"
        label={copy.emailLabel}
        placeholder={copy.emailPlaceholder}
        type="email"
        required
      />
      <TextField
        name="password"
        label={copy.passwordLabel}
        placeholder={copy.passwordPlaceholder}
        type="password"
        required
      />
      <SubmitButton
        isLoading={loading}
        fullWidth
        className="rounded-none font-bold uppercase tracking-widest"
      >
        <LogIn className="mr-2 h-4 w-4" />
        {copy.submitLabel}
      </SubmitButton>
    </Form>
  );
}
