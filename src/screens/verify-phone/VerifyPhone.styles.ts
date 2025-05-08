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
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  label: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  gap: {
    gap: 8,
  },
});
