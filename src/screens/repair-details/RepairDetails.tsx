import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import Car from 'components/svg/Car';
import {formatDateTime, formatCurrency} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './RepairDetails.styles';

const RepairDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Repair Details'>
> = ({navigation, route}) => {
  const {id} = route.params ?? {};

  const {services, getServices} = useBusiness();
  const {updateBidStatus, getBid, getBids, bid, loading} = useRequest();

  useEffect(() => {
    getBid(id);
    getServices();
  }, [getBid, id, getServices]);

  const additionalCosts = [
    {
      id: 1,
      name: 'VAT',
      amount: '0.00',
    },
  ];

  const request = bid?.request;
  const date = bid?.date;
  const bidPrices = bid?.prices;

  const handleSubmit = async () => {
    if (request?.status === 'Started') {
      // @ts-expect-error
      SheetManager.show('pickup-ready', {payload: {id}});
    } else {
      const res = await updateBidStatus({id, status: 'Started'});

      if (res && !res.error) {
        getBid(id);
        getBids();
      }
    }
  };

  let bg, badgeText;
  if (bid?.status === 'Booked') {
    bg = palette.BROWN;
    badgeText = `Appointment booked for ${date}`;
  } else if (bid?.status === 'Rejected') {
    bg = palette.RED;
    badgeText = 'Appointment Rejected';
  } else if (bid?.status === 'Started') {
    bg = palette.TEXT_HEADING;
    badgeText = 'You started this repair request';
  } else if (bid?.status === 'Completed') {
    bg = palette.GREEN;
    badgeText = 'You marked as ready for pickup';
  } else if (bid?.status === 'Submitted') {
    bg = palette.BLUE;
    badgeText = 'You submitted a bid';
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.semiheader28}>Repair details</Text>
        <Text style={styles.text16}>View details of this repair below</Text>

        {loading ? (
          <ActivityIndicator
            size={'large'}
            style={layout.flex1}
            color={palette.PRIMARY}
          />
        ) : (
          <View>
            {bid && (
              <View style={layout.flex1}>
                <View
                  style={[
                    spacing.marginTop16,
                    common.container,
                    common.flexedRow,
                    styles.gap8,
                  ]}>
                  <View style={[styles.statusContainer, {backgroundColor: bg}]}>
                    <Text style={styles.semiheader12}>{bid?.status}</Text>
                  </View>

                  <Text style={styles.text12}>{badgeText}</Text>
                </View>

                <View style={[spacing.marginTop16, common.container]}>
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

                    <Text style={styles.text14}>
                      {formatDateTime(request.createdAt, false)}
                    </Text>

                    <Text style={styles.text14}>{request.user.location}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[common.container, spacing.marginTop12]}
                  onPress={() =>
                    SheetManager.show('car-details', {
                      // @ts-expect-error
                      payload: {vehicle: request.vehicle},
                    })
                  }>
                  <View style={common.spacedRow}>
                    <View style={[common.spacedRow, styles.gap16, layout.flex1]}>
                      <View style={styles.circle}>
                        <Car size="20" />
                      </View>

                      <Text style={[styles.semiheader16, layout.flex1]}>
                        {request.vehicle.make} {request.vehicle.model}
                      </Text>
                    </View>

                    <Feather
                      name="chevron-right"
                      size={20}
                      color={palette.DEFAULT}
                    />
                  </View>
                </TouchableOpacity>

                <View style={[spacing.marginTop12, common.container]}>
                  {bidPrices.map((serviceBid, index, array) => (
                    <View key={index}>
                      <View style={[common.spacedRow, styles.gap8]}>
                        <View style={layout.flex1}>
                          <Text style={styles.text16}>
                            {
                              services?.find(
                                service => service._id === serviceBid.service,
                              ).name
                            }
                          </Text>

                          <Text
                            style={[styles.text14, {color: palette.GRAY500}]}>
                            {
                              services?.find(
                                service => service._id === serviceBid.service,
                              ).serviceType
                            }
                          </Text>
                        </View>

                        <Text style={styles.text16}>
                          {serviceBid.currency}{' '}
                          {formatCurrency(serviceBid.amount, 2)}
                        </Text>
                      </View>

                      {serviceBid !== array[array.length - 1] && (
                        <View style={styles.line} />
                      )}
                    </View>
                  ))}
                </View>

                <View style={[spacing.marginTop16, common.container]}>
                  {additionalCosts.map((cost, _, array) => (
                    <View key={cost.id}>
                      <View style={common.spacedRow}>
                        <Text style={styles.text16}>{cost.name}</Text>

                        <Text style={styles.text16}>
                          {bidPrices[0].currency} {cost.amount}
                        </Text>
                      </View>

                      {cost.id !== array.length && <View style={styles.line} />}
                    </View>
                  ))}
                </View>

                <View style={[spacing.marginTop12, common.spacedRow]}>
                  <Text style={styles.text16}>Total</Text>

                  <Text style={styles.header22}>
                    {bidPrices[0].currency}{' '}
                    {formatCurrency(
                      bidPrices.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.amount,
                        0,
                      ),
                      2,
                    )}
                  </Text>
                </View>
              </View>
            )}

            {(request?.status === 'Booked' ||
              request?.status === 'Started') && (
              <>
                <Button
                  title={
                    request?.status === 'Booked'
                      ? 'Start repair request'
                      : 'Pickup ready'
                  }
                  style={spacing.marginTop44}
                  onPress={handleSubmit}
                />

                <TouchableOpacity
                  style={spacing.marginTop20}
                  onPress={() => navigation.navigate('Cancel Request', {id})}>
                  <Text
                    style={[
                      styles.semiheader16,
                      common.textCenter,
                      {color: palette.PRIMARY_DARKEST},
                    ]}>
                    Cancel repair request
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepairDetails;
