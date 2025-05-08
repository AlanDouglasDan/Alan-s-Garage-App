import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  contentContainer: {
    flexGrow: 1,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
    marginBottom: 4,
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  optionLabel: {
    fontWeight: 400,
  },
  marginalize: {
    marginLeft: -10,
  },
  gap: {
    gap: 8,
  },
});
