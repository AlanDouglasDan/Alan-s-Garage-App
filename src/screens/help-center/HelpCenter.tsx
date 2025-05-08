import React, {FC} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import Document3 from 'components/svg/Document3';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './HelpCenter.styles';

const HelpCenter: FC<
  NativeStackScreenProps<AppStackNavParams, 'Help Center'>
> = ({navigation}) => {
  const menus = [
    {
      id: 1,
      property: 'Terms and Conditions',
      icon: <Document3 />,
      screen: 'Terms',
    },
    {
      id: 2,
      property: 'Privacy Policy',
      icon: <Document3 />,
      screen: 'Privacy',
    },
  ];

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
          <Text style={styles.semiheader28}>Help Center</Text>

          <View style={[spacing.marginTop24, common.container]}>
            {menus.map((field, _, array) => (
              <View key={field.id}>
                <TouchableOpacity
                  style={common.spacedRow}
                  onPress={() =>
                    field.screen !== null &&
                    // @ts-expect-error
                    navigation.navigate(field.screen)
                  }>
                  <View style={[common.spacedRow, styles.gap]}>
                    {field.icon}

                    <Text style={styles.text16}>{field.property}</Text>
                  </View>

                  <Entypo
                    name="chevron-right"
                    size={20}
                    color={palette.DEFAULT}
                  />
                </TouchableOpacity>

                {field.id !== array.length && <View style={common.line} />}
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HelpCenter;
