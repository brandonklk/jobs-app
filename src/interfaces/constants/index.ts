import { ReactNode } from "react";

export interface TabCustom {
  href: string;
  title: string;
  subtitle?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  isMenuOption?: boolean;
}

export interface ItemMenu extends TabCustom {
  id: number;
}
