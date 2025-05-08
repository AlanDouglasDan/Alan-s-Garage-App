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
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.BORDER2,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_COLOR,
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
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  gap: {
    gap: 4,
  },
  gap8: {
    gap: 8,
  },
  text14: {
    ...typography.text14,
    color: palette.DEFAULT,
  },
  header22: {
    ...typography.header22,
    color: palette.DEFAULT,
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.NEUTRAL20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap16: {
    gap: 16,
  },
});
