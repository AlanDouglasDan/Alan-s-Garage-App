/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useRef, useMemo, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {OneSignal} from 'react-native-onesignal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useUser} from 'store/user/hooks';
import {useRequest} from 'store/request/hooks';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import Bell from 'components/svg/Bell';
import Navigation from 'components/svg/Navigation';
import {darkMapStyle} from 'core/constants';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Home.styles';

const personalRequiredFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'location',
  'isPhoneVerified',
];

const businessRequiredFields = [
  'businessName',
  'country',
  'ownsGarage',
  'hasSchedule',
  'businessRegistrationNo',
  'employeeCount',
  'description',
  'addressLine1',
  'addressLine2',
  'city',
  'postCode',
  'stripeAccountId',
  'stripeDetailsSubmitted',
  'services',
];

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const Home: FC<NativeStackScreenProps<BottomTabsNavParams, 'Home'>> = ({
  navigation,
}) => {
  const {getProfile, current, loading} = useUser();
  const {getBusiness, business, getGarages, garages} = useBusiness();
  const {getRequests, requests} = useRequest();

  const sheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * ASPECT_RATIO, // Adjusted for screen size
  });
  const [selectedRequest, setSelectedRequest] = useState<any>();

  useEffect(() => {
    getProfile().then(res => {
      OneSignal.Notifications.requestPermission(true);
      OneSignal.login(res.payload.data._id);
    });

    getBusiness();
    getGarages();
  }, [getBusiness, getProfile, getGarages]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const newRegion = {
          ...region,
          latitude,
          longitude,
        };
        setRegion(newRegion);

        // Animate the map to the new user location
        mapRef.current?.animateToRegion(newRegion, 1000);
      },
      error => console.log(error),
      {},
    );
  };

  useEffect(() => {
    getRequests();
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRequest = (request: any) => {
    setSelectedRequest(request);

    sheetRef.current?.snapToIndex(1);
  };

  const snapPoints = useMemo(() => [1, 250], []);

  let percCount = 0;

  if (current) {
    personalRequiredFields.forEach(field => {
      if (current[field]) {
        percCount +=
          100 / (personalRequiredFields.length + businessRequiredFields.length);
      }
    });
  }

  if (business) {
    businessRequiredFields.forEach((field, index) => {
      if (
        index === businessRequiredFields.length - 1
          ? business[field].length > 0
          : business[field]
      ) {
        percCount +=
          100 / (personalRequiredFields.length + businessRequiredFields.length);
      }
    });
  }

  const grantLocationAccess = () => {
    /* @ts-expect-error Action will bubble up to the AppStackNav where "Permissions" screen is defined */
    current?.location && navigation.navigate('Permissions', {step: 3});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <View style={styles.innerContainer}>
          <View style={common.spacedRow}>
            <Text style={styles.semiheader20}>Hi {current?.firstName} 👋</Text>

            <TouchableOpacity
              /* @ts-expect-error Action will bubble up to the AppStackNav where "Notifications" screen is defined */
              onPress={() => navigation.navigate('Notifications')}>
              <Bell />
            </TouchableOpacity>
          </View>

          <View style={[spacing.marginTop4, common.flexedRow, styles.gap]}>
            <TouchableOpacity onPress={getLocation}>
              <Navigation />
            </TouchableOpacity>

            <Text
              style={[
                styles.text16,
                {
                  textDecorationLine: current?.location
                    ? undefined
                    : 'underline',
                },
              ]}
              numberOfLines={1}
              onPress={grantLocationAccess}>
              {current?.location ?? 'Location access not granted'}
            </Text>
          </View>

          <View style={layout.flex1}>
            {percCount.toFixed(0) !== '100' ? (
              <View style={[spacing.marginTop24, common.container]}>
                <Text style={styles.semiheader16}>
                  Your profile is {percCount.toFixed(0)}% complete
                </Text>

                <Text style={[styles.text13, spacing.marginTop4]}>
                  Almost there! To be able to start using Aucarga, please finish
                  your account verification
                </Text>

                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressValue, {width: `${percCount}%`}]}
                  />
                </View>

                <Button
                  title="Finish account setup"
                  /* @ts-expect-error Action will bubble up to the AppStackNav where "Account Setup" screen is defined */
                  onPress={() => navigation.navigate('Account Setup')}
                />
              </View>
            ) : (
              region.latitude !== 0 && (
                <MapView
                  ref={mapRef}
                  // provider={PROVIDER_GOOGLE}
                  region={region}
                  style={[
                    layout.flex1,
                    styles.negativeMargins,
                    spacing.marginTop16,
                  ]}
                  customMapStyle={darkMapStyle}>
                  {garages?.length !== 0 &&
                    garages?.map(
                      (garage: any) =>
                        garage.coordinates.coordinates[0] !== 0 && (
                          <Marker
                            key={garage._id}
                            coordinate={{
                              latitude: garage.coordinates.coordinates[1],
                              longitude: garage.coordinates.coordinates[0],
                            }}
                            image={images.marker}
                            title={garage.name}
                          />
                        ),
                    )}

                  {requests?.length !== 0 &&
                    requests
                      ?.filter(request => request.status === 'Pending')
                      ?.map(
                        request =>
                          request.user.coordinates.coordinates[0] !== 0 && (
                            <Marker
                              key={request._id}
                              coordinate={{
                                longitude:
                                  request.user.coordinates.coordinates[0],
                                latitude:
                                  request.user.coordinates.coordinates[1],
                              }}
                              image={images.requestMarker}
                              // title={request.businessName}
                              onPress={() => markRequest(request)}
                            />
                          ),
                      )}
                </MapView>
              )
            )}
          </View>

          {percCount.toFixed(0) === '100' && (
            <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              index={0}
              backgroundStyle={[common.shadow, {borderRadius: 0}]}
              enableDynamicSizing={false}>
              <View style={styles.bottomContentContainer}>
                <View style={common.spacedRow}>
                  <Text style={styles.semiheader20}>Repair request</Text>

                  <Ionicons
                    name="close"
                    size={24}
                    color={palette.TEXT_HEADING}
                    onPress={() => sheetRef.current?.close()}
                  />
                </View>

                <View
                  style={[
                    common.container,
                    common.spacedRow,
                    spacing.marginBottom10,
                    spacing.marginTop10,
                  ]}>
                  <View style={[common.flexedRow, styles.gap, layout.flex1]}>
                    {selectedRequest?.user.profileImage ? (
                      <Image
                        source={{uri: selectedRequest?.user.profileImage}}
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.profileImage}>
                        <Text style={styles.semiheader22}>
                          {selectedRequest?.user.firstName
                            .charAt(0)
                            .toUpperCase()}
                          {selectedRequest?.user.lastName
                            .charAt(0)
                            .toUpperCase()}
                        </Text>
                      </View>
                    )}

                    <View>
                      <Text style={styles.semiheader16}>
                        {selectedRequest?.user.firstName}{' '}
                        {selectedRequest?.user.lastName}
                      </Text>

                      <Text style={styles.text13}>
                        {selectedRequest?.user.location}
                      </Text>
                    </View>
                  </View>

                  <Feather
                    name="chevron-right"
                    size={24}
                    color={palette.TEXT_HEADING}
                  />
                </View>

                <Button
                  title="View repair request"
                  onPress={() =>
                    selectedRequest &&
                    /* @ts-expect-error Action will bubble up to the AppStackNav where "Request Details" screen is defined */
                    navigation.navigate('Request Details', {
                      request: selectedRequest,
                    })
                  }
                />
              </View>
            </BottomSheet>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
