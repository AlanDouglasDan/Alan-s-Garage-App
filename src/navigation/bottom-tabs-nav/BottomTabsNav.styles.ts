import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";
import { ifIphoneX } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  tabBar: {
    // ...ifIphoneX({ paddingTop: 15 }, { paddingBottom: 10 }),
    paddingTop: 10,
    paddingBottom: 30,
    height: 90,
    backgroundColor: palette.WHITE,
  },
  icon: {
    ...ifIphoneX({}, { marginBottom: -5 }),
  },
  text12: {
    ...typography.text12,
    color: palette.SUPPORT,
  },
  text12Focus: {
    ...typography.text12,
    color: palette.TEXT_HEADING,
  },

  // header
  header: {
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.WHITE,
    paddingBottom: 14,
    ...Platform.select({
      ios: ifIphoneX({ paddingTop: 56 }, { paddingTop: 42 }),
      android: { paddingTop: 56 },
    }),
  },
  headerTitle: {
    ...typography.header22,
    color: palette.BLACK,
  },
});
