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
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  text17: {
    ...typography.text17,
    color: palette.DEFAULT,
    textAlign: 'center',
    marginVertical: 24,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  socials: {
    backgroundColor: palette.NEUTRAL20,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    borderRadius: 15,
  },
  gap: {
    gap: 16,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
  },
});
