import React, {FC} from 'react';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import {useElapsedTime} from 'use-elapsed-time';

import {useAuth} from 'store/auth/hooks';
import {layout, spacing} from 'core/styles';
import {getFormattedCounter} from 'core/utils';
import {Button} from 'components/Button';
import styles from './OtpVerification.styles';

interface OtpVerificationProps {
  onSubmit: () => void;
  text: any;
  value: string;
  setValue: any;
  loading?: boolean;
}

const CELL_COUNT = 6;

const OtpVerification: FC<OtpVerificationProps> = ({
  onSubmit,
  text,
  value,
  setValue,
  loading,
}) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const codeExpiryTime = 300; // s

  const {elapsedTime, reset} = useElapsedTime({
    duration: codeExpiryTime,
    isPlaying: true,
    updateInterval: 1,
  });

  const remainingTime = Math.ceil(codeExpiryTime - elapsedTime);

  const cellWidth = (Dimensions.get('window').width - 40 - 60) / 6;

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild: any = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="•"
          isLastFilledCell={isLastFilledCell({index, value})}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[
          styles.cellVerification,
          isFocused && styles.cellFocused,
          styles.cellText,
          {width: cellWidth, height: cellWidth, lineHeight: cellWidth},
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const resendCode = async () => {
    // const res = await resendOtp({email});

    // if (res && !res.error)
    reset();
  };

  return (
    <KeyboardAvoidingView
      style={layout.flex1}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
      behavior="padding">
      <View style={layout.flex1}>
        <View>
          <Text style={styles.semiheader28}>Verify your account</Text>

          {text}
        </View>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.verificationCodeContainer}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </View>

      <Button
        title="Confirm"
        onPress={onSubmit}
        style={spacing.marginBottom20}
        loading={loading}
        disabled={value.length !== 6 ? true : loading}
      />

      <TouchableOpacity onPress={resendCode}>
        <Text style={styles.semiheader16}>
          Resend Code in {getFormattedCounter(remainingTime)}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;
