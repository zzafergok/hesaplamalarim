export interface FeatureCardItem {
  icon: 'layers' | 'palette' | 'layout' | 'shield' | 'globe' | 'check';
  badge: string;
  title: string;
  description: string;
  points: string[];
}

export interface QuickRouteItem {
  href: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: 'globe' | 'sparkles' | 'user' | 'shield' | 'lock';
}

export interface PublicHomeCopy {
  badges: string[];
  hero: {
    title: string;
    description: string;
    loginAction: string;
    adminAction: string;
  };
  cultureCallout: {
    badge: string;
    title: string;
    description: string;
    features: string[];
    action: string;
  };
  featuresSection: {
    badge: string;
    title: string;
    description: string;
    cards: FeatureCardItem[];
  };
  quickRoutesSection: {
    badge: string;
    title: string;
    description: string;
    routes: QuickRouteItem[];
  };
}
