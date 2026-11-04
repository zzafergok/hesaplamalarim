'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Form, SubmitButton, SwitchField, TextField } from '@/components/forms';
import { toast } from '@/components/core/toast';
import {
  adminSettingsSchema,
  type AdminSettingsFormData,
} from '@/lib/auth/auth-schema';
import type { AdminSettingsCopy } from '../types';

interface AdminSettingsFormProps {
  copy: AdminSettingsCopy;
}

export function AdminSettingsForm({ copy }: AdminSettingsFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: AdminSettingsFormData) => {
    setLoading(true);
    try {
      // Simulating admin settings update
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success(
        `Platform ayarları kaydedildi: ${data.siteName} (Bakım modu: ${data.maintenanceMode ? 'Aktif' : 'Kapalı'})`,
      );
    } catch {
      toast.error('Platform ayarları kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      schema={adminSettingsSchema}
      defaultValues={{
        siteName: 'Tulpar Platform',
        maintenanceMode: false,
        allowRegistration: true,
      }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <TextField
        name="siteName"
        label={copy.appNameLabel}
        placeholder={copy.appNamePlaceholder}
        required
      />

      <div className="border border-gunmetal bg-void-black p-4">
        <SwitchField
          name="maintenanceMode"
          label={copy.maintenanceTitle}
          description={copy.maintenanceDescription}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        className="rounded-none font-bold uppercase tracking-widest"
      >
        <Save className="mr-2 h-4 w-4" />
        {copy.submitLabel}
      </SubmitButton>
    </Form>
  );
}
