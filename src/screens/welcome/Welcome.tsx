import React, {FC} from 'react';
import {Text, Image, View, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {Button} from 'components/Button';
import {images} from 'core/images';
import {layout} from 'core/styles';
import styles from './Welcome.styles';

const Welcome: FC<NativeStackScreenProps<AppStackNavParams, 'Welcome'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View>
          <Image
            source={images.welcome}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.semiheader28}>Welcome to Aucarga Garage</Text>

          <Text style={styles.text17}>
            Your Account has been successfully created
          </Text>
        </View>

        <View style={[layout.flex1, {justifyContent: 'flex-end'}]}>
          <Button title="Done" onPress={() => navigation.navigate('Bottom Tabs')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
