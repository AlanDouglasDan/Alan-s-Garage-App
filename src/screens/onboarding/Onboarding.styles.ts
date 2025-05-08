import {StyleSheet, Platform} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  imageContainer: {
    marginTop: 52,
    paddingHorizontal: 16,
  },
  w100: {
    width: '100%',
    height: 318,
    // borderWidth: 1
  },
  body: {
    width: wp(100),
    paddingHorizontal: 16,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
  },
  dotView: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  circle: {
    height: 4,
    width: 24,
  },
  semiheader16: {
    ...typography.semiheader16,
    textAlign: 'center',
    color: palette.PRIMARY,
  },
});
