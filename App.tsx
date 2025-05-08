import React, {FC, useEffect} from 'react';
import {StatusBar} from 'react-native';
import 'country-state-city';
// @ts-expect-error
import {ONESIGNAL_APP_ID} from '@env';
import {Provider} from 'react-redux';
import {Host} from 'react-native-portalize';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import {AppNav} from '@src/navigation';
import SheetsProvider from 'providers';
import {navigationRef} from 'navigation/utils';
import interceptors from '@src/http/interceptors';
import {store} from 'store/index';
import {layout} from 'core/styles';

interceptors.setup(store);

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(ONESIGNAL_APP_ID);

  return (
    <GestureHandlerRootView style={layout.flex1}>
      <StatusBar barStyle={'dark-content'} />

      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Host>
            <SheetsProvider>
              <AppNav />
            </SheetsProvider>
          </Host>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
