import React, {FC} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import Car from 'components/svg/Car';
import {formatDate, formatCurrency} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Summary.styles';

const Summary: FC<NativeStackScreenProps<AppStackNavParams, 'Summary'>> = ({
  navigation,
  route,
}) => {
  const {request, bidData, additionalRepair} = route.params ?? {};

  const {submitBid, getBids, createAdditionalRepair, loading, error, setError} =
    useRequest();
  const {services} = useBusiness();

  const additionalCosts = [
    {
      id: 1,
      name: 'VAT',
      amount: '0.00',
    },
  ];

  const handleSubmit = async () => {
    if (additionalRepair) {
      const res = await createAdditionalRepair({
        prices: bidData.map(bid => {
          return {
            service: bid._id,
            amount: bid.amount,
            currency: bid.currency,
            description: bid.description,
          };
        }),
        carOwner: request.user._id,
        request: request._id,
      });

      if (res && !res.error) {
        navigation.navigate('Success', {
          title: 'Additional repairs sent successfully',
          nextScreen: 'Bottom Tabs',
        });
      }
    } else {
      const res = await submitBid({
        prices: bidData.map(bid => {
          return {
            amount: bid.amount,
            currency: bid.currency,
            service: bid.service._id,
          };
        }),
        carOwner: request.user._id,
        request: request._id,
      });

      if (res && !res.error) {
        await getBids();

        navigation.navigate('Success', {
          title: 'Bid sent successfully',
          nextScreen: 'Bottom Tabs',
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <Text style={styles.semiheader28}>Summary</Text>

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

              <Text style={styles.text14}>{formatDate(request.createdAt)}</Text>

              <Text style={styles.text14}>{request.user.location}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[common.container, spacing.marginTop16]}
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

          <View style={[spacing.marginTop16, common.container]}>
            {bidData.map((serviceBid, index, array) => (
              <View key={index}>
                <View style={[common.spacedRow, styles.gap8]}>
                  <View style={layout.flex1}>
                    <Text style={styles.text16}>
                      {additionalRepair
                        ? services?.find(
                            _service => _service._id === serviceBid._id,
                          )?.name
                        : serviceBid.service.name}
                    </Text>

                    <Text style={[styles.text14, {color: palette.GRAY500}]}>
                      {additionalRepair
                        ? serviceBid.description
                        : serviceBid.service.serviceType}
                    </Text>
                  </View>

                  <Text style={styles.text16}>
                    {serviceBid.currency} {formatCurrency(serviceBid.amount, 2)}
                  </Text>
                </View>

                {serviceBid !== array[array.length - 1] && (
                  <View style={styles.line} />
                )}
              </View>
            ))}
          </View>

          <View
            style={[
              spacing.marginTop16,
              common.container,
              {backgroundColor: palette.NEUTRAL10},
            ]}>
            {additionalCosts.map((cost, _, array) => (
              <View key={cost.id}>
                <View style={common.spacedRow}>
                  <Text style={styles.text16}>{cost.name}</Text>

                  <Text style={styles.text16}>
                    {bidData[0].currency} {cost.amount}
                  </Text>
                </View>

                {cost.id !== array.length && <View style={styles.line} />}
              </View>
            ))}
          </View>

          <View style={[spacing.marginTop16, common.spacedRow]}>
            <Text style={styles.text16}>Total</Text>

            <Text style={styles.header22}>
              {bidData[0].currency}{' '}
              {formatCurrency(
                bidData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.amount,
                  0,
                ),
                2,
              )}
            </Text>
          </View>
        </View>

        <Button
          title={additionalRepair ? 'Send repair details' : 'Confirm bid'}
          style={spacing.marginTop24}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
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

export default Summary;
