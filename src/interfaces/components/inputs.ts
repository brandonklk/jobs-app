import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

export interface InputProps {
  label: string;
  titleInput?: string;
  placeholder: string;
  error: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  onChange: (text: string) => void;
  onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  password?: boolean;
  disabled?: boolean;
}
