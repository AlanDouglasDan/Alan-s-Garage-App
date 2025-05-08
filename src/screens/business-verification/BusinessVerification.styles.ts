import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    flex: 1,
    paddingVertical: 16,
  },
  contentContainer: {
    flexGrow: 1,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  text12: {
    ...typography.text12,
    lineHeight: 18,
    color: palette.TEXT_HEADING,
  },
  text13: {
    ...typography.text13,
    color: palette.GRAY500,
  },
  gap: {
    gap: 8,
  },
  gap24: {
    gap: 24,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: palette.BROWN,
    borderRadius: 16,
  },
});
