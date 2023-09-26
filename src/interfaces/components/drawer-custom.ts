import { ReactNode } from "react";

export interface DrawerItemProps {
  href: string;
  title: string;
  subtitle?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  isMenuOption?: boolean;
}
