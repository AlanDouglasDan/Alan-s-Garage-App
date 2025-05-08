import {StyleSheet, Platform} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 0 : 32,
    paddingHorizontal: 20,
  },
  sheetModal: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 1)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header22: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
    marginTop: 10,
  },
  text17: {
    ...typography.text17,
    color: palette.DEFAULT,
  },
  pad: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
