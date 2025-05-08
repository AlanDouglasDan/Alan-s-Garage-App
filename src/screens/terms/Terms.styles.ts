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
    backgroundColor: palette.BLACK,
    marginRight: 10,
  },
  indent: {
    paddingLeft: 16,
  },
});
