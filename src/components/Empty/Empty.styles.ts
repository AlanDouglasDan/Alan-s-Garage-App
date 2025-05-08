import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  gap: {
    gap: 16,
  },
  gap4: {
    gap: 4,
  },
  empty: {
    width: 72,
    height: 72,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
    textAlign: 'center',
    paddingHorizontal: 42,
  },
});
