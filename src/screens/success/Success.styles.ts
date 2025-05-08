import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 16,
  },
  contentContainer: {
    flexGrow: 1,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.BLACK,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    height: 83,
    alignSelf: 'center',
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
    textAlign: 'center',
  },
});
