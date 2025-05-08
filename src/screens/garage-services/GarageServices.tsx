import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './GarageServices.styles';

const GarageServices: FC<
  NativeStackScreenProps<AppStackNavParams, 'Garage Services'>
> = ({navigation, route}) => {
  const {garage} = route.params ?? {};

  const {
    loading,
    loading2,
    getServices,
    services,
    error,
    setError,
    updateGarage,
    getGarages,
  } = useBusiness();

  useEffect(() => {
    getServices();
  }, [getServices]);

  const [selectedServices, setSelectedServices] = useState<string[]>(
    garage?.services.map(service => service._id) || [],
  );

  const groupServicesByServiceType = (_data: any[]): any => {
    const groupedMessages = {};
    _data?.forEach(data => {
      const dateString = data.serviceType;
      if (!groupedMessages[dateString]) {
        groupedMessages[dateString] = [];
      }

      groupedMessages[dateString].push({id: data._id, ...data});
    });

    return Object.entries(groupedMessages);
  };

  const selectService = value => {
    if (selectedServices.includes(value)) {
      const newArr = selectedServices.filter(item => item !== value);

      setSelectedServices(newArr);
    } else {
      setSelectedServices([...selectedServices, value]);
    }
  };

  const handleSubmit = async () => {
    const res = await updateGarage({
      services: selectedServices,
      id: garage._id,
    });

    if (res && !res.error) {
      getGarages();

      navigation.navigate('Success', {
        title: 'Garage added successfully',
        nextScreen: 'Bottom Tabs',
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading2 ? (
        <ActivityIndicator
          size={'large'}
          color={palette.PRIMARY}
          style={layout.flex1}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View>
            <Text style={styles.semiheader28}>Add Garage</Text>

            <Text style={[styles.text16, spacing.marginTop4]}>
              Enter your garage details
            </Text>
          </View>

          <View>
            <View style={common.progressBar}>
              <View style={[common.progressValue]} />
            </View>

            <Text style={styles.text13}>Company details: 3/3</Text>
          </View>

          <Text style={[styles.semiheader22, spacing.marginTop20]}>
            What services does your garage offer?
          </Text>

          <View style={spacing.marginTop24}>
            {groupServicesByServiceType(services)?.map(
              ([serviceType, _services], _index) => (
                <View style={spacing.marginBottom36} key={_index}>
                  <Text style={styles.semiheader17}>{serviceType}</Text>

                  <View style={styles.line} />

                  <View style={styles.marginalize}>
                    {_services.map(service => (
                      <View style={[common.spacedRow]} key={service._id}>
                        <CheckBox
                          key={service._id}
                          title={service.name}
                          checked={selectedServices.includes(service._id)}
                          onPress={() => {
                            selectService(service._id);
                          }}
                          containerStyle={styles.optionContainer}
                          textStyle={[styles.text16, styles.optionLabel]}
                          uncheckedIcon={
                            <Ionicons
                              name="square-outline"
                              size={24}
                              color={palette.PRIMARY}
                            />
                          }
                          checkedIcon={
                            <Ionicons
                              name="checkbox-sharp"
                              size={24}
                              color={palette.PRIMARY}
                            />
                          }
                        />
                      </View>
                    ))}
                  </View>
                </View>
              ),
            )}
          </View>

          <Button
            title="Finish"
            style={spacing.marginTop12}
            onPress={handleSubmit}
            disabled={loading}
            loading={loading}
          />
        </ScrollView>
      )}

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

export default GarageServices;
