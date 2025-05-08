import React, {FC} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {common, palette, spacing} from 'core/styles';
import styles from './BusinessDetails.styles';

const BusinessDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Business Details'>
> = ({navigation}) => {
  const fields = [
    {
      id: 1,
      text: 'Business information',
      screen: 'Business Info',
    },
    {
      id: 2,
      text: 'Operating hours',
      screen: 'Operating Days',
    },
    {
      id: 3,
      text: 'Business Address',
      screen: 'Address',
    },
    {
      id: 4,
      text: 'Garage services',
      screen: 'Services',
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.semiheader28}>Business details</Text>

        <View style={[spacing.marginTop32, common.container]}>
          {fields.map((field, _, array) => (
            <TouchableOpacity
              key={field.id}
              onPress={() =>
                //   @ts-expect-error
                navigation.navigate(field.screen, {shouldFlow: false})
              }>
              <View style={common.spacedRow}>
                <Text style={styles.text16}>{field.text}</Text>

                <Octicons name="pencil" color={palette.DEFAULT} size={18} />
              </View>

              {field.id !== array.length && <View style={styles.line} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BusinessDetails;
