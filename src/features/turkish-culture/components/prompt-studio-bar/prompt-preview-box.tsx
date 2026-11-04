'use client';

import * as React from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/core/button';

interface PromptPreviewBoxProps {
  prompt: string;
}

export function PromptPreviewBox({ prompt }: PromptPreviewBoxProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl border border-border/80 bg-void-black/90 p-4 shadow-inner">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-tulpar-blue">
            <Sparkles className="h-3 w-3" />
            Midjourney / DALL-E / Gemini Promptu
          </span>
          <p className="select-all break-all font-mono text-xs leading-relaxed text-titanium/90">
            {prompt}
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={handleCopyPrompt}
          className="h-9 shrink-0 rounded-lg bg-tulpar-blue px-4 text-xs font-bold text-white shadow-md hover:bg-tulpar-blue/90"
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5 text-signal-green" />
              Kopyalandı!
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Promptu Kopyala
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
