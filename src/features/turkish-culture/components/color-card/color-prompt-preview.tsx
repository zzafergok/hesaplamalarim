'use client';

import * as React from 'react';
import { Check, ChevronDown, ChevronUp, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/core/button';

interface ColorPromptPreviewProps {
  promptKeyword: string;
}

export function ColorPromptPreview({
  promptKeyword,
}: ColorPromptPreviewProps) {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(promptKeyword);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  return (
    <div className="border-t border-border/30 pt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowPrompt(!showPrompt)}
        className="h-6 w-full justify-between rounded-md px-2 text-[11px] font-medium text-muted-foreground opacity-75 transition-opacity hover:opacity-100 hover:text-tulpar-gold"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-tulpar-gold/80" />
          AI Üretim Promptu
        </span>
        {showPrompt ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </Button>

      {showPrompt && (
        <div className="mt-2 rounded-lg border border-border/70 bg-void-black/90 p-2.5 shadow-inner">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-2 font-mono text-[10px] text-titanium/90">
              {promptKeyword}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyPrompt}
              className="h-6 shrink-0 px-2 text-[10px] text-tulpar-blue hover:text-tulpar-blue/80"
            >
              {copiedPrompt ? (
                <Check className="h-3 w-3 text-signal-green" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
