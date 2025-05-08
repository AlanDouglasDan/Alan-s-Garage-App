/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {common, layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import styles from './AddGarage.styles';

interface FormValues {
  name: string;
  email: string;
  // registrationNumber: string;
  employeeCount: string;
  description: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  // registrationNumber: '',
  employeeCount: '',
  description: '',
};

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  // registrationNumber: yup.string().required(),
  employeeCount: yup.string().required(),
  description: yup.string().required(),
});

const AddGarage: FC<
  NativeStackScreenProps<AppStackNavParams, 'Add Garage'>
> = ({navigation, route}) => {
  const {garage} = route.params ?? {};

  const {updateGarage, addGarage, loading, error, setError} = useBusiness();

  const onSubmit = async (values: FormValues) => {
    const res = garage
      ? await updateGarage({...values, id: garage._id})
      : await addGarage(values);

    if (res && !res.error) {
      navigation.navigate('Garage Address', {garage: res.payload.data});
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
                if (garage) {
                  // setFieldValue(
                  //   'registrationNumber',
                  //   garage?.registrationNumber,
                  // );
                  setFieldValue('name', garage?.name);
                  setFieldValue('email', garage?.email);
                  setFieldValue('employeeCount', garage?.employeeCount);
                  setFieldValue('description', garage?.description);
                }
              }, [setFieldValue]);

              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>{garage ? 'Edit' : 'Add'} Garage</Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Enter your garage details
                      </Text>
                    </View>

                    <View>
                      <View style={common.progressBar}>
                        <View style={[common.progressValue, {width: '33.33%'}]} />
                      </View>

                      <Text style={styles.text13}>Company details: 1/3</Text>
                    </View>

                    <Input
                      label="Garage name"
                      placeholder=""
                      value={values.name}
                      onChangeText={text => setFieldValue('name', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.name && errors.name ? errors.name : undefined
                      }
                      onBlur={() => setFieldTouched('name')}
                    />

                    <Input
                      label="Garage email"
                      placeholder=""
                      value={values.email}
                      onChangeText={text => setFieldValue('email', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.email && errors.email ? errors.email : undefined
                      }
                      onBlur={() => setFieldTouched('email')}
                      keyboardType="email-address"
                    />

                    {/* <Input
                      label="Business registration number"
                      placeholder=""
                      value={values.registrationNumber}
                      onChangeText={text =>
                        setFieldValue('registrationNumber', text)
                      }
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.registrationNumber && errors.registrationNumber
                          ? errors.registrationNumber
                          : undefined
                      }
                      onBlur={() => setFieldTouched('registrationNumber')}
                      keyboardType="numeric"
                    /> */}

                    <Input
                      label="Staff strength"
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
                      label="Garage Description"
                      placeholder=""
                      value={values.description}
                      onChangeText={text => setFieldValue('description', text)}
                      containerStyle={spacing.marginTop24}
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
                    title="Proceed"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop44}
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

export default AddGarage;
