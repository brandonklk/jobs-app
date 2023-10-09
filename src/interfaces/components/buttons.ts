import { GestureResponderEvent } from "react-native";
import { ReactNode } from "react";

export interface ButtonAppProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

interface ListButtonGroup {
  buttonName: string;
  buttonId: number
}

export interface ButtonGroupProps {
  buttons: Array<ListButtonGroup>;
  buttonSelected: number
  onPress: (buttonId: number) => void
}

export interface ButtonProps {
  title: string;
  subtitle?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  isMenuOption?: boolean;
}
