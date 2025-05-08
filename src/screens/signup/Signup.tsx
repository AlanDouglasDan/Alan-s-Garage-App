import React, {FC} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {v4 as uuid} from 'uuid';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuth} from 'store/auth/hooks';
import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {spacing} from 'core/styles';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import Apple from 'components/svg/Apple';
import Google from 'components/svg/Google';
import * as yup from 'yup';
import styles from './Signup.styles';

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Email address is invalid').required(),
});

const Signup: FC<NativeStackScreenProps<AuthStackNavParams, 'Sign Up'>> = ({
  navigation,
}) => {
  const {signUp, loading, error, setError, socialSignup} = useAuth();

  GoogleSignin.configure({
    webClientId:
      '655934586703-plo1e5leg729kndmr1fds4h4oe9j4aoe.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  });

  const authenticateGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (response?.data?.idToken) {
        const res = await socialSignup({
          provider: 'google',
          token: response.data.idToken,
          userType: 'garage_owner',
        });

        if (res && !res.error) {
          navigation.navigate('Email Verification', {
            email: response.data.user.email,
          });
        }
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
        await socialSignup({
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
        await socialSignup({
          provider: 'apple',
          token: response.id_token,
          userType: 'garage_owner',
        });
      } else {
        setError('An Error Occured with your apple authentication!');
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    const {email} = values;

    const res = await signUp({
      email: email.toLocaleLowerCase(),
      userType: 'garage_owner',
    });

    if (res && !res.error) {
      navigation.navigate('Email Verification', values);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.semiheader28}>Sign up to Aucarga</Text>

          <Text style={[styles.text16, spacing.marginTop4]}>
            We'll send a code to verify & create your account
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
            const emailAlreadyExistsError = errors.email?.match(
              /email address already exists/i,
            );

            return (
              <>
                <Input
                  label="Business Email"
                  placeholder=""
                  value={values.email}
                  onChangeText={text => setFieldValue('email', text)}
                  containerStyle={spacing.marginTop24}
                  error={
                    touched.email && errors.email && !emailAlreadyExistsError
                      ? errors.email
                      : undefined
                  }
                  onBlur={() => setFieldTouched('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={[styles.text16, spacing.marginTop4]}>
                  Use the email associated to your business
                </Text>

                <Button
                  title="Continue"
                  onPress={() => handleSubmit()}
                  style={spacing.marginTop24}
                  loading={loading}
                  disabled={values.email === '' ? true : loading}
                />
              </>
            );
          }}
        </Formik>

        <Text style={styles.text17}>or</Text>

        <View style={styles.gap}>
          <TouchableOpacity style={styles.socials} onPress={authenticateApple}>
            <Apple />
            <Text style={styles.semiheader16}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socials} onPress={authenticateGoogle}>
            <Google />
            <Text style={styles.semiheader16}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
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

export default Signup;
