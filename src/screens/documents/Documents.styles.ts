import {StyleSheet} from 'react-native';

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
    paddingBottom: 12,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  dottedContainer: {
    borderWidth: 1,
    padding: 16,
    borderStyle: 'dashed',
    borderColor: palette.BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text13: {
    ...typography.text13,
    color: palette.TEXT_HEADING,
  },
  text12: {
    ...typography.text12,
    color: palette.SUPPORT,
  },
});
