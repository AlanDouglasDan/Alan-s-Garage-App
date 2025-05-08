import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  headerTitle: {
    ...typography.header22,
    color: palette.TEXT_HEADING,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRight: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
});
