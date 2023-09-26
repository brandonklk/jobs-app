import { Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { colors } from "@/constants/colors";
import { routerMenu } from "@/constants/routes-menu";
import { Ionicons } from "@expo/vector-icons";

export default function Menu() {
  const { push } = useRouter();
  const onPress = (router: string) => {
    push(router);
  };

  return (
    <ScrollView style={styles.containerScrollView}>
      {routerMenu.map(({ title, iconEnd, iconStart, subtitle, id, href }) => (
        <View key={id} style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => onPress(href)}
            activeOpacity={0.6}
            style={styles.buttonList}
          >
            <Fragment>
              {iconStart && <View style={styles.iconStart}>{iconStart}</View>}

              <View style={styles.containerTitleAndSubtitle}>
                <Text style={styles.title}>{title}</Text>

                {subtitle && (
                  <Text style={styles.subTitle} numberOfLines={1}>
                    {subtitle}
                  </Text>
                )}
              </View>

              {iconEnd ? (
                <View>{iconEnd}</View>
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={colors.gray[500]}
                />
              )}
            </Fragment>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScrollView: {
    flex: 1,
  },
  containerButton: { padding: 8 },
  buttonList: {
    backgroundColor: colors.white,
    shadowColor: colors.gray[300],
    padding: 20,
    borderRadius: 6,
    alignContent: "space-around",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 6,
    flexDirection: "row",
  },
  iconStart: {
    marginRight: 8,
  },
  containerTitleAndSubtitle: {
    flex: 1,
    marginLeft: 5,
  },
  title: {
    color: colors.gray[500],
    fontWeight: "500",
    fontSize: 16,
  },
  subTitle: {
    color: colors.gray[400],
    fontSize: 14,
  },
});
