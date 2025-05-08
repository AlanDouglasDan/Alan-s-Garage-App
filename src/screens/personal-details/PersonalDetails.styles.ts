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
    color: palette.DEFAULT,
  },
  text13: {
    ...typography.text13,
    color: palette.GRAY500,
  },
  gap: {
    gap: 8,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: palette.NEUTRAL10,
    borderRadius: 16,
  },
  imgCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: palette.SUPPORT,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  absoluteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.NEUTRAL20,
    position: 'absolute',
    right: -5,
    bottom: 0,
    zIndex: 2,
  },
});
