import React, {FC} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {SheetManager} from 'react-native-actions-sheet';
import {Country} from 'country-state-city';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './BusinessVerification.styles';

const BusinessVerification: FC<
  NativeStackScreenProps<AppStackNavParams, 'Business Verification'>
> = ({navigation}) => {
  const {current} = useUser();
  const {business} = useBusiness();

  const fields = [
    {
      id: 1,
      property: 'Business name',
      value: business?.businessName,
      editable: true,
      onPress: () => navigation.navigate('Business Info', {shouldFlow: false}),
    },
    {
      id: 2,
      property: 'Description',
      value: business?.description,
      editable: true,
      onPress: () => navigation.navigate('Business Info', {shouldFlow: false}),
    },
    {
      id: 3,
      property: 'Email',
      value: current?.email,
      editable: false,
      onPress: () => {},
    },
    {
      id: 4,
      property: 'Phone No',
      value: current?.phone,
      editable: true,
      onPress: () => navigation.navigate('Verify Phone'),
    },
    {
      id: 5,
      property: 'Account type',
      value: business?.accountType,
      editable: true,
      onPress: () => navigation.navigate('Business Info', {shouldFlow: false}),
    },
    {
      id: 6,
      property: 'Country',
      value: business?.country,
      editable: true,
      onPress: () => navigation.navigate('Address', {shouldFlow: false}),
    },
  ];

  const countryShortName = Country.getAllCountries().find(
    country => country.name === business?.country,
  )?.isoCode;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.semiheader28}>Business verification</Text>

        <Text style={[styles.text16, {color: palette.SUPPORT}]}>
          Review your details before verification, as they can't be changed
          afterwards
        </Text>

        {business?.stripeAccountId && !business?.stripeDetailsSubmitted && (
          <View
            style={[spacing.marginTop20, common.container, common.spacedRow]}>
            <View style={[common.flexedRow, styles.gap]}>
              <View style={styles.statusContainer}>
                <Text style={[styles.text12, {color: palette.WHITE}]}>
                  In review
                </Text>
              </View>

              <Text style={styles.text12}>
                Your business verification has started
              </Text>
            </View>
          </View>
        )}

        <View style={layout.flex1}>
          <View style={[spacing.marginTop16, common.container]}>
            {fields
              // .filter(filteredField => filteredField.value)
              .map((field, _, array) => (
                <View key={field.id}>
                  <TouchableOpacity
                    style={[common.spacedRow, styles.gap24]}
                    activeOpacity={1}
                    onPress={() => field.editable && field.onPress()}>
                    <Text style={styles.text16}>{field.property}</Text>

                    <View style={layout.flex1}>
                      <View
                        style={[
                          common.spacedRow,
                          common.justifyEnd,
                          styles.gap,
                        ]}>
                        <Text style={[styles.text16, common.textRight]}>
                          {field.value}
                        </Text>

                        {field.editable && (
                          <Octicons
                            name="pencil"
                            color={palette.DEFAULT}
                            size={18}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>

                  {field.id !== array.length && <View style={styles.line} />}
                </View>
              ))}
          </View>
        </View>

        <Button
          title="Begin verification"
          onPress={() => {
            SheetManager.show('stripe-onboarding', {
              // @ts-expect-error
              payload: {
                country: countryShortName,
              },
            });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessVerification;
