import type { ApplicationShellNavItem } from './types';

export function isNavItemActive(
  pathname: string,
  item: ApplicationShellNavItem,
): boolean {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}
