export interface NavCalculatorItem {
  id: string;
  categoryId: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
}

export interface NavCategoryGroup {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  calculators: NavCalculatorItem[];
}

export interface PublicNavbarProps {
  brandTitle: string;
  brandSubtitle: string;
  brandLogo: string;
}
