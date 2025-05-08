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
    marginTop: 8,
    paddingHorizontal: 16,
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
  disabled: {
    // backgroundColor: palette.GREY2,
  },
  label: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  textError: {
    ...typography.text12,
    color: palette.RED,
    marginTop: 4,
  },
  icon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 48,
    left: 20,
    zIndex: 2,
  },
  iconPadding: {
    paddingLeft: 50,
  },
});
