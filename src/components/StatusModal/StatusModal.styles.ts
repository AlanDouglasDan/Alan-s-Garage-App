import {StyleSheet} from 'react-native';

import {typography} from 'core/styles/typography';
import {palette} from 'core/styles';

export default StyleSheet.create({
  // modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(246, 246, 247, 0.6)',
  },
  modalContentContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: palette.WHITE,
    width: '85%',
    position: 'relative',
  },
  flexedRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
  },
  semiHeader16: {
    ...typography.semiheader16,
  },
  text16: {
    ...typography.text16,
    color: "#D92D20",
    marginTop: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
