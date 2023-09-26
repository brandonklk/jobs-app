import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Conversations() {
  const { back } = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View>
      <Text>Conversations</Text>
    </View>
  );
}
