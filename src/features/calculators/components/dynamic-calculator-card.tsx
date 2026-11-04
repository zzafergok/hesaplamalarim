'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, Star, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Link } from '@/components/core/link';
import {
  AmountField,
  DateField,
  SelectField,
  TextField,
} from '@/components/forms';
import { useMounted } from '@/hooks/use-mounted';
import { useGamificationStore } from '@/stores/use-gamification-store';
import {
  CalculatorDefinition,
  CalculatorExecutionResult,
  CalculatorFormRawValues,
} from '../registry/types';
import { buildCalculatorSchema } from './dynamic-calculator-schema';
import { DynamicResultCard } from './dynamic-result-card';

interface DynamicCalculatorCardProps {
  calculator: CalculatorDefinition;
  showFullPageLink?: boolean;
}

export function DynamicCalculatorCard({
  calculator,
  showFullPageLink = false,
}: DynamicCalculatorCardProps) {
  const mounted = useMounted();
  const recordCalculation = useGamificationStore((s) => s.recordCalculation);
  const favoriteIds = useGamificationStore((s) => s.favoriteIds);
  const toggleFavorite = useGamificationStore((s) => s.toggleFavorite);
  const isFavorite = mounted && favoriteIds.includes(calculator.id);

  const defaultValues = useMemo(() => {
    const acc: CalculatorFormRawValues = {};
    for (const f of calculator.fields) {
      acc[f.name] = f.defaultValue;
    }
    return acc;
  }, [calculator]);

  const schema = useMemo(
    () => buildCalculatorSchema(calculator.fields),
    [calculator.fields],
  );

  const methods = useForm<CalculatorFormRawValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [result, setResult] = useState<CalculatorExecutionResult>(() =>
    calculator.calculate(defaultValues),
  );
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    methods.reset(defaultValues);
    setResult(calculator.calculate(defaultValues));
  }, [calculator, defaultValues, methods]);

  const onSubmit = (values: CalculatorFormRawValues) => {
    const computed = calculator.calculate(values);
    setResult(computed);
    setTick((t) => t + 1);
    recordCalculation({
      calcId: calculator.id,
      categoryId: calculator.categoryId,
      title: calculator.shortTitle,
      primaryValue: computed.primaryValue,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Card className="relative overflow-hidden border-gunmetal/70 bg-obsidian/95 shadow-md backdrop-blur-md">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="space-y-1">
                <CardTitle className="font-display text-heading-sm font-bold text-titanium">
                  {calculator.title}
                </CardTitle>
                <CardDescription className="font-sans text-caption font-normal leading-relaxed text-ash">
                  {calculator.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFavorite(calculator.id)}
                  className={
                    isFavorite
                      ? 'border-tulpar-gold/60 bg-tulpar-gold/10 font-sans text-micro font-bold text-tulpar-gold'
                      : 'border-gunmetal/80 font-sans text-micro font-medium text-ash'
                  }
                >
                  <Star className="mr-1 h-3.5 w-3.5" />
                  {isFavorite ? 'Favorilerde' : 'Favorile'}
                </Button>
                {showFullPageLink && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="font-sans text-micro font-semibold"
                  >
                    <Link
                      href={`/hesaplamalar/${calculator.categoryId}/${calculator.id}`}
                    >
                      Özel Sayfa
                      <ExternalLink className="ml-1.5 h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            {calculator.legalNote && (
              <p className="mt-1 font-mono text-2xs font-medium italic text-tulpar-blue">
                {calculator.legalNote}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {calculator.fields.map((field) => {
                    if (field.type === 'select' && field.options) {
                      return (
                        <SelectField
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          options={field.options}
                          required={field.required}
                        />
                      );
                    }
                    if (field.type === 'date') {
                      return (
                        <DateField
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          required={field.required}
                        />
                      );
                    }
                    if (field.type === 'amount') {
                      return (
                        <AmountField
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      );
                    }
                    return (
                      <TextField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        type="number"
                        min={field.min}
                        max={field.max}
                        step={field.step ?? 'any'}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    );
                  })}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-tulpar-blue font-sans text-body-sm font-bold text-primary-foreground shadow-md hover:bg-tulpar-blue/90"
                >
                  <Zap className="mr-1.5 h-4 w-4" />
                  Hesapla ve +25 XP Kazan
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <DynamicResultCard result={result} calculationTick={tick} />
      </div>
    </div>
  );
}
