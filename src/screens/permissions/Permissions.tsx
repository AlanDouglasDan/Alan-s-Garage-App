import React, {FC, useState} from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LocalAuthentication from 'rn-local-authentication';
import {OneSignal} from 'react-native-onesignal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {StatusModal} from 'components/StatusModal';
import {Button} from 'components/Button';
import {images} from 'core/images';
import styles from './Permissions.styles';

const Permissions: FC<
  NativeStackScreenProps<AppStackNavParams, 'Permissions'>
> = ({navigation, route}) => {
  const {step = 1} = route.params ?? {};

  const {updateLocation, loading2, error, setError} = useUser();

  const [active, setActive] = useState<number>(step);

  const getLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const {latitude, longitude} = info.coords;

      console.log(info);

      const res = await updateLocation({longitude, latitude});

      if (res && !res.error) {
        onSubmit();
      }
    });
  };

  const authenticateBiometrics = async () => {
    const response = await LocalAuthentication.authenticateAsync({
      reason: 'Please, authenticate!',
    });

    console.log(response);

    if (response.success) {
      setActive(2);
    }
  };

  const triggerNotificationPermissionModal = () => {
    OneSignal.Notifications.requestPermission(true);

    setActive(3);
  };

  const permissionList = [
    {
      id: 1,
      image: images.biometrics,
      title: 'Make logging in faster with Biometrics',
      body: 'Add an extra layer of security to your app.',
      buttonText: 'Set up biometrics',
      onPressButton: authenticateBiometrics,
    },
    {
      id: 2,
      image: images.notification,
      title: 'Stay in the know with notifications',
      body: 'Allow Aucarga push important alerts about your account.',
      buttonText: 'Yes, keep me notified',
      onPressButton: triggerNotificationPermissionModal,
    },
    {
      id: 3,
      image: images.location,
      title: 'We need access to your Location',
      body: 'Your location helps our system to identify where your transactions originate.',
      buttonText: 'Grant access to location',
      onPressButton: getLocation,
    },
  ];

  const onSubmit = () => {
    step === 1 ? navigation.navigate('Welcome') : navigation.goBack();
  };

  const permission = permissionList.find(
    _permission => _permission.id === active,
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Image
          source={permission?.image}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.semiheader28}>{permission?.title}</Text>

        <Text style={styles.text17}>{permission?.body}</Text>

        <View style={styles.stackedButtons}>
          <Button
            title={permission?.buttonText ?? ''}
            onPress={permission?.onPressButton}
            loading={loading2}
            disabled={loading2}
          />

          <Button
            title="Not yet"
            opaque={false}
            onPress={() =>
              active < 3 ? setActive(_active => _active + 1) : onSubmit()
            }
          />
        </View>
      </View>

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

export default Permissions;
