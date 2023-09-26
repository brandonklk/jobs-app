import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "menu",
};

const StackLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack
      initialRouteName="menu"
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="menu" options={{ title: 'Configurações' }} />
      <Stack.Screen name="conversations" options={{ title: 'Conversas - Chat' }} />
      <Stack.Screen name="create-profile-work" options={{ title: 'Quero Trabalhar' }} />
      <Stack.Screen name="help" options={{ title: 'Preciso de ajuda' }} />
      <Stack.Screen name="profile" options={{ title: 'Meu Perfil', contentStyle: { marginBottom: insets.bottom } }} />
      <Stack.Screen name="requested-service" options={{ title: 'Chat' }} />
      <Stack.Screen name="settings-app" options={{ title: 'Configurações' }} />
    </Stack>
  );
};

export default StackLayout;
