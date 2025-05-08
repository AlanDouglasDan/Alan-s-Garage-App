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
    marginBottom: 4,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  text12: {
    ...typography.text12,
    lineHeight: 18,
  },
  gap: {
    gap: 16,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
});
