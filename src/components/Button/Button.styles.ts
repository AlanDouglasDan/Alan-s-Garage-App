import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  textButton: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: palette.NEUTRAL20,
    borderRadius: 15,
  },
  button: {
    paddingVertical: 12,
    backgroundColor: palette.NEUTRAL20,
    width: '100%',
  },
});
