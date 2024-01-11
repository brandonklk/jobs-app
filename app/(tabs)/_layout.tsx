import { View, TouchableOpacity, Platform } from "react-native";
import { Fragment, ReactNode } from "react";
import { Tabs } from "expo-router/tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { usePathname } from "expo-router";
import { colors } from "@/constants/colors";
import { routesExcludeTab } from "@/constants/routes-menu";
import { styleTabs } from "@/styles/tabsstyles";

export const unstable_settings = {
  initialRouteName: "map",
};

const MyCustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const colorIcon = colors.gray[50];
  const colorIconFocused = colors.sky[600];
  const sizeIcon = 28;
  const pathName = usePathname();
  const hidderScreenChildren = routesExcludeTab.includes(pathName);
  

  const getIcon = (namePage: string, color: string) => {
    let icon: ReactNode;

    switch (namePage) {
      case "map":
        icon = (
          <MaterialCommunityIcons
            name="map-search"
            size={sizeIcon}
            color={color}
          />
        );
        break;
      case "works":
        icon = (
          <MaterialIcons name="business-center" size={sizeIcon} color={color} />
        );
        break;
      case "settings":
        icon = <MaterialIcons name="settings" size={sizeIcon} color={color} />;
        break;
    }

    return icon;
  };

  if (hidderScreenChildren) {
    return <Fragment />;
  }

  return (
    <View style={styleTabs.containerTabs}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconColor = isFocused ? colorIcon : colorIconFocused;
        const styleButton = isFocused
          ? [styleTabs.buttonTab, styleTabs.buttonFocused]
          : [styleTabs.buttonTab];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styleButton}>
            {getIcon(route.name, iconColor)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyCustomTabBar {...props} />}
    >
      <Tabs.Screen name="map" />
      <Tabs.Screen name="works" />
      <Tabs.Screen name="settings" options={ { href: null}}/>
    </Tabs>
  );
};
