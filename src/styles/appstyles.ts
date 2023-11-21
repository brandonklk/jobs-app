import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const stylesApp = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonDefault: {
    width: "100%",
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    backgroundColor: colors.sky[600],
    borderColor: colors.sky[600],
    borderRadius: 8,
  },
  textButton: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#404D61",
    lineHeight: 24,
  },
  subTitle: {
    fontWeight: "400",
    fontSize: 16,
    color: "#757D8A",
    lineHeight: 24,
  },
});
