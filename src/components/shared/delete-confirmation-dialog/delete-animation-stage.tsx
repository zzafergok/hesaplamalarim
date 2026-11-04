'use client';

import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DeletePhase } from './types';

interface DeleteAnimationStageProps {
  itemName: string;
  upperEntityLabel: string;
  phase: DeletePhase;
  dialogCopy: {
    deleting: string;
    deletingStatus: string;
    movingToTrashText: string;
    completingText: string;
  };
}

export function DeleteAnimationStage({
  itemName,
  upperEntityLabel,
  phase,
  dialogCopy,
}: DeleteAnimationStageProps) {
  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden bg-obsidian [background-image:linear-gradient(hsl(var(--gunmetal)/0.18)_1px,transparent_1px)] [background-size:100%_24px]"
      role="status"
      aria-live="polite"
      aria-label={`${itemName} ${dialogCopy.deleting}`}
    >
      <div
        className={cn(
          'absolute left-1/2 top-[42%] flex min-h-[112px] w-[68%] -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-[7px] overflow-hidden border border-alert-red/65 bg-void-black p-[18px] text-center text-titanium shadow-[8px_9px_0_hsl(var(--alert-red)/0.12)] motion-reduce:animate-none motion-reduce:transition-none',
          phase === 'crumpling' && 'animate-paper-crumple',
          phase === 'tossing' && 'animate-paper-toss',
          phase === 'waiting' &&
            'translate-x-[120%] translate-y-[92%] rotate-[286deg] scale-[0.12] opacity-0',
        )}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-alert-red">
          {dialogCopy.deletingStatus}
        </span>
        <strong className="truncate font-mono text-[13px] uppercase text-titanium">
          {itemName}
        </strong>
        <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-ash">
          {upperEntityLabel}
        </span>
      </div>

      <div
        className={cn(
          'absolute bottom-[42px] right-6 grid h-16 w-16 translate-y-3 scale-[0.78] place-items-center border border-gunmetal bg-void-black text-alert-red opacity-0 motion-reduce:animate-none motion-reduce:transition-none',
          (phase === 'tossing' || phase === 'waiting') &&
            'animate-trash-appear',
          phase === 'waiting' &&
            'translate-y-0 scale-100 animate-trash-wait opacity-100',
        )}
        aria-hidden="true"
      >
        <Trash2 className="h-8 w-8" />
      </div>

      <p className="absolute bottom-[18px] left-6 font-mono text-[10px] uppercase tracking-[0.08em] text-ash">
        {phase === 'waiting'
          ? dialogCopy.completingText
          : dialogCopy.movingToTrashText}
      </p>
    </div>
  );
}
