import React, {FC, ReactNode, useRef, useEffect, useCallback} from 'react';
import {Animated, StatusBar} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Portal} from 'react-native-portalize';

import {usePrevious} from 'hooks';
import styles from './BottomSheet.styles';

const MODAL_HEIGHT = hp('50%') + (StatusBar.currentHeight ?? 0);

interface BottomSheetProps {
  open: boolean;
  children: ReactNode;
  height?: number;
  onClose: () => void;
  onBottomReached?: () => void;
  HeaderComponent?: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({
  open,
  children,
  height = MODAL_HEIGHT,
  HeaderComponent,
  onClose,
  onBottomReached,
}) => {
  const modalizeRef = useRef<Modalize | null>(null);
  const prevOpen = usePrevious(open);

  useEffect(() => {
    if (prevOpen !== undefined && prevOpen !== open) {
      if (modalizeRef.current) {
        if (open) {
          modalizeRef.current.open();
        } else {
          modalizeRef.current.close();
        }
      }
    }
  }, [prevOpen, open]);

  const onClosedHandler = useCallback(() => {
    if (onBottomReached) {
      onBottomReached();
    }
    onClose();
  }, [onClose, onBottomReached]);

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalHeight={height}
        onClosed={onClosedHandler}
        withHandle={false}
        customRenderer={
          <Animated.ScrollView keyboardShouldPersistTaps="always">
            {children}
          </Animated.ScrollView>
        }
        avoidKeyboardLikeIOS
        keyboardAvoidingOffset={-height}
        modalStyle={styles.modal}
        HeaderComponent={HeaderComponent}
      />
    </Portal>
  );
};

export default BottomSheet;
