import { colors } from "@/constants/colors";
import { Platform, StyleSheet } from "react-native";

export const styleTabs = StyleSheet.create({
  containerTabs: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: colors.gray[50],
    bottom: Platform.OS === "android" ? 27 : 55,
    left: 40,
    right: 40,
    elevation: 0,
    borderRadius: 100,
    height: 80,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.80
  },
  buttonTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 80,
  },
  buttonFocused: {
    backgroundColor: colors.sky[600],
    color: colors.gray[500],
  }
});
