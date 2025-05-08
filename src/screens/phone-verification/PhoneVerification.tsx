import React, {FC, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {OtpVerification} from 'components/OtpVerification';
import {StatusModal} from 'components/StatusModal';
import {spacing} from 'core/styles';
import styles from './PhoneVerification.styles';

const PhoneVerification: FC<
  NativeStackScreenProps<AppStackNavParams, 'Phone Verification'>
> = ({navigation, route}) => {
  const {phone} = route.params ?? {};

  const {verifyPhone, loading, error, setError, getProfile} = useUser();

  const [value, setValue] = useState<string>('');

  const onSubmit = async () => {
    const res = await verifyPhone({
      phone,
      otp: value,
    });

    if (res && !res.error) {
      await getProfile();
      navigation.navigate('Personal Details');
    }
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
              <Text style={styles.mediumText}>{phone}</Text>
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

export default PhoneVerification;
