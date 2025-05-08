import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {useUser} from 'store/user/hooks';
import {layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {SelectInput} from 'components/SelectInput';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import styles from './BusinessInfo.styles';

interface FormValues {
  businessName: string;
  businessRegistrationNo: string;
  accountType: string;
  employeeCount: string;
  description: string;
}

const initialValues: FormValues = {
  businessName: '',
  businessRegistrationNo: '',
  accountType: '',
  employeeCount: '',
  description: '',
};

const validationSchema = yup.object({
  businessName: yup.string().required(),
  businessRegistrationNo: yup.string().required(),
  accountType: yup.string().required(),
  employeeCount: yup.string().required(),
  description: yup.string().required(),
});

const BusinessInfo: FC<
  NativeStackScreenProps<AppStackNavParams, 'Business Info'>
> = ({navigation, route}) => {
  const {shouldFlow = true} = route.params ?? {};

  const {updateBusiness, loading, error, setError, business, getBusiness} =
    useBusiness();
  const {getCarRecords, carRecords} = useUser();

  useEffect(() => {
    getCarRecords({group_by: 'make'});
  }, [getCarRecords]);

  const [selectedBrands, setSelectedBrands] = useState<Array<string>>([]);

  const onSubmit = async (values: FormValues) => {
    console.log(values);

    const res = await updateBusiness({
      ...values,
      brandSpecialization: selectedBrands,
    });

    if (res && !res.error) {
      if (shouldFlow) {
        navigation.navigate('Address', {shouldFlow});
      } else {
        await getBusiness();
        navigation.goBack();
      }
    }
  };

  const carMakes =
    carRecords?.map(car => {
      return {
        label: car.make,
        value: {name: car.make, id: car.make},
      };
    }) || [];

  const accountTypes = [
    {
      label: 'individual',
      value: {name: 'individual', id: 'individual'},
    },
    {
      label: 'company',
      value: {name: 'company', id: 'company'},
    },
  ];

  const selectItem = value => {
    if (selectedBrands.includes(value)) {
      const newArr = selectedBrands.filter(item => item !== value);

      setSelectedBrands(newArr);
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

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
                  setFieldValue(
                    'businessRegistrationNo',
                    business?.businessRegistrationNo,
                  );
                  setFieldValue('businessName', business?.businessName);
                  setFieldValue('accountType', business?.accountType);
                  setSelectedBrands(business?.brandSpecialization);
                  setFieldValue('employeeCount', business?.employeeCount);
                  setFieldValue('description', business?.description);
                }
              }, [setFieldValue]);

              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        Tell us more about your business
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        We're excited to learn more about your garage and what
                        makes it special
                      </Text>
                    </View>

                    <Input
                      label="Business name"
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
                    />

                    <Input
                      label="Business registration no"
                      placeholder=""
                      value={values.businessRegistrationNo}
                      onChangeText={text =>
                        setFieldValue('businessRegistrationNo', text)
                      }
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.businessRegistrationNo &&
                        errors.businessRegistrationNo
                          ? errors.businessRegistrationNo
                          : undefined
                      }
                      onBlur={() => setFieldTouched('businessRegistrationNo')}
                      keyboardType="numeric"
                    />

                    <SelectInput
                      label="Account type"
                      placeholder=""
                      value={values.accountType}
                      onSelect={brandSpecialization => {
                        setFieldValue('accountType', brandSpecialization.name);
                      }}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.accountType && errors.accountType
                          ? errors.accountType
                          : undefined
                      }
                      onBlur={() => setFieldTouched('accountType')}
                      selectorHeight={hp(40)}
                      options={accountTypes}
                    />

                    <SelectInput
                      label="Car brand specialization"
                      placeholder=""
                      value={selectedBrands}
                      onSelect={brandSpecialization => {
                        selectItem(brandSpecialization.name);
                      }}
                      containerStyle={spacing.marginTop24}
                      onBlur={() => setFieldTouched('brandSpecialization')}
                      selectorHeight={hp(90)}
                      options={carMakes}
                      multi
                      searchable
                    />

                    <Input
                      label="No of employees"
                      placeholder=""
                      value={values.employeeCount}
                      onChangeText={text =>
                        setFieldValue('employeeCount', text)
                      }
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.employeeCount && errors.employeeCount
                          ? errors.employeeCount
                          : undefined
                      }
                      onBlur={() => setFieldTouched('employeeCount')}
                      keyboardType="numeric"
                    />

                    <Input
                      label="Business Description"
                      placeholder=""
                      value={values.description}
                      onChangeText={text => setFieldValue('description', text)}
                      containerStyle={spacing.marginTop24}
                      // eslint-disable-next-line react-native/no-inline-styles
                      textBoxStyle={{textAlignVertical: 'top'}}
                      error={
                        touched.description && errors.description
                          ? errors.description
                          : undefined
                      }
                      onBlur={() => setFieldTouched('description')}
                      rows={5}
                    />
                  </View>

                  <Button
                    title={shouldFlow ? 'Continue' : 'Save'}
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.description === '' ? true : loading}
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

export default BusinessInfo;
