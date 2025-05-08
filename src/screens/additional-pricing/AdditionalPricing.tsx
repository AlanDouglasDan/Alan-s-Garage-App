import React, {FC, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import {Country} from 'country-state-city';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {Request} from 'components/Request';
import {common, layout, spacing} from 'core/styles';
import styles from './AdditionalPricing.styles';

const AdditionalPricing: FC<
  NativeStackScreenProps<AppStackNavParams, 'Additional Pricing'>
> = ({route, navigation}) => {
  const {request, selectedServices: _selectedServices} = route.params ?? {};

  const [selectedServices, setSelectedServices] = useState(_selectedServices);

  const {services, business} = useBusiness();

  const country = Country.getAllCountries().find(_country => {
    if (_country.name === business.country) {
      return _country;
    }
  });

  // console.log(selectedServices);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <View>
            <Text style={styles.semiheader28}>Additional repairs</Text>

            <Text style={[styles.text16, spacing.marginTop4]}>
              Fill out the correct details for additional repair
            </Text>
          </View>

          <View>
            <View style={common.progressBar}>
              <View style={common.progressValue} />
            </View>

            <Text style={[styles.text13, common.textLeft]}>
              Repair type: 2/2
            </Text>
          </View>

          <View style={[common.container, spacing.marginTop20]}>
            {selectedServices?.map((service, index: number, array) => (
              <Request
                service={service._id}
                array={array}
                key={index}
                index={index}
                amount={service.amount}
                title={
                  services?.find(_service => _service._id === service._id)
                    ?.name
                }
                body={service.description}
                updateAmount={(_index, value) =>
                  setSelectedServices(prev =>
                    prev.map((item, i) =>
                      i === _index ? {...item, amount: value} : item,
                    ),
                  )
                }
                country={country}
              />
            ))}
          </View>
        </View>

        <Button
          title="Summary"
          style={spacing.marginTop24}
          disabled={selectedServices.length === 0}
          onPress={() =>
            navigation.navigate('Summary', {
              request,
              bidData: selectedServices,
              additionalRepair: true,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdditionalPricing;
