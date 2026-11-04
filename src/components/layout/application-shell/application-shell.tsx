'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from '@/components/core/sidebar';
import { PageHeader } from '@/components/layout/page-header';
import { ApplicationShellFooter } from './application-shell-footer';
import { SidebarBrand } from './sidebar-brand';
import { SidebarNav } from './sidebar-nav';
import { ApplicationShellHeader } from './application-shell-header';
import { isNavItemActive } from './nav-utils';
import type { ApplicationShellProps } from './types';

export function ApplicationShell({ ...props }: ApplicationShellProps) {
  return (
    <SidebarProvider className="bg-background font-sans text-foreground [&_[data-sidebar=sidebar]]:bg-card [&_[data-sidebar=sidebar]]:text-foreground">
      <ApplicationShellContent {...props} />
    </SidebarProvider>
  );
}

function ApplicationShellContent({
  children,
  brand,
  footer,
  navItems,
  accountNavItems = [],
  headerActions,
  planLabel,
  contentFooter,
  hidePageHeader = false,
  pageHeaderTitle,
  pageHeaderDescription,
  pageHeaderActions,
}: ApplicationShellProps) {
  const pathname = usePathname();
  const { setOpenMobile, state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';
  const active =
    [...navItems, ...accountNavItems].find((item) =>
      isNavItemActive(pathname, item),
    ) ?? navItems[0];

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="gap-0 p-0">
          <SidebarBrand
            brand={brand}
            collapsed={collapsed}
            planLabel={planLabel}
            onCloseMobile={() => setOpenMobile(false)}
          />
        </SidebarHeader>
        <SidebarContent className="gap-0">
          <SidebarNav
            navItems={navItems}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={() => setOpenMobile(false)}
          />
        </SidebarContent>
        {footer && (
          <SidebarFooter className="gap-0 p-0">
            <ApplicationShellFooter placement="sidebar" collapsed={collapsed}>
              {typeof footer === 'function'
                ? footer({ collapsed })
                : React.isValidElement(footer)
                  ? React.cloneElement(
                      footer as React.ReactElement<{ compact?: boolean }>,
                      { compact: collapsed },
                    )
                  : footer}
            </ApplicationShellFooter>
          </SidebarFooter>
        )}
      </Sidebar>

      <SidebarInset className="min-h-screen bg-background text-foreground antialiased selection:bg-tulpar-blue/20 selection:text-white">
        <ApplicationShellHeader
          active={active}
          collapsed={collapsed}
          headerActions={headerActions}
          onOpenMobile={toggleSidebar}
          onToggleCollapsed={toggleSidebar}
        />

        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {active && !hidePageHeader && (
              <PageHeader
                title={pageHeaderTitle ?? active.label}
                description={pageHeaderDescription ?? active.subtitle}
                actions={pageHeaderActions}
              />
            )}
            {children}
          </div>
        </div>

        <ApplicationShellFooter placement="content">
          {contentFooter ?? 'Tulpar © 2026'}
        </ApplicationShellFooter>
      </SidebarInset>
    </>
  );
}
