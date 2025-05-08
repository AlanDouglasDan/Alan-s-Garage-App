import React, {FC} from 'react';
import {Modal, View, Text, Pressable, Image} from 'react-native';

import {images} from 'core/images';
import {layout, common, palette} from 'core/styles';
import styles from './StatusModal.styles';

interface StatusModalProps {
  message: string;
  open: boolean;
  onClose: () => void;
  status: 'success' | 'error';
}

const StatusModal: FC<StatusModalProps> = ({
  message,
  open,
  onClose,
  status,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}>
      <Pressable style={layout.flex1} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContentContainer,
              common.shadow,
              {borderColor: status === 'success' ? '#6CE9A6' : '#FDA29B'},
            ]}>
            <View
              style={[
                styles.flexedRow,
                {alignItems: status === 'success' ? 'center' : 'flex-start'},
              ]}>
              {/* <Image
                source={status === 'success' ? images.success : images.error}
                style={styles.image}
                resizeMode="contain"
              /> */}

              <View style={layout.flex1}>
                <Text
                  style={[
                    styles.semiHeader16,
                    {color: status === 'success' ? '#027A48' : palette.DANGER},
                  ]}>
                  {status === 'success'
                    ? message
                    : 'There was a problem with that action'}
                </Text>

                {status === 'error' && (
                  <Text style={styles.text16}>
                    {message ?? 'Oops, seems something went wrong.'}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default StatusModal;
