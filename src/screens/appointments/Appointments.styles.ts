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
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: palette.NEUTRAL30,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: palette.WHITE,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: palette.BORDER,
    borderRadius: 15,
    gap: 8,
  },
  input2: {
    flex: 1,
    ...typography.text16,
    lineHeight: 18,
    color: palette.BLACK,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.PRIMARY,
  },
});
