import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
  const { push } = useRouter();

  const signIn = () => {
    push("(tabs)/map");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => signIn()}>Sign In</Text>
    </View>
  );
}
