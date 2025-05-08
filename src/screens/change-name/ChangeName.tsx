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
import styles from './ChangeName.styles';

interface FormValues {
  firstName?: string;
  lastName?: string;
}

const ChangeName: FC<
  NativeStackScreenProps<AppStackNavParams, 'Change Name'>
> = ({navigation, route}) => {
  const {type} = route.params ?? {};

  let yupObject;
  let initialValues: FormValues = {};

  if (type === 'first') {
    initialValues = {
      firstName: '',
    };

    yupObject = {
      firstName: yup.string().required(),
    };
  } else if (type === 'last') {
    initialValues = {
      lastName: '',
    };

    yupObject = {
      lastName: yup.string().required(),
    };
  }

  const validationSchema = yup.object(yupObject);

  const {updateProfile, loading, error, setError, getProfile} = useUser();

  const onSubmit = async (values: FormValues) => {
    const res = await updateProfile(values);

    if (res && !res.error) {
      await getProfile();
      navigation.navigate('Personal Details');
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
              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        Change your {type} name
                      </Text>
                    </View>

                    {type === 'first' ? (
                      <Input
                        label="First Name"
                        placeholder=""
                        value={values.firstName || ''}
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
                    ) : (
                      <Input
                        label="Last Name"
                        placeholder=""
                        value={values.lastName || ''}
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
                    )}
                  </View>

                  <Button
                    title="Save"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={loading}
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

export default ChangeName;
