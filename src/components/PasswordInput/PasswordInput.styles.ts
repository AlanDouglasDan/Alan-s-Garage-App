import {Platform, StyleSheet} from 'react-native';

import {palette} from 'core/styles/palette';
import {typography} from 'core/styles/typography';

export default StyleSheet.create({
  input: {
    ...typography.text17,
    width: '100%',
    // height: 50,
    paddingVertical: 16,
    backgroundColor: palette.WHITE,
    borderRadius: 15,
    paddingLeft: 16,
    paddingRight: 55,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    color: palette.DEFAULT,
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.PRIMARY,
  },
  inputError: {
    borderWidth: 1,
    borderColor: palette.RED,
  },
  label: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  inputContainer: {
    marginTop: 8,
    position: 'relative',
  },
  textCode: {
    ...typography.text18,
    position: 'absolute',
    top: 14,
    left: 61,
  },
  iconContainer: {
    position: 'absolute',
    top: 17,
    right: 27,
    height: 22,
    justifyContent: 'center',
  },
  textError: {
    ...typography.text12,
    color: palette.RED,
    marginTop: 4,
  },
  text14: {
    ...typography.text14,
    color: palette.BLACK,
    textDecorationLine: 'underline',
  },
});
