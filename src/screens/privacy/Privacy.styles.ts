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
    paddingBottom: 20,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
    flex: 1,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  dot: {
    width: 10,
    height: 10,
    marginVertical: 7,
    borderRadius: 5,
    marginRight: 10,
  },
  solidDot: {
    backgroundColor: palette.BLACK,
  },
  transparentDot: {
    borderWidth: 1,
    backgroundColor: palette.WHITE,
    borderColor: palette.BLACK,
    marginLeft: 5,
  },
  indent: {
    paddingLeft: 16,
  },
});
