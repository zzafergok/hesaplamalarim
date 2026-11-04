'use client';

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './index';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';

export function AccordionExample() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 p-6">
      {/* 1. Basic Accordion */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-hesaplamalarim-blue">
          1. Basic (Single & Collapsible)
        </h3>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Eriþilebilirlik standartlarýna uygun mu?
            </AccordionTrigger>
            <AccordionContent>
              Evet. Radix UI primitives kullanýlarak WAI-ARIA standartlarýna ve
              klavye gezinim kurallarýna tam uyumlu olarak geliþtirilmiþtir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Özelleþtirilebilir mi?</AccordionTrigger>
            <AccordionContent>
              Kesinlikle. Hesaplamalarým brutalist tasarým tokenlarý ve Tailwind
              sýnýflarý ile kolayca özelleþtirilebilir.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 2. Multiple Accordion */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-hesaplamalarim-blue">
          2. Multiple (Çoklu Açýlýþ)
        </h3>
        <Accordion type="multiple" defaultValue={['multi-1']}>
          <AccordionItem value="multi-1">
            <AccordionTrigger>Ayný anda birden fazla sekme açýlabilir mi?</AccordionTrigger>
            <AccordionContent>
              Evet, çoklu seçim modu sayesinde kullanýcý dilediði kadar sekmeyi açýk býrakabilir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="multi-2">
            <AccordionTrigger>Animasyon performansý nasýldýr?</AccordionTrigger>
            <AccordionContent>
              CSS keyframe tabanlý donaným hýzlandýrmalý animasyonlar
              (`accordion-down` / `accordion-up`) kullanýlýr.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 3. Disabled Item */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-hesaplamalarim-blue">
          3. Disabled (Devre Dýþý Öðe)
        </h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="active-1">
            <AccordionTrigger>Aktif Öðe</AccordionTrigger>
            <AccordionContent>
              Bu öðe týklanabilir ve açýlýp kapanabilir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="disabled-1" disabled>
            <AccordionTrigger>Devre Dýþý Öðe (Disabled)</AccordionTrigger>
            <AccordionContent>
              Bu içerik açýlmaz çünkü öðe devre dýþýdýr.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 4. Borders Variant */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-hesaplamalarim-blue">
          4. Borders (Kenarlýklý Varyant)
        </h3>
        <Accordion
          type="single"
          collapsible
          className="rounded-sm border border-gunmetal/30 px-4"
        >
          <AccordionItem value="border-1">
            <AccordionTrigger>Kenarlýklý Kutu Yapýsý</AccordionTrigger>
            <AccordionContent>
              Kök elemana `border` ve `rounded-sm` eklenerek çerçeveli bir kutu
              görünümü elde edilir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="border-2">
            <AccordionTrigger>Son Öðe Kenarlýk Davranýþý</AccordionTrigger>
            <AccordionContent>
              `last:border-b-0` sýnýfý ile son öðenin alt çizgisi temizlenir.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 5. Card Wrapped */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-hesaplamalarim-blue">
          5. Card Ýçinde Kullaným
        </h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Sýkça Sorulan Sorular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="card-1">
                <AccordionTrigger>
                  Hesaplamalarým bileþen mimarisi nasýldýr?
                </AccordionTrigger>
                <AccordionContent>
                  Her bileþen 250 satýr kuralýna, modüler TypeScript mimarisine
                  ve Radix UI eriþilebilirlik standartlarýna uyar.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

