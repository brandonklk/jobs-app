import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const stylesScreenLogin = StyleSheet.create({
  containerLogin: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 26,
  },
  containerInputs: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
  },
  containerInput: {
    paddingBottom: 22,
  },
  containerButtonForgotPassword: {
    paddingBottom: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  containerSocialAccess: {
    flex: 1,
    paddingTop: 8,
  },
  containerButtonsSocialAccess: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonSocialAccess: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray[100],
    backgroundColor: colors.gray[100],
    padding: 26,
  },
  containerButtonSubmit: {
    marginBottom: 38,
  }
});
