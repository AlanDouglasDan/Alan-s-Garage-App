import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
  },
  gap16: {
    gap: 16,
  },

  // bottom sheet
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.WHITE,
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  text22: {
    ...typography.text22,
    textAlign: 'center',
    color: palette.DEFAULT,
  },
});
