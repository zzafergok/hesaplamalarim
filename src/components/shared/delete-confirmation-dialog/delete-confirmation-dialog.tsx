'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/core/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/core/dialog';
import { cn } from '@/lib/utils';
import { useCurrentLocale } from '@/components/providers/client-locale-provider';
import { toBCP47Locale } from '@/i18n/routing';
import { DeleteAnimationStage } from './delete-animation-stage';
import { defaultCopy, wait } from './constants';
import type { DeleteConfirmationDialogProps, DeletePhase } from './types';

/** Shared destructive-action confirmation dialog for user-managed records. */
export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  entityLabel,
  itemName,
  title,
  description,
  itemLabel,
  details,
  warning,
  onConfirm,
}: DeleteConfirmationDialogProps) {
  const locale = useCurrentLocale();
  const bcp47Locale = toBCP47Locale(locale);
  const dialogCopy = defaultCopy[locale === 'tr' ? 'tr' : 'en'];

  const [phase, setPhase] = useState<DeletePhase>('idle');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isDeleting =
    phase === 'crumpling' || phase === 'tossing' || phase === 'waiting';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  const handleConfirm = async () => {
    if (isDeleting) return;

    const deletionResult = Promise.resolve()
      .then(() => onConfirm())
      .then(
        () => true,
        () => false,
      );

    if (prefersReducedMotion) {
      setPhase('waiting');
    } else {
      setPhase('crumpling');
      await wait(420);
      setPhase('tossing');
      await wait(760);
      setPhase('waiting');
    }

    const wasDeleted = await deletionResult;
    if (wasDeleted) {
      onOpenChange(false);
      return;
    }

    setPhase('error');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isDeleting) return;
    if (!nextOpen) setPhase('idle');
    onOpenChange(nextOpen);
  };

  const lowerEntityLabel = entityLabel.toLocaleLowerCase(bcp47Locale);
  const upperEntityLabel = entityLabel.toLocaleUpperCase(bcp47Locale);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        dismissible={!isDeleting}
        hideCloseButton
        className="z-[60] max-w-md overflow-hidden rounded-none border-alert-red/70 bg-obsidian p-0 font-mono shadow-2xl"
      >
        <div
          className={cn(
            'opacity-100 transition-[opacity,transform] duration-150 ease-out motion-reduce:transform-none motion-reduce:transition-none',
            isDeleting && 'pointer-events-none scale-[0.985] opacity-0',
          )}
          aria-hidden={isDeleting}
        >
          <DialogHeader className="border-b border-gunmetal p-6 text-left">
            <div className="mb-3 flex h-10 w-10 items-center justify-center border border-alert-red/60 bg-alert-red/10 text-alert-red">
              <Trash2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <DialogTitle className="text-left font-mono text-base font-bold uppercase tracking-wider text-titanium">
              {title ?? dialogCopy.titleConfirm.replace('{label}', entityLabel)}
            </DialogTitle>
            <DialogDescription className="pt-2 text-left font-mono text-xs leading-relaxed text-ash">
              {phase === 'error'
                ? dialogCopy.errorDescription
                : (description ??
                  dialogCopy.description.replace('{label}', lowerEntityLabel))}
            </DialogDescription>
          </DialogHeader>

          <div className="mx-6 border border-alert-red/30 bg-alert-red/5 px-4 py-3">
            <p className="text-2xs uppercase tracking-wider text-ash">
              {itemLabel ??
                dialogCopy.itemLabel.replace('{label}', lowerEntityLabel)}
            </p>
            <p className="mt-1 truncate text-sm font-bold uppercase tracking-wide text-alert-red">
              {itemName}
            </p>
            {details && details.length > 0 && (
              <dl className="mt-3 grid gap-2 border-t border-alert-red/20 pt-3 text-xs sm:grid-cols-2">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-2xs uppercase tracking-wider text-ash">
                      {detail.label}
                    </dt>
                    <dd className="mt-0.5 font-bold text-titanium">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {warning && (
            <p className="mx-6 border border-alert-red/30 bg-alert-red/10 px-4 py-3 text-xs leading-relaxed text-alert-red">
              {warning}
            </p>
          )}

          <DialogFooter className="border-t border-gunmetal px-6 py-4 sm:space-x-3">
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => handleOpenChange(false)}
              className="rounded-none border border-gunmetal bg-void-black px-5 py-2.5 font-mono text-xs font-bold uppercase text-ash hover:border-ash hover:bg-void-black hover:text-titanium"
            >
              {dialogCopy.cancel}
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleConfirm}
              className="rounded-none border border-alert-red bg-alert-red px-5 py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-red-600"
            >
              {isDeleting ? dialogCopy.deleting : dialogCopy.confirm}
            </Button>
          </DialogFooter>
        </div>

        {isDeleting && (
          <DeleteAnimationStage
            itemName={itemName}
            upperEntityLabel={upperEntityLabel}
            phase={phase}
            dialogCopy={dialogCopy}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
