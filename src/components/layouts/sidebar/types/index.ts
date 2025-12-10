export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  key: string;
}

export interface UserNavigationItem {
  name: string;
  href: string;
}
