import React, {FC, useState} from 'react';
import {Text, SafeAreaView, View, KeyboardAvoidingView} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {layout, spacing, palette} from 'core/styles';
import {Button} from 'components/Button';
import styles from './OwnGarage.styles';

const options = [
  {
    id: 1,
    name: 'Yes I do',
    value: 1,
  },
  {
    id: 2,
    name: "No I don't",
    value: 0,
  },
];

const OwnGarage: FC<
  NativeStackScreenProps<AppStackNavParams, 'Own Garage'>
> = ({navigation}) => {
  const [selected, setSelected] = useState<number>(11);

  const onSubmit = async () => {
    navigation.navigate('Add Business', {
      ownsGarage: selected === 1 ? true : false,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <View>
            <Text style={styles.semiheader28}>Do you own a garage?</Text>

            <Text style={[styles.text16, spacing.marginTop4]}>
              Aucarga can only works with businesses and freelancers that have
              registered garages.
            </Text>
          </View>

          <View style={[spacing.marginTop20, styles.marginalize]}>
            {options.map(type => (
              <CheckBox
                key={type.id}
                title={type.name}
                checked={selected === type.value}
                onPress={() => {
                  setSelected(type.value);
                }}
                containerStyle={styles.optionContainer}
                textStyle={[
                  styles.text16,
                  styles.optionLabel,
                  {color: palette.TEXT_HEADING},
                ]}
                uncheckedIcon={
                  <Ionicons
                    name="radio-button-off"
                    size={24}
                    color={palette.NEUTRAL30}
                  />
                }
                checkedIcon={
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={palette.SUCCESS}
                  />
                }
              />
            ))}
          </View>
        </View>

        <Button
          title="Continue"
          onPress={onSubmit}
          style={spacing.marginTop24}
          disabled={selected === 11}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OwnGarage;
