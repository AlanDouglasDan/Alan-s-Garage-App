import React, {FC} from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {Button} from 'components/Button';
import {images} from 'core/images';
import {layout} from 'core/styles';
import styles from './Success.styles';

const Success: FC<NativeStackScreenProps<AppStackNavParams, 'Success'>> = ({
  navigation,
  route,
}) => {
  const {title, body, nextScreen} = route.params ?? {};

  const onSubmit = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={layout.flex1} />

        <View>
          <Image
            source={images.success}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.semiheader28}>{title}</Text>

          <Text style={styles.text17}>{body}</Text>
        </View>

        <View style={[layout.flex1, {justifyContent: 'flex-end'}]}>
          <Button title="Done" onPress={onSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Success;
