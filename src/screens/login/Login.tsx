import React, {FC, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {Formik} from 'formik';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {useAuth} from 'store/auth/hooks';
import {common, layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {PasswordInput} from 'components/PasswordInput';
import {Button} from 'components/Button';
import Apple from 'components/svg/Apple';
import Google from 'components/svg/Google';
import {StatusModal} from 'components/StatusModal';
import * as yup from 'yup';
import styles from './Login.styles';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Email address is invalid').required(),
  password: yup.string().required(),
});

const Login: FC<NativeStackScreenProps<AuthStackNavParams, 'Login'>> = ({
  navigation,
}) => {
  const {logIn, loading, error, setError, socialLogIn} = useAuth();

  const [userEmail, setUserEmail] = useState<string>('');

  const onSubmit = async (values: FormValues) => {
    const {email, password} = values;

    setUserEmail(email);

    await logIn({
      email: email.toLocaleLowerCase(),
      password,
      userType: 'garage_owner',
    });
  };

  GoogleSignin.configure({
    webClientId:
      '655934586703-plo1e5leg729kndmr1fds4h4oe9j4aoe.apps.googleusercontent.com',
  });

  const authenticateGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();

      const response = await GoogleSignin.signIn();

      if (response?.data?.idToken) {
        await socialLogIn({
          provider: 'google',
          token: response.data.idToken,
          userType: 'garage_owner',
        });
      } else {
        setError('An Error Occured with your google authentication!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const authenticateApple = async () => {
    if (Platform.OS === 'ios') {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (
        credentialState === appleAuth.State.AUTHORIZED &&
        appleAuthRequestResponse?.identityToken
      ) {
        // user is authenticated
        await socialLogIn({
          provider: 'apple',
          token: appleAuthRequestResponse.identityToken,
          userType: 'garage_owner',
        });
      } else {
        setError('An Error Occured with your apple authentication!');
      }
    } else {
      // Generate secure, random values for state and nonce
      const rawNonce = uuid();
      const state = uuid();


      // Configure the request
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.applesignin.aucarga',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://backend.aucarga.com/v2/apple_signin/callback',

        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,

        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,

        // Random nonce value that will be SHA256 hashed before sending to Apple.
        nonce: rawNonce,

        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
        state,
      });

      // Open the browser window for user sign in
      const response = await appleAuthAndroid.signIn();

      if (response.id_token) {
        await socialLogIn({
          provider: 'apple',
          token: response.id_token,
          userType: 'garage_owner',
        });
      } else {
        setError('An Error Occured with your apple authentication!');
      }
    }
  };

  const onCloseErrorModal = () => {
    if (error === 'Please, verify your account before logging in.') {
      navigation.navigate('Email Verification', {
        email: userEmail,
        // type: 'account',
      });
    }

    setError(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
        behavior="padding">
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always">
          <View>
            <Text style={styles.semiheader28}>Welcome Back</Text>

            <Text style={[styles.text16, spacing.marginTop4]}>
              Please enter your email and password to access your aucarga
              account.
            </Text>
          </View>

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
                  <Input
                    label="Email"
                    placeholder=""
                    value={values.email}
                    onChangeText={text => setFieldValue('email', text)}
                    containerStyle={spacing.marginTop24}
                    error={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    onBlur={() => setFieldTouched('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

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

                  <TouchableOpacity>
                    <Text style={[styles.text16, spacing.marginTop4]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <Button
                    title="Login"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.password === '' ? true : loading}
                  />
                </>
              );
            }}
          </Formik>

          <Text style={styles.text17}>OR</Text>

          <View style={styles.gap}>
            <TouchableOpacity
              style={styles.socials}
              onPress={authenticateApple}>
              <Apple />
              <Text style={styles.semiheader16}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socials}
              onPress={authenticateGoogle}>
              <Google />
              <Text style={styles.semiheader16}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={[common.centeredRow, spacing.marginTop12]}>
            <Text style={styles.text16}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.mediumText}>Create one</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusModal
        open={!!error}
        onClose={onCloseErrorModal}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </SafeAreaView>
  );
};

export default Login;
