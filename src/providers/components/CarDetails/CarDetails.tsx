import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';

import {common, palette} from 'core/styles';
import styles from './CarDetails.styles';

const CarDetails = (props: any) => {
  const vehicle: any = props?.payload?.vehicle ?? {};

  console.log(vehicle);

  const details = [
    {
      id: 1,
      name: 'Vehicle Type',
      value: vehicle.vehicleType,
    },
    {
      id: 2,
      name: 'Make',
      value: vehicle.make,
    },
    {
      id: 3,
      name: 'Model',
      value: vehicle.model,
    },
    {
      id: 4,
      name: 'Year',
      value: vehicle.year,
    },
    {
      id: 5,
      name: 'Color',
      value: vehicle.color,
    },
    {
      id: 6,
      name: 'License plate number',
      value: vehicle.plateNumber,
    },
    {
      id: 7,
      name: 'Engine',
      value: vehicle.engineType,
    },
    {
      id: 8,
      name: 'Transmission',
      value: vehicle.transmissionType,
    },
    {
      id: 9,
      name: 'Fuel Type',
      value: vehicle.fuelType,
    },
  ];

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <ScrollView>
        <View style={common.spacedRow}>
          <Text style={styles.header22}>Car details</Text>

          <Feather
            name="x"
            size={20}
            color={palette.TEXT_HEADING}
            onPress={() => SheetManager.hide('car-details')}
          />
        </View>

        <View style={common.line} />

        {details.map(item => (
          <View key={item.id}>
            <View style={[common.spacedRow, styles.pad]}>
              <Text style={styles.text17}>{item.name}</Text>
              <Text style={styles.text17}>{item.value}</Text>
            </View>

            <View style={common.line} />
          </View>
        ))}
      </ScrollView>
    </ActionSheet>
  );
};

export default CarDetails;
