export interface MenuItem {
  label: string;
  path?: string;
  icon: React.ComponentType<{ size?: number }>;
  children?: MenuItem[];
}

export interface SubMenuItem {
  label: string;
  path?: string;
  icon: React.ComponentType<{ size?: number }>;
}
