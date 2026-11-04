'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { AmountField, SelectField, TextField } from '@/components/forms';
import { hesaplaIhbarTazminati } from '@/lib/calculators/severance';
import {
  IhbarFormValues,
  ihbarFormSchema,
} from '@/lib/validations/severance-schema';
import { IhbarOutput } from '@/types/severance';
import { IhbarResultCard } from './ihbar-result-card';

const VERGI_ORANLARI = [
  { value: '0.15', label: '%15 (Varsayılan / İlk Dilim)' },
  { value: '0.20', label: '%20 (İkinci Dilim)' },
  { value: '0.27', label: '%27 (Üçüncü Dilim)' },
  { value: '0.35', label: '%35 (Dördüncü Dilim)' },
];

export function IhbarCalculator() {
  const [result, setResult] = useState<IhbarOutput | null>(null);

  const methods = useForm<IhbarFormValues>({
    resolver: zodResolver(ihbarFormSchema),
    defaultValues: {
      toplamGun: 730,
      giydirilmisBrutUcret: 45000,
      gelirVergisiOrani: 0.15,
    },
  });

  const onSubmit = (values: IhbarFormValues) => {
    const calculated = hesaplaIhbarTazminati(
      {
        toplamGun: Number(values.toplamGun),
        giydirilmisBrutUcret: Number(values.giydirilmisBrutUcret),
      },
      Number(values.gelirVergisiOrani || 0.15),
    );
    setResult(calculated);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Card className="border-gunmetal/70 bg-obsidian/95">
          <CardHeader>
            <CardTitle className="font-display text-heading-sm font-bold text-titanium">
              İhbar Tazminatı Hesaplama
            </CardTitle>
            <CardDescription className="font-sans text-caption font-normal italic text-ash">
              Çalışma süresine göre 2, 4, 6 veya 8 haftalık brüt ücret üzerinden
              gelir ve damga vergisi kesilerek hesaplanır.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField
                    name="toplamGun"
                    label="Toplam Çalışılan Gün"
                    type="number"
                    placeholder="730"
                    required
                  />
                  <AmountField
                    name="giydirilmisBrutUcret"
                    label="Giydirilmiş Brüt Ücret (TL)"
                    placeholder="45.000"
                    required
                  />
                </div>

                <SelectField
                  name="gelirVergisiOrani"
                  label="Uygulanacak Gelir Vergisi Dilimi"
                  options={VERGI_ORANLARI}
                />

                <Button
                  type="submit"
                  className="w-full bg-tulpar-blue font-sans text-body-sm font-bold text-primary-foreground hover:bg-tulpar-blue/90"
                >
                  İhbar Tazminatını Hesapla
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        {result ? (
          <IhbarResultCard result={result} />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-xl border border-dashed border-gunmetal/70 bg-void-black/50 p-6 text-center font-sans text-caption font-normal italic text-ash">
            Bilgileri girip &quot;İhbar Tazminatını Hesapla&quot; butonuna
            tıklayarak ayrıntılı dökümü görebilirsiniz.
          </div>
        )}
      </div>
    </div>
  );
}
