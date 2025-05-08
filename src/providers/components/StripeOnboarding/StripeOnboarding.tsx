import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {navigate} from 'navigation/utils';
import {spacing, common} from 'core/styles';
import styles from './StripeOnboarding.styles';

const StripeOnboarding = (props: any) => {
  const country: string = props?.payload?.country ?? '';

  const {stripeOnboard, loading, error, setError} = useBusiness();

  const navigateToStripeOnboarding = async () => {
    const res = await stripeOnboard({country});

    if (res && !res.error) {
      // Linking.openURL(res.payload.data.url);

      SheetManager.hide('stripe-onboarding');

      navigate('Stripe Onboarding', {url: res.payload.data.url});
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header22}>Begin Verification</Text>

      <Text style={styles.text16}>
        Are you sure you want to begin verification? Please note, your business
        details cannot be updated once verification begins.
      </Text>

      <View style={common.line} />

      <View>
        <Button
          title="Begin Verification"
          onPress={navigateToStripeOnboarding}
          style={spacing.marginTop16}
          loading={loading}
          disabled={loading}
        />
      </View>

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </ActionSheet>
  );
};

export default StripeOnboarding;
