/* eslint-disable react-native/no-inline-styles */
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {StatusModal} from 'components/StatusModal';
import {Button} from 'components/Button';
import * as yup from 'yup';
import styles from './ContactUs.styles';

interface FormValues {
  message: string;
}

const initialValues: FormValues = {
  message: '',
};

const validationSchema = yup.object({
  message: yup.string().required(),
});

const ContactUs: FC<
  NativeStackScreenProps<AppStackNavParams, 'Contact Us'>
> = ({navigation}) => {
  const {loading, error, setError} = useUser();

  const onSubmit = async (values: FormValues) => {
    console.log(values);

    navigation.navigate('Success', {
      title: 'Response Successfully Submitted',
      body: 'Thank you for your feedback! We appreciate your input and will get back to you soon.',
      nextScreen: 'Bottom Tabs',
    });

    // const res = await ContactUs(values);
    // if (res && !res.error) {
    // }
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
                      <Text style={styles.semiheader28}>Contact Us</Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        We'd love to hear from you! Please complete this form,
                        and we'll get back to you as soon as possible
                      </Text>
                    </View>

                    <Input
                      label="How can we help you ?"
                      placeholder=""
                      value={values.message}
                      onChangeText={text => setFieldValue('message', text)}
                      containerStyle={spacing.marginTop24}
                      textBoxStyle={{height: 120, textAlignVertical: 'top'}}
                      error={
                        touched.message && errors.message
                          ? errors.message
                          : undefined
                      }
                      onBlur={() => setFieldTouched('message')}
                      rows={5}
                    />

                    <Text style={[styles.text11, spacing.marginTop4]}>
                      {values.message.length}/200
                    </Text>
                  </View>

                  <Button
                    title="Submit"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.message === '' ? true : loading}
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

export default ContactUs;
