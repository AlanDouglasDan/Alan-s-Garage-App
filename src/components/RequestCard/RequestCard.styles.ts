import {StyleSheet} from 'react-native';

import {palette} from 'core/styles/palette';
import {typography} from 'core/styles/typography';

export default StyleSheet.create({
  text14: {
    ...typography.text14,
    color: palette.SUPPORT,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.BORDER2,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  text12: {
    ...typography.text12,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
  },
  line: {
    height: 1,
    backgroundColor: palette.BORDER2,
    marginVertical: 16,
  },
  gap: {
    gap: 10,
  },
  gap4: {
    gap: 4,
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
});
