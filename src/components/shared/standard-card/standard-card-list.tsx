'use client';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card } from '@/components/core/card';
import { cn } from '@/lib/utils';
import type { StandardCardProps } from './types';

export function StandardCardList({
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
        'group relative cursor-pointer rounded-sm border transition-all duration-300',
        'border-gunmetal bg-obsidian hover:border-tulpar-blue/50 hover:bg-gunmetal/20 hover:shadow-lg',
        'flex w-full flex-col gap-4 p-5 md:flex-row md:items-start md:gap-8 md:p-6',
        className,
      )}
    >
      {/* Content Section */}
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <h3 className="line-clamp-1 text-sm font-bold uppercase tracking-tight text-titanium transition-colors group-hover:text-tulpar-blue">
              {title}
            </h3>
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
          </div>
        </div>

        {description && (
          <p className="text-xs leading-relaxed text-ash">{description}</p>
        )}

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 text-[11px] text-ash md:text-xs"
            >
              <stat.icon
                className={cn('h-3.5 w-3.5', stat.color || 'text-ash')}
              />
              <span className="truncate font-mono">{stat.value}</span>
              <span className="ml-0.5 hidden text-ash lg:inline">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mt-5 space-y-1.5">
            <div className="h-1.5 w-full max-w-none overflow-hidden rounded-sm bg-gunmetal md:max-w-md lg:max-w-lg">
              <div
                className="h-full bg-gradient-to-r from-tulpar-blue to-signal-green transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex shrink-0 items-center gap-2 transition-opacity duration-300 md:self-start md:opacity-0 md:group-hover:opacity-100">
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
                'h-7 w-7 rounded-none border border-gunmetal/30 bg-gunmetal/80 text-ash md:h-8 md:w-8',
                action.variant === 'destructive' || action.variant === 'rose'
                  ? 'hover:bg-alert-red/20 hover:text-alert-red'
                  : 'hover:bg-tulpar-blue/20 hover:text-tulpar-blue',
              )}
              title={action.label}
            >
              <action.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}
