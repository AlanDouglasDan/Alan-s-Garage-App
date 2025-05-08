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
    paddingBottom: 24,
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
    color: palette.SUPPORT,
  },
  text13: {
    ...typography.text13,
  },
  gap: {
    gap: 8,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text14: {
    ...typography.text14,
    color: palette.SUPPORT,
    textAlign: 'center',
    marginTop: 38,
  },
});
