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
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  optionLabel: {
    fontWeight: 400,
  },
  marginalize: {
    marginLeft: -10,
  },
});
