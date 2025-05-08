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
import * as yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import styles from './AddName.styles';

interface FormValues {
  firstName: string;
  lastName: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
};

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const AddName: FC<NativeStackScreenProps<AppStackNavParams, 'Add Name'>> = ({
  navigation,
}) => {
  const {updateProfile, loading, error, setError} = useUser();

  const onSubmit = async (values: FormValues) => {
    const res = await updateProfile(values);

    if (res && !res.error) navigation.navigate('Own Garage');
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
              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        Tell us about yourself
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Please enter your legal names exactly as they appear on
                        your identity card
                      </Text>
                    </View>

                    <Input
                      label="First Name"
                      placeholder=""
                      value={values.firstName}
                      onChangeText={text => setFieldValue('firstName', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.firstName && errors.firstName
                          ? errors.firstName
                          : undefined
                      }
                      onBlur={() => setFieldTouched('firstName')}
                      autoCapitalize="none"
                    />

                    <Input
                      label="Last Name"
                      placeholder=""
                      value={values.lastName}
                      onChangeText={text => setFieldValue('lastName', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.lastName && errors.lastName
                          ? errors.lastName
                          : undefined
                      }
                      onBlur={() => setFieldTouched('lastName')}
                      autoCapitalize="none"
                    />
                  </View>

                  <Button
                    title="Continue"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.lastName === '' ? true : loading}
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

export default AddName;
