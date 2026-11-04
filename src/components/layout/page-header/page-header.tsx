import React from 'react';
import { Badge } from '@/components/core/badge';
import { cn } from '@/lib/utils';
import type { PageHeaderProps } from './types';

export function PageHeader({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {breadcrumbs && (
        <div className="text-xs text-muted-foreground">{breadcrumbs}</div>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          {badge && (
            <div>
              {typeof badge === 'string' ? (
                <Badge className="rounded-none border-tulpar-blue/30 bg-tulpar-blue/10 text-tulpar-blue">
                  {badge}
                </Badge>
              ) : (
                badge
              )}
            </div>
          )}
          <h1 className="text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-ash">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
