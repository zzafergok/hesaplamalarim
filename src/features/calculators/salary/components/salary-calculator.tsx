'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { AmountField, SelectField } from '@/components/forms';
import { MEVZUAT_2026 } from '@/config/payroll';
import {
  hesaplaBruttenNete,
  hesaplaNettenBrute,
} from '@/lib/calculators/salary';
import {
  SalaryFormValues,
  salaryFormSchema,
} from '@/lib/validations/salary-schema';
import { MaasOutput } from '@/types/payroll';
import { SalaryResultCard } from './salary-result-card';

const YON_OPTIONS = [
  { value: 'brutten-nete', label: 'Brütten Nete Hesaplama' },
  { value: 'netten-brute', label: 'Netten Brüte Hesaplama' },
];

export function SalaryCalculator() {
  const [result, setResult] = useState<MaasOutput | null>(null);

  const methods = useForm<SalaryFormValues>({
    resolver: zodResolver(salaryFormSchema),
    defaultValues: {
      hesaplamaYonu: 'brutten-nete',
      tutar: 50000,
      kumulatifMatrah: 0,
    },
  });

  const watchedYonu = useWatch({
    control: methods.control,
    name: 'hesaplamaYonu',
  });
  const hesaplamaYonu = watchedYonu ?? 'brutten-nete';

  const onSubmit = (values: SalaryFormValues) => {
    const tutar = Number(values.tutar);
    const kumulatif = Number(values.kumulatifMatrah || 0);

    const calculated =
      values.hesaplamaYonu === 'brutten-nete'
        ? hesaplaBruttenNete(tutar, kumulatif)
        : hesaplaNettenBrute(tutar, kumulatif);

    setResult(calculated);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Card className="border-gunmetal/70 bg-obsidian/95">
          <CardHeader>
            <CardTitle className="font-display text-heading-sm font-bold text-titanium">
              Maaş ve Bordro Hesaplama ({MEVZUAT_2026.yil})
            </CardTitle>
            <CardDescription className="font-sans text-caption font-normal italic text-ash">
              Kümülatif gelir vergisi dilimleri (%15 - %40), SGK işçi payı ve
              asgari ücret vergi muafiyeti detayları ile hesaplanır.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <SelectField
                  name="hesaplamaYonu"
                  label="Hesaplama Yönü"
                  options={YON_OPTIONS}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <AmountField
                    name="tutar"
                    label={
                      hesaplamaYonu === 'brutten-nete'
                        ? 'Aylık Brüt Maaş (TL)'
                        : 'Hedef Net Maaş (TL)'
                    }
                    placeholder="50.000"
                    required
                  />
                  <AmountField
                    name="kumulatifMatrah"
                    label="Yıl İçi Kümülatif Matrah (TL)"
                    placeholder="0"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-hesaplamalarim-blue font-sans text-body-sm font-bold text-primary-foreground hover:bg-hesaplamalarim-blue/90"
                >
                  Maaşı Hesapla
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        {result ? (
          <SalaryResultCard
            result={result}
            hesaplamaYonu={hesaplamaYonu}
          />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-xl border border-dashed border-gunmetal/70 bg-void-black/50 p-6 text-center font-sans text-caption font-normal italic text-ash">
            Maaş bilgisini girip &quot;Maaşı Hesapla&quot; butonuna tıklayarak
            ayrıntılı bordro dökümünü görebilirsiniz.
          </div>
        )}
      </div>
    </div>
  );
}
