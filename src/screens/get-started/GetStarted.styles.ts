import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE
  },
  innerContainer: {
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 16,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header28: {
    ...typography.header28,
    color: palette.BLACK,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
    textAlign: 'center',
  },
  locationImage: {
    width: '100%',
    height: 208,
  },
  logoImage: {
    width: 86,
    alignSelf: 'center',
  },
});
