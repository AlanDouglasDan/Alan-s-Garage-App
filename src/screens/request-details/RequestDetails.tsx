import React, {FC, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Country} from 'country-state-city';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Request} from 'components/Request';
import {Button} from 'components/Button';
import Car from 'components/svg/Car';
import {formatDate} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './RequestDetails.styles';

const RequestDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Request Details'>
> = ({navigation, route}) => {
  const {request} = route.params ?? {};

  const {business} = useBusiness();

  const country = Country.getAllCountries().find(_country => {
    if (_country.name === business.country) {
      return _country;
    }
  });

  // Initialize the bidData state with service IDs, default amount, and currency
  const [bidData, setBidData] = useState(
    request.services.map(service => ({
      service, // Dynamic service ID
      amount: 0, // Default amount
      currency: country?.currency,
    })),
  );

  // Function to update the amount for a specific service
  const updateAmount = (index, newAmount) => {
    setBidData(prevBidData =>
      prevBidData.map((bid, i) =>
        i === index ? {...bid, amount: newAmount} : bid,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <View style={common.centeredColumn}>
            {request.user.profileImage ? (
              <Image
                source={{uri: request.user.profileImage}}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.image}>
                <Text style={styles.semiheader22}>
                  {request.user.firstName.charAt(0).toUpperCase()}
                  {request.user.lastName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={[spacing.marginTop16, styles.gap]}>
              <Text style={styles.semiheader17}>
                {request.user.firstName} {request.user.lastName}
              </Text>

              <Text style={styles.text13}>{formatDate(request.createdAt)}</Text>

              <Text style={styles.text13}>{request.user.location}</Text>

              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      request.status === 'Pending'
                        ? palette.NEUTRAL10
                        : palette.SUCCESS_LIGHTEST,
                  },
                ]}>
                <Text
                  style={[
                    styles.text12,
                    {
                      color:
                        request.status === 'Pending'
                          ? palette.DEFAULT
                          : palette.SUCCESS,
                    },
                  ]}>
                  {request.status}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[common.container, spacing.marginTop24]}
            onPress={() =>
              SheetManager.show('car-details', {
                // @ts-expect-error
                payload: {vehicle: request.vehicle},
              })
            }>
            <View style={common.spacedRow}>
              <View style={[common.spacedRow, styles.gap16]}>
                <View style={styles.circle}>
                  <Car size="20" />
                </View>

                <Text style={styles.semiheader16}>
                  {request.vehicle.make} {request.vehicle.model}
                </Text>
              </View>

              <Feather name="chevron-right" size={20} color={palette.DEFAULT} />
            </View>
          </TouchableOpacity>

          <View style={[common.container, spacing.marginTop20]}>
            {request.services?.map((service, index: number, array) => (
              <Request
                service={service._id}
                array={array}
                key={index}
                index={index}
                amount={bidData[index].amount}
                updateAmount={updateAmount}
                country={country}
                title={service.name}
                body={service.serviceType}
              />
            ))}
          </View>
        </View>

        <Button
          title="Send bid"
          style={spacing.marginTop44}
          onPress={() =>
            navigation.navigate('Summary', {
              request,
              bidData,
              additionalRepair: false,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestDetails;
