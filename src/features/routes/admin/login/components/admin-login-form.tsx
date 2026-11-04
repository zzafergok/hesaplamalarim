'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import { Form, SubmitButton, TextField } from '@/components/forms';
import { toast } from '@/components/core/toast';
import { loginSchema, type LoginFormData } from '@/lib/auth/auth-schema';
import { demoLoginCredentials } from '@/lib/auth/demo-credentials';
import type { AdminLoginCopy } from '../types';

interface AdminLoginFormProps {
  copy: AdminLoginCopy;
}

export function AdminLoginForm({ copy }: AdminLoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, isAdmin: true }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? 'Yönetici girişi yapılamadı');
        return;
      }

      toast.success(result.message ?? 'Yönetici girişi başarılı');
      router.push('/admin');
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
      defaultValues={{ ...demoLoginCredentials.admin, isAdmin: true }}
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
        <Shield className="mr-2 h-4 w-4" />
        {copy.submitLabel}
      </SubmitButton>
    </Form>
  );
}
