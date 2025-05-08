import {FC} from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {Button} from 'components/Button';
import {images} from 'core/images';
import {layout, spacing} from 'core/styles';
import styles from './GetStarted.styles';

const GetStarted: FC<
  NativeStackScreenProps<AuthStackNavParams, 'Get Started'>
> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <Image
            source={images.logo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Image
          source={images.car}
          style={styles.locationImage}
          resizeMode="contain"
        />

        <View style={[layout.flex1, {justifyContent: 'flex-end'}]}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Sign Up')}
          />

          <TouchableOpacity
            style={spacing.marginTop20}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.semiheader16}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetStarted;
