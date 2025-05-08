import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
    textAlign: 'center',
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationCodeContainer: {
    marginTop: 24,
  },
  cellVerification: {
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    backgroundColor: palette.WHITE,
    // flex: 1,
    // width: 48,
    // height: 48,
    // marginRight: 12,
  },
  cellText: {
    ...typography.text17,
    textAlign: 'center',
    // lineHeight: wp(11),
    color: palette.BLACK,
  },
  cellFocused: {
    borderWidth: 1,
    borderColor: palette.PRIMARY,
  },
});
