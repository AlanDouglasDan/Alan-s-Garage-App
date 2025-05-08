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
    color: palette.TEXT_HEADING,
    flex: 1,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
  },
  semiheader12: {
    ...typography.semiheader12,
    color: palette.DEFAULT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
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
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL40,
    marginVertical: 16,
    opacity: 0.25,
  },
  gap: {
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.PRIMARY,
  },
});
