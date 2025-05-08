import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE
  },
  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
    textAlign: 'center',
    alignSelf: 'center',
    width: "80%"
  },
  image: {
    height: 318,
    alignSelf: 'center',
  },
  stackedButtons: {
    gap: 12,
    marginTop: 40,
  },
});
