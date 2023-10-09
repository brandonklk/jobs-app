import { colors } from "@/constants/colors";
import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
  },
});

export default Divider;
