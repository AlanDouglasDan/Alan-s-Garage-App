import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
// @ts-expect-error
import {GOOGLE_MAPS_API_KEY} from '@env';
import {
  GooglePlacesAutocomplete,
  Point,
} from 'react-native-google-places-autocomplete';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {layout, spacing, common, palette, typography} from 'core/styles';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {BottomSheet} from 'components/BottomSheet';
import {ArrowBack} from 'components/ArrowBack';
import styles from './GarageAddress.styles';

interface FormValues {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postCode: string;
}

const initialValues: FormValues = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  postCode: '',
};

const validationSchema = yup.object({
  addressLine1: yup.string().required(),
  addressLine2: yup.string(),
  city: yup.string().required(),
  postCode: yup.string().required(),
});

const GarageAddress: FC<
  NativeStackScreenProps<AppStackNavParams, 'Garage Address'>
> = ({navigation, route}) => {
  const {garage} = route.params ?? {};
  const {updateGarage, loading, error, setError} = useBusiness();

  const [address, setAddress] = useState<1 | 2 | null>();
  const [editedAddress1, setEditedAddress1] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Point | undefined>();

  const onSubmit = async (values: FormValues) => {
    const res = await updateGarage({
      ...values,
      longitude: coordinates?.lng,
      latitude: coordinates?.lat,
      id: garage._id,
    });

    if (res && !res.error) {
      // getGarages();

      // navigation.navigate('Success', {
      //   title: 'Garage added successfully',
      //   nextScreen: 'Bottom Tabs',
      // });
      navigation.navigate('Garage Services', {garage: res.payload.data});
    }
  };

  console.log(coordinates);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
            }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                if (garage) {
                  setFieldValue('addressLine1', garage?.addressLine1);
                  setFieldValue('addressLine2', garage?.addressLine2);
                  setFieldValue('city', garage?.city);
                  setFieldValue('postCode', garage?.postCode);
                }
              }, [setFieldValue]);

              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>Add Garage</Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Enter your garage details
                      </Text>
                    </View>

                    <View>
                      <View style={common.progressBar}>
                        <View
                          style={[common.progressValue, {width: '66.66%'}]}
                        />
                      </View>

                      <Text style={styles.text13}>Company details: 2/3</Text>
                    </View>

                    {editedAddress1 ? (
                      <Input
                        label="Address Line 1"
                        placeholder=""
                        value={values.addressLine1}
                        onChangeText={text =>
                          setFieldValue('addressLine1', text)
                        }
                        containerStyle={spacing.marginTop24}
                        error={
                          touched.addressLine1 && errors.addressLine1
                            ? errors.addressLine1
                            : undefined
                        }
                        onBlur={() => setFieldTouched('addressLine1')}
                      />
                    ) : (
                      <View style={spacing.marginTop24}>
                        <Text style={styles.label}>Address Line 1</Text>

                        <TouchableOpacity onPress={() => setAddress(1)}>
                          <View style={styles.input}>
                            <Text style={styles.inputText}>
                              {values.addressLine1}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}

                    <View style={spacing.marginTop24}>
                      <TouchableOpacity onPress={() => setAddress(2)}>
                        <Text style={styles.label}>Address Line 2</Text>

                        <View style={styles.input}>
                          <Text style={styles.inputText}>
                            {values.addressLine2}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <Input
                      label="City"
                      placeholder=""
                      value={values.city}
                      onChangeText={text => setFieldValue('city', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.city && errors.city ? errors.city : undefined
                      }
                      onBlur={() => setFieldTouched('city')}
                    />

                    <Input
                      label="Post code"
                      placeholder=""
                      value={values.postCode}
                      onChangeText={text => setFieldValue('postCode', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.postCode && errors.postCode
                          ? errors.postCode
                          : undefined
                      }
                      onBlur={() => setFieldTouched('postCode')}
                    />
                  </View>

                  <Button
                    title="Finish"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.postCode === '' ? true : loading}
                  />

                  <BottomSheet
                    open={address === 1 || address === 2}
                    onClose={() => setAddress(null)}
                    height={hp(100)}>
                    <View style={styles.content}>
                      <View style={layout.flex1}>
                        <View
                          style={[common.spacedRow, spacing.marginBottom20]}>
                          <ArrowBack onPress={() => setAddress(null)} />

                          <Text style={styles.semiheader24}>
                            Select Location
                          </Text>

                          <View style={{width: 24}} />
                        </View>

                        <GooglePlacesAutocomplete
                          placeholder="Search"
                          fetchDetails
                          onPress={(data, details = null) => {
                            setCoordinates(details?.geometry.location);
                            setFieldValue(
                              address === 1 ? 'addressLine1' : 'addressLine2',
                              data.structured_formatting.main_text ||
                                data.description,
                            );

                            if (address === 1) {
                              setEditedAddress1(true);

                              setFieldValue(
                                'city',
                                details?.address_components.find(component =>
                                  component.types.includes('locality'),
                                )?.long_name,
                              );

                              setFieldValue(
                                'postCode',
                                details?.address_components.find(component =>
                                  component.types.includes('postal_code'),
                                )?.long_name,
                              );
                            }
                          }}
                          query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en',
                          }}
                          textInputProps={{
                            placeholderTextColor: '#888888', // Set your desired placeholder color here
                          }}
                          styles={{
                            textInputContainer: spacing.marginTop12,
                            textInput: [
                              {
                                ...typography.text17,
                                color: palette.DEFAULT,
                                borderRadius: 0,
                                padding: 16,
                                borderWidth: 1,
                                borderColor: palette.PRIMARY,
                              },
                            ],
                            container: {},
                            predefinedPlacesDescription: styles.text16,
                            description: {
                              color: palette.BLACK,
                            },
                          }}
                          listViewDisplayed
                        />
                      </View>

                      <Button
                        title="Continue"
                        onPress={() => setAddress(null)}
                      />
                    </View>
                  </BottomSheet>
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default GarageAddress;
