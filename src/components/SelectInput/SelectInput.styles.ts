import {Platform, StyleSheet} from 'react-native';

import {palette} from 'core/styles/palette';
import {typography} from 'core/styles/typography';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  input: {
    ...typography.text17,
    width: '100%',
    // height: 50,
    paddingVertical: 16,
    marginTop: 8,
    backgroundColor: palette.WHITE,
    paddingLeft: 16,
    paddingRight: 45,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    color: palette.DEFAULT,
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    borderRadius: 15,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.PRIMARY,
  },
  label: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  inputContainer: {
    position: 'relative',
  },
  textCode: {
    ...typography.text18,
    position: 'absolute',
    top: 16,
    left: 61,
  },
  iconContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 24 : 27,
    right: 10,
    height: 25,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  icon: {
    height: 25,
  },
  textError: {
    ...typography.text12,
    color: palette.RED,
    marginTop: 4,
  },

  // Bottom Sheet Styles
  header: {
    height: 24,
    backgroundColor: palette.PRIMARY,
    overflow: 'hidden',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.WHITE,
    position: 'relative',
    paddingHorizontal: 20,
    ...ifIphoneX({paddingBottom: 20}, {paddingBottom: 10}),
  },
  closeBtn: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetTitle: {
    ...typography.header20,
    fontFamily: 'Comfortaa-Bold',
    color: palette.BLACK,
  },
  optionContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 7,
    marginLeft: -10,
  },
  optionLabel: {
    ...typography.text16,
    fontWeight: '400',
    color: palette.PRIMARY,
  },
  optionIcon: {
    height: 20,
    width: 20,
  },
  paddedBackground: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: palette.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
    backgroundColor: palette.WHITE,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: palette.BORDER,
  },
  input2: {
    flex: 1,
    ...typography.text16,
    lineHeight: 18,
    color: palette.BLACK,
  },
  icon2: {
    marginRight: 8,
  },
});
