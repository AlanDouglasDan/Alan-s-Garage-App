import React, {FC} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Keyboard
} from 'react-native';
import {Formik} from 'formik';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {layout, spacing} from 'core/styles';
import {PasswordInput} from 'components/PasswordInput';
import {Button} from 'components/Button';
// import {StatusModal} from 'components/StatusModal';
import * as yup from 'yup';
import styles from './CreatePassword.styles';

interface FormValues {
  password: string;
  confirmPassord: string;
}

const initialValues: FormValues = {
  password: '',
  confirmPassord: '',
};

const validationSchema = yup.object({
  password: yup.string().required(),
  confirmPassord: yup
    .string()
    // .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const CreatePassword: FC<
  NativeStackScreenProps<AppStackNavParams, 'Create Password'>
> = ({}) => {
  const onSubmit = async (values: FormValues) => {
    Keyboard.dismiss();
    await SheetManager.show('terms-privacy', {
      // @ts-expect-error
      payload: {
        password: values.password,
      },
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
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
                      <Text style={styles.semiheader28}>
                        Create your password
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        This will be the password you'll use to access your
                        account on subsequent visits
                      </Text>
                    </View>

                    <PasswordInput
                      label="Password"
                      placeholder=""
                      value={values.password}
                      onChangeText={text => setFieldValue('password', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : undefined
                      }
                      onBlur={() => setFieldTouched('password')}
                    />

                    <Text style={[styles.text16, spacing.marginTop4]}>
                      Your password must be at least 8 characters long and
                      include 1 symbol and 1 number.
                    </Text>

                    <PasswordInput
                      label="Re-enter Password"
                      placeholder=""
                      value={values.confirmPassord}
                      onChangeText={text =>
                        setFieldValue('confirmPassord', text)
                      }
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.confirmPassord && errors.confirmPassord
                          ? errors.confirmPassord
                          : undefined
                      }
                      onBlur={() => setFieldTouched('confirmPassord')}
                    />

                    <Text style={[styles.text16, spacing.marginTop4]}>
                      Your password must be at least 8 characters long and
                      include 1 symbol and 1 number.
                    </Text>
                  </View>

                  <Button
                    title="Create your account"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    disabled={values.confirmPassord === ''}
                  />
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      /> */}
    </SafeAreaView>
  );
};

export default CreatePassword;
