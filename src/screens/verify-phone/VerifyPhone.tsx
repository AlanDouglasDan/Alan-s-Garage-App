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

import {useUser} from 'store/user/hooks';
import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {common, layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {SelectInput} from 'components/SelectInput';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import * as yup from 'yup';
import styles from './VerifyPhone.styles';

interface FormValues {
  countryCode: string;
  phone: string;
}

const initialValues: FormValues = {
  countryCode: '',
  phone: '',
};

const validationSchema = yup.object({
  countryCode: yup.string(),
  phone: yup.string(),
});

const VerifyPhone: FC<
  NativeStackScreenProps<AppStackNavParams, 'Verify Phone'>
> = ({navigation}) => {
  const {updatePhone, loading, error, setError} = useUser();

  const onSubmit = async (values: FormValues) => {
    const {phone, countryCode} = values;

    const formattedPhoneNumber = `${countryCode.slice(5)}${phone}`;

    const res = await updatePhone({
      // countryCode: countryCode.slice(5),
      phone: formattedPhoneNumber,
    });

    if (res && !res.error) {
      navigation.navigate('Phone Verification', {phone: formattedPhoneNumber});
    }
  };

  const _countries = Country.getAllCountries();

  const countries = _countries.map(country => {
    return {
      label: `${country.flag} ${country.phonecode.startsWith('+') ? '' : '+'}${
        country.phonecode
      } (${country.name})`,
      value: {
        name: `${country.flag} ${country.phonecode.startsWith('+') ? '' : '+'}${
          country.phonecode
        }`,
        id: country.isoCode,
      },
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
              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        Verify phone number
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        We’ll send a code to verify your phone number
                      </Text>
                    </View>

                    <View style={spacing.marginTop24}>
                      <Text style={styles.label}>Phone Number</Text>
                      <View style={[common.flexedRow, styles.gap]}>
                        <SelectInput
                          label=""
                          placeholder=""
                          value={values.countryCode}
                          onSelect={countryCode => {
                            setFieldValue('countryCode', countryCode.name);
                          }}
                          // containerStyle={spacing.marginTop24}
                          error={
                            touched.countryCode && errors.countryCode
                              ? errors.countryCode
                              : undefined
                          }
                          onBlur={() => setFieldTouched('countryCode')}
                          selectorHeight={hp(90)}
                          options={countries}
                          searchable
                        />

                        <Input
                          label=""
                          placeholder=""
                          value={values.phone}
                          onChangeText={text => setFieldValue('phone', text)}
                          containerStyle={layout.flex1}
                          error={
                            touched.phone && errors.phone
                              ? errors.phone
                              : undefined
                          }
                          onBlur={() => setFieldTouched('phone')}
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </View>

                  <Button
                    title="Continue"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.phone === '' ? true : loading}
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

export default VerifyPhone;
