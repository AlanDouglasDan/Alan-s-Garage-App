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
    paddingBottom: 24,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.BLACK,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: palette.NEUTRAL30,
  },
  tab: {
    paddingHorizontal: 4,
    paddingBottom: 19,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: palette.PRIMARY,
    paddingBottom: 17,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
  },
  line: {
    height: 1,
    backgroundColor: palette.BORDER2,
    marginVertical: 16,
  },
  gap: {
    gap: 10,
  },
});
