/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {CheckBox} from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Country} from 'country-state-city';
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import Car from 'components/svg/Car';
import {formatDate} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './AdditionalRepairs.styles';

export type SelectedService = {
  _id: string;
  description: string;
  amount: number;
  currency: string | undefined;
};

const AdditionalRepairs: FC<
  NativeStackScreenProps<AppStackNavParams, 'Additional Repairs'>
> = ({route, navigation}) => {
  const {request} = route.params ?? {};

  const {services, getServices, business} = useBusiness();

  const country = Country.getAllCountries().find(_country => {
    if (_country.name === business.country) {
      return _country;
    }
  });

  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    !services && getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [expanded, setExpanded] = useState<string[]>([]);

  const [bgColor, setBgColor] = useState<string>(palette.WHITE);

  const groupServicesByServiceType = (_data: any): any => {
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

  const handleSheetChanges = useCallback(index => {
    if (index === 0) {
      setBgColor('rgba(16, 24, 40, 0.15)');
    } else {
      setBgColor(palette.WHITE);
    }

    Keyboard.dismiss();
  }, []);

  const selectService = value => {
    if (
      selectedServices.some(selectedService => selectedService._id === value)
    ) {
      const newArr = selectedServices.filter(item => item._id !== value);

      setSelectedServices(newArr);
    } else {
      setSelectedServices([
        ...selectedServices,
        {
          _id: value,
          description: '',
          amount: 0,
          currency: country?.currency,
        },
      ]);

      sheetRef.current?.snapToIndex(0);
    }
  };

  const selectExpanded = value => {
    if (expanded.includes(value)) {
      const newArr = expanded.filter(item => item !== value);

      setExpanded(newArr);
    } else {
      setExpanded([...expanded, value]);
    }
  };

  const closeModal = () => {
    sheetRef.current?.close();
    Keyboard.dismiss();
  };

  console.log(selectedServices);

  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: bgColor}]}>
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
              <View style={[common.progressValue, {width: '50%'}]} />
            </View>

            <Text style={[styles.text13, common.textLeft]}>
              Repair type: 1/2
            </Text>
          </View>

          <View style={[common.centeredColumn, spacing.marginTop24]}>
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

          <View style={spacing.marginTop20}>
            {groupServicesByServiceType(services)?.map(
              ([serviceType, _services], _index) => (
                <View
                  style={[spacing.marginBottom16, common.container]}
                  key={_index}>
                  <TouchableOpacity
                    style={common.spacedRow}
                    activeOpacity={1}
                    onPress={() => selectExpanded(serviceType)}>
                    <Text style={styles.semiheader17}>{serviceType}</Text>

                    <AntDesign
                      name={
                        expanded.includes(serviceType)
                          ? 'minussquareo'
                          : 'plussquareo'
                      }
                      size={22}
                      color={palette.TEXT_HEADING}
                    />
                  </TouchableOpacity>

                  {expanded.includes(serviceType) && (
                    <View>
                      <View style={styles.line} />

                      <View style={styles.marginalize}>
                        {_services.map(service => (
                          <View style={[common.spacedRow]} key={service._id}>
                            <CheckBox
                              key={service._id}
                              title={service.name}
                              // checked={selectedServices.includes(service._id)}
                              checked={selectedServices.some(
                                selectedService =>
                                  selectedService._id === service._id,
                              )}
                              onPress={() => {
                                selectService(service._id);
                              }}
                              containerStyle={styles.optionContainer}
                              textStyle={[styles.text16, styles.optionLabel]}
                              uncheckedIcon={
                                <Ionicons
                                  name="square-outline"
                                  size={24}
                                  color={palette.NEUTRAL30}
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
                  )}
                </View>
              ),
            )}
          </View>
        </View>

        <Button
          title="Continue"
          style={spacing.marginTop24}
          disabled={selectedServices.length === 0}
          onPress={() =>
            navigation.navigate('Additional Pricing', {
              request,
              selectedServices,
            })
          }
        />
      </ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={['60%']}
        index={-1}
        onChange={handleSheetChanges}
        keyboardBehavior="interactive"
        enablePanDownToClose
        enableDynamicSizing={false}
        enableContentPanningGesture={false}>
        <BottomSheetView style={styles.content}>
          <View style={layout.flex1}>
            <View style={common.spacedRow}>
              <Text style={styles.semiheader20}>
                {
                  services?.find(
                    service =>
                      service._id ===
                      selectedServices[selectedServices.length - 1]?._id,
                  )?.name
                }
              </Text>

              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={palette.DEFAULT} />
              </TouchableOpacity>
            </View>

            <View style={common.line} />

            <View>
              <Text style={[styles.semiheader17, common.textLeft]}>
                Describe repair
              </Text>

              <BottomSheetTextInput
                placeholder="Enter details about this repair"
                value={
                  selectedServices[selectedServices.length - 1]?.description
                }
                onChangeText={text =>
                  setSelectedServices(prev =>
                    prev.map(service => {
                      if (
                        service._id ===
                        selectedServices[selectedServices.length - 1]?._id
                      ) {
                        return {...service, description: text};
                      }
                      return service;
                    }),
                  )
                }
                style={styles.input}
                multiline
                numberOfLines={5}
              />

              <Text style={styles.text11}>
                {
                  selectedServices[selectedServices.length - 1]?.description
                    ?.length
                }
                /100
              </Text>
            </View>
          </View>

          <Button
            title="Done"
            onPress={closeModal}
            disabled={
              !selectedServices[selectedServices.length - 1]?.description
            }
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default AdditionalRepairs;
