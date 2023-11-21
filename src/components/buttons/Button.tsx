import { ButtonAppProps } from "@/interfaces/components/buttons";
import { stylesApp } from "@/styles/appstyles";
import { Text, TouchableOpacity } from "react-native";

const Button = (props: ButtonAppProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={stylesApp.buttonDefault}>
      <Text style={stylesApp.textButton}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
