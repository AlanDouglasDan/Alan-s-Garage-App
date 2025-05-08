import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 16,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.BLACK,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: "13%"
  },
  image: {
    height: 318,
    alignSelf: 'center',
    marginTop: 24,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
    textAlign: 'center',
    paddingHorizontal: '13%',
  },
});
