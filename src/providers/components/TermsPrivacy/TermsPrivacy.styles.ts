import {StyleSheet, Platform} from 'react-native';

import {font} from 'core/utils';
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
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
    marginTop: 16,
  },
  mediumText: {
    fontFamily: font.medium,
    color: palette.TEXT_HEADING,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: palette.NEUTRAL40,
    marginVertical: 16,
  },
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 0,
  },
  optionLabel: {
    fontWeight: 400,
    color: palette.TEXT_HEADING,
    ...typography.text16,
  },
  marginalize: {
    marginLeft: -10,
  },
});
