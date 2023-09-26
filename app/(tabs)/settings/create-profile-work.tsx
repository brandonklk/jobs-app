import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateProfileWork() {
  const { back } = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View>
      <Text>CreateProfileWork</Text>
    </View>
  );
}
