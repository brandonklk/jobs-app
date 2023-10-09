import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { StyleProp, ViewStyle } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "menu",
};

const StackLayout = () => {
  const insets = useSafeAreaInsets();
  const contentStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.white,
  };
  return (
      <Stack
        initialRouteName="menu"
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.sky[600] },
        }}
      >
        <Stack.Screen
          name="menu"
          options={{ title: "Configurações", contentStyle: contentStyle }}
        />
        <Stack.Screen
          name="conversations"
          options={{ title: "Conversas - Chat", contentStyle: contentStyle }}
        />
        <Stack.Screen
          name="create-profile-work"
          options={{ title: "Quero Trabalhar", contentStyle: contentStyle }}
        />
        <Stack.Screen
          name="help"
          options={{ title: "Preciso de ajuda", contentStyle: contentStyle }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Meu Perfil",
            contentStyle: { ...contentStyle, marginBottom: insets.bottom },
          }}
        />
        <Stack.Screen
          name="requested-service"
          options={{ title: "Chat", contentStyle: contentStyle }}
        />
        <Stack.Screen
          name="settings-app"
          options={{ title: "Configurações", contentStyle: contentStyle }}
        />
      </Stack>
  );
};

export default StackLayout;
