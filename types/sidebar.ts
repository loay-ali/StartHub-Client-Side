import { ReactNode } from "react";

export interface SidebarLinkItem {
  title: string;
  href: string;
  icon?: ReactNode;
  badge?: string | number;
  isActive?: boolean;
  children?: SidebarLinkItem[];
}
