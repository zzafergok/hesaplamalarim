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
import { AmountField, DateField, TextField } from '@/components/forms';
import { MEVZUAT_2026 } from '@/config/payroll';
import { hesaplaKidemTazminati } from '@/lib/calculators/severance';
import {
  KidemFormValues,
  kidemFormSchema,
} from '@/lib/validations/severance-schema';
import { KidemOutput } from '@/types/severance';
import { KidemResultCard } from './kidem-result-card';

export function KidemCalculator() {
  const [result, setResult] = useState<KidemOutput | null>(null);

  const methods = useForm<KidemFormValues>({
    resolver: zodResolver(kidemFormSchema),
    defaultValues: {
      iseGirisTarihi: '2023-01-01',
      istenCikisTarihi: new Date().toISOString().split('T')[0],
      aylikBrutMaas: 45000,
      aylikDuzenliYanHaklar: 5000,
      dusulecekGunSayisi: 0,
    },
  });

  const onSubmit = (values: KidemFormValues) => {
    const calculated = hesaplaKidemTazminati({
      iseGirisTarihi: values.iseGirisTarihi,
      istenCikisTarihi: values.istenCikisTarihi,
      aylikBrutMaas: Number(values.aylikBrutMaas),
      aylikDuzenliYanHaklar: Number(values.aylikDuzenliYanHaklar || 0),
      dusulecekGunSayisi: Number(values.dusulecekGunSayisi || 0),
    });
    setResult(calculated);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Card className="border-gunmetal/70 bg-obsidian/95">
          <CardHeader>
            <CardTitle className="font-display text-heading-sm font-bold text-titanium">
              Kıdem Tazminatı Hesaplama
            </CardTitle>
            <CardDescription className="font-sans text-caption font-normal italic text-ash">
              4857 Sayılı İş Kanunu ve {MEVZUAT_2026.yil} tavanı (
              {MEVZUAT_2026.kidemTavani.toLocaleString('tr-TR')} TL) baz
              alınarak hesaplanır.
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
                  <DateField
                    name="iseGirisTarihi"
                    label="İşe Giriş Tarihi"
                    required
                  />
                  <DateField
                    name="istenCikisTarihi"
                    label="İşten Çıkış Tarihi"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <AmountField
                    name="aylikBrutMaas"
                    label="Aylık Son Brüt Maaş (TL)"
                    placeholder="45.000"
                    required
                  />
                  <AmountField
                    name="aylikDuzenliYanHaklar"
                    label="Aylık Yan Haklar (Yol, Yemek vb.)"
                    placeholder="5.000"
                  />
                </div>

                <TextField
                  name="dusulecekGunSayisi"
                  label="Düşülecek Gün (Ücretsiz İzin vb.)"
                  type="number"
                  placeholder="0"
                />

                <Button
                  type="submit"
                  className="w-full bg-tulpar-blue font-sans text-body-sm font-bold text-primary-foreground hover:bg-tulpar-blue/90"
                >
                  Kıdem Tazminatını Hesapla
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        {result ? (
          <KidemResultCard result={result} />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-xl border border-dashed border-gunmetal/70 bg-void-black/50 p-6 text-center font-sans text-caption font-normal italic text-ash">
            Bilgileri doldurup &quot;Kıdem Tazminatını Hesapla&quot; butonuna
            tıklayarak ayrıntılı dökümü görebilirsiniz.
          </div>
        )}
      </div>
    </div>
  );
}
