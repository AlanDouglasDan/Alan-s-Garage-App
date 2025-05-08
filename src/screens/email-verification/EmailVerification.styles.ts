import {StyleSheet} from 'react-native';

import {font} from 'core/utils';
import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    padding: 20,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  mediumText: {
    fontFamily: font.medium,
    color: palette.TEXT_HEADING,
  },
});
