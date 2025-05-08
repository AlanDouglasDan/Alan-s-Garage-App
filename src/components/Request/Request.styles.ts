import {StyleSheet} from 'react-native';

import {palette} from 'core/styles/palette';
import {typography} from 'core/styles/typography';

export default StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  text13: {
    ...typography.text14,
    color: palette.DEFAULT,
  },
  gap8: {
    gap: 8,
  },
  optionContainer: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  optionLabel: {
    fontWeight: 400,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: palette.NEUTRAL30,
    paddingHorizontal: 16,
    height: 55.5,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
  },
});
