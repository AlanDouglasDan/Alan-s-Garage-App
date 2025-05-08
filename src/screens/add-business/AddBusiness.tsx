import React, {FC} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {Country} from 'country-state-city';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {SelectInput} from 'components/SelectInput';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import * as yup from 'yup';
import styles from './AddBusiness.styles';

interface FormValues {
  businessName: string;
  country: string;
}

const initialValues: FormValues = {
  businessName: '',
  country: '',
};

const validationSchema = yup.object({
  businessName: yup.string().required(),
  country: yup.string().required(),
});

const AddBusiness: FC<
  NativeStackScreenProps<AppStackNavParams, 'Add Business'>
> = ({navigation, route}) => {
  const {ownsGarage} = route.params ?? {};

  const {createBusiness, loading, error, setError} = useBusiness();

  const onSubmit = async (values: FormValues) => {
    const {country, businessName} = values;

    const res = await createBusiness({
      businessName,
      ownsGarage,
      country: country.slice(5),
    });

    if (res && !res.error) {
      navigation.navigate('Create Password');
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
          keyboardShouldPersistTaps="always"
          >
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
              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>Business Details</Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Please enter your legal names exactly as they appear on
                        your identity card
                      </Text>
                    </View>

                    <Input
                      label="Legal Business name"
                      placeholder=""
                      value={values.businessName}
                      onChangeText={text => setFieldValue('businessName', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.businessName && errors.businessName
                          ? errors.businessName
                          : undefined
                      }
                      onBlur={() => setFieldTouched('businessName')}
                      autoCapitalize="none"
                    />

                    <SelectInput
                      label="Country of registration?"
                      placeholder=""
                      value={values.country}
                      onSelect={country => {
                        setFieldValue('country', country.name);
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
                    title="Continue"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.country === '' ? true : loading}
                  />
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

export default AddBusiness;
