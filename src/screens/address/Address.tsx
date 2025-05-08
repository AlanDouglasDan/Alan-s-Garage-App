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
import {Country} from 'country-state-city';
// @ts-expect-error
import {GOOGLE_MAPS_API_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {layout, spacing, common, palette, typography} from 'core/styles';
import {Input} from 'components/Input';
import {SelectInput} from 'components/SelectInput';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {BottomSheet} from 'components/BottomSheet';
import {ArrowBack} from 'components/ArrowBack';
import styles from './Address.styles';

interface FormValues {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postCode: string;
  country: string;
}

const initialValues: FormValues = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  postCode: '',
  country: '',
};

const validationSchema = yup.object({
  addressLine1: yup.string().required(),
  addressLine2: yup.string(),
  city: yup.string().required(),
  postCode: yup.string().required(),
  country: yup.string().required(),
});

const Address: FC<NativeStackScreenProps<AppStackNavParams, 'Address'>> = ({
  navigation,
  route,
}) => {
  const {shouldFlow = true} = route.params ?? {};

  const {updateBusiness, loading, error, setError, business, getBusiness} =
    useBusiness();

  const [address, setAddress] = useState<1 | 2 | null>();
  const [editedCountry, setEditedCountry] = useState<boolean>(false);
  const [editedAddress1, setEditedAddress1] = useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    const {country, ...rest} = values;

    const res = await updateBusiness({
      ...rest,
      country: editedCountry ? country.slice(5) : country,
    });

    if (res && !res.error) {
      await getBusiness();

      shouldFlow ? navigation.navigate('Account Setup') : navigation.goBack();
    }
  };

  const _countries = Country.getAllCountries();

  const countries = _countries.map(country => {
    return {
      label: `${country.flag} ${country.name}`,
      value: {name: `${country.flag} ${country.name}`, id: country.isoCode},
    };
  });

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
                if (business) {
                  setFieldValue('addressLine1', business?.addressLine1);
                  setFieldValue('addressLine2', business?.addressLine2);
                  setFieldValue('city', business?.city);
                  setFieldValue('postCode', business?.postCode);
                  setFieldValue('country', business?.country);
                }
              }, [setFieldValue]);

              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        How can we find you?
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        We want car owners to easily locate your garage
                      </Text>
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

                    <SelectInput
                      label="Country"
                      placeholder=""
                      value={values.country}
                      onSelect={country => {
                        setFieldValue('country', country.name);
                        setEditedCountry(true);
                      }}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.country && errors.country
                          ? errors.country
                          : undefined
                      }
                      onBlur={() => setFieldTouched('country')}
                      selectorHeight={hp(90)}
                      options={countries}
                      searchable
                    />
                  </View>

                  <Button
                    title={shouldFlow ? 'Continue' : 'Save'}
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
                            console.log(data);
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

                              setFieldValue(
                                'country',
                                details?.address_components.find(component =>
                                  component.types.includes('country'),
                                )?.long_name,
                              );

                              setEditedCountry(false);
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

export default Address;
