import React, {FC, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {useAuth} from 'store/auth/hooks';
import {OtpVerification} from 'components/OtpVerification';
import {StatusModal} from 'components/StatusModal';
import {spacing} from 'core/styles';
import styles from './EmailVerification.styles';

const EmailVerification: FC<
  NativeStackScreenProps<AuthStackNavParams, 'Email Verification'>
> = ({route}) => {
  const {email} = route.params ?? {};

  const {verifyOtp, loading, error, setError} = useAuth();

  const [value, setValue] = useState<string>('');

  const onSubmit = async () => {
    await verifyOtp({
      email: email.toLocaleLowerCase(),
      otp: value,
      type: 'account',
      userType: 'garage_owner',
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always">
        <OtpVerification
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
          text={
            <Text style={[styles.text16, spacing.marginTop4]}>
              Please enter code sent to{' '}
              <Text style={styles.mediumText}>{email}</Text>, remember to check
              your inbox and spam
            </Text>
          }
          loading={loading}
        />
      </ScrollView>

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </SafeAreaView>
  );
};

export default EmailVerification;
