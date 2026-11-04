'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs';
import { IhbarCalculator } from './ihbar-calculator';
import { KidemCalculator } from './kidem-calculator';

export function SeveranceTabs() {
  return (
    <Tabs defaultValue="kidem" className="w-full">
      <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 bg-gunmetal/60">
        <TabsTrigger value="kidem" className="text-xs sm:text-sm">
          Kıdem Tazminatı
        </TabsTrigger>
        <TabsTrigger value="ihbar" className="text-xs sm:text-sm">
          İhbar Tazminatı
        </TabsTrigger>
      </TabsList>

      <TabsContent value="kidem">
        <KidemCalculator />
      </TabsContent>

      <TabsContent value="ihbar">
        <IhbarCalculator />
      </TabsContent>
    </Tabs>
  );
}

