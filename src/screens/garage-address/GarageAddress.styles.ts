import {Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  input: {
    width: '100%',
    backgroundColor: palette.WHITE,
    marginTop: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
  },
  inputText: {
    ...typography.text17,
    color: palette.DEFAULT,
  },
  label: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  text13: {
    ...typography.text13,
    color: palette.DEFAULT,
  },

  // bottom sheet
  content: {
    width: '100%',
    height: hp(100),
    backgroundColor: palette.WHITE,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 18,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  semiheader24: {
    ...typography.semiheader24,
    color: palette.TEXT_HEADING,
  },
});
