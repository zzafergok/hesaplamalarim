'use client';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card } from '@/components/core/card';
import { cn } from '@/lib/utils';
import type { StandardCardProps } from './types';

export function StandardCardGrid({
  title,
  stats,
  status,
  tags,
  actions,
  onClick,
  progress,
  className,
  description,
}: Omit<StandardCardProps, 'viewMode'>) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-sm border transition-all duration-300',
        'border-gunmetal bg-obsidian hover:border-tulpar-blue/50 hover:bg-gunmetal/20 hover:shadow-lg',
        'flex h-full flex-col gap-3 p-4',
        className,
      )}
    >
      {/* Card Header: status badge + action buttons */}
      <div className="flex min-h-[24px] items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {status && (
            <Badge
              variant="none"
              className={cn(
                'shrink-0 border text-[9px] font-bold uppercase tracking-wider',
                status.className,
              )}
            >
              {status.label}
            </Badge>
          )}
          {tags?.map((tag, idx) => (
            <Badge
              key={idx}
              variant="none"
              className={cn(
                'shrink-0 border text-[9px] font-bold uppercase tracking-wider',
                tag.className,
              )}
            >
              {tag.label}
            </Badge>
          ))}
          {!status && !tags?.length && <div />}
        </div>

        {actions && actions.length > 0 && (
          <div className="flex shrink-0 items-center gap-1 opacity-30 transition-opacity duration-200 group-hover:opacity-100">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(e);
                }}
                className={cn(
                  'h-6 w-6 rounded-none border border-gunmetal/30 bg-transparent text-ash',
                  action.variant === 'destructive' || action.variant === 'rose'
                    ? 'hover:border-alert-red/30 hover:bg-alert-red/10 hover:text-alert-red'
                    : 'hover:border-tulpar-blue/30 hover:bg-tulpar-blue/10 hover:text-tulpar-blue',
                )}
                title={action.label}
              >
                <action.icon className="h-3 w-3" />
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 text-sm font-bold uppercase leading-snug tracking-tight text-titanium transition-colors group-hover:text-tulpar-blue">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="-mt-1 line-clamp-2 text-xs leading-relaxed text-ash">
          {description}
        </p>
      )}

      {/* Stats 2×2 grid */}
      <div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 text-[11px] text-ash"
          >
            <stat.icon
              className={cn('h-3.5 w-3.5 shrink-0', stat.color || 'text-ash')}
            />
            <span className="truncate font-mono">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            {progress.label && (
              <span className="font-mono text-[10px] text-ash/50">
                {progress.label}
              </span>
            )}
          </div>
          <div className="h-1 w-full overflow-hidden rounded-sm bg-gunmetal/60">
            <div
              className="h-full bg-gradient-to-r from-tulpar-blue to-signal-green transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
