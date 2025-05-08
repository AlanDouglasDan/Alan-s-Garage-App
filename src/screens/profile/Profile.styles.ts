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
    paddingTop: 16,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 44,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.BLACK,
    textAlign: 'center',
    textTransform: 'capitalize',
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
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: palette.LIGHT_GREEN,
  },
  text12: {
    ...typography.text12,
    color: palette.SUCCESS,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: palette.NEUTRAL20,
    gap: 10,
    borderRadius: 15,
  },
  gap: {
    gap: 8,
  },
});
