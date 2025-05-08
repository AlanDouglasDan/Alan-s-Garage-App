import {Platform, StyleSheet} from 'react-native';

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
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.BORDER2,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_COLOR,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  gap: {
    gap: 4,
  },
  text13: {
    ...typography.text14,
    color: palette.DEFAULT,
    textAlign: 'center',
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
    alignSelf: 'center',
  },
  text12: {
    ...typography.text12,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.NEUTRAL20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap16: {
    gap: 16,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    paddingRight: 0,
  },
  optionLabel: {
    fontWeight: 400,
  },
  marginalize: {
    marginLeft: -10,
  },

  // bottom sheet
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.WHITE,
    paddingBottom: 40,
    paddingHorizontal: 18,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
  },
  text11: {
    ...typography.text11,
    color: palette.SUPPORT,
  },
  input: {
    ...typography.text17,
    width: '100%',
    paddingVertical: 16,
    backgroundColor: palette.WHITE,
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
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 4,
  },
});
