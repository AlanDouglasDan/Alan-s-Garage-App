import {Platform, StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_COLOR,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  gap: {
    gap: 4,
  },
  text13: {
    ...typography.text14,
    color: palette.DEFAULT,
    textAlign: 'center',
  },
  text12: {
    ...typography.text12,
  },
  gap16: {
    gap: 16,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    paddingRight: 0,
  },
  optionLabel: {
    fontWeight: 400,
  },
  marginalize: {
    marginLeft: -10,
  },
});
