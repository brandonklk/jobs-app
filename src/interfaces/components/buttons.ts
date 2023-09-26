import { GestureResponderEvent } from "react-native";
import { ReactNode } from "react";

export interface ButtonAppProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export interface ButtonGroup {
  children: JSX.Element | JSX.Element[];
}

export interface ButtonProps {
  title: string;
  subtitle?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  isMenuOption?: boolean;
}
