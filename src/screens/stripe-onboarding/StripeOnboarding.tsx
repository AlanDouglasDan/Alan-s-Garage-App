import React, {FC, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import styles from './StripeOnboarding.styles';

const StripeOnboarding: FC<
  NativeStackScreenProps<AppStackNavParams, 'Stripe Onboarding'>
> = ({navigation, route}) => {
  const {url} = route.params ?? {};

  const webViewRef = useRef<any>();

  const onNavigateStateChange = state => {
    const {url: _url} = state;
    // console.log(state);
    if (!_url) {
      return;
    }

    if (_url === 'https://google.com/') {
      navigation.navigate('Success', {
        title: 'Business Verification Ongoing',
        body: 'Click the button below to continue using Aucarga for your business transactions',
        nextScreen: 'Bottom Tabs',
      });
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{uri: url}}
      style={styles.mainContainer}
      onNavigationStateChange={state => onNavigateStateChange(state)}
    />
  );
};

export default StripeOnboarding;
