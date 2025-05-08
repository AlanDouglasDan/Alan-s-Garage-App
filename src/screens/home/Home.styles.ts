import {StyleSheet, Platform} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 16 : 32,
  },
  negativeMargins: {
    marginHorizontal: -20,
  },
  contentContainer: {
    flexGrow: 1,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
    textTransform: 'capitalize',
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
  },
  text16: {
    ...typography.text16,
    color: palette.TEXT_HEADING,
    flex: 1,
  },
  text13: {
    ...typography.text13,
    color: palette.DEFAULT,
  },
  gap: {
    gap: 8,
  },
  progressBar: {
    height: 7,
    width: '100%',
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  progressValue: {
    height: '100%',
    backgroundColor: palette.SUCCESS,
  },
  bottomContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 16,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
});
