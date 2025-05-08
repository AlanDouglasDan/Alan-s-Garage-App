/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CheckBox} from '@rneui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {useAuth} from 'store/auth/hooks';
import {Button} from 'components/Button';
import {Input} from 'components/Input';
import {StatusModal} from 'components/StatusModal';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './DeleteAccount.styles';

const DeleteAccount: FC<
  NativeStackScreenProps<AppStackNavParams, 'Delete Account'>
> = ({navigation}) => {
  const {deleteAccount, loading, error, setError} = useUser();
  const {logOut} = useAuth();

  const [selected, setSelected] = useState<string | undefined>();
  const [message, setMessage] = useState<string>('');

  const options = [
    {
      id: 1,
      value: 'No longer using the service/platform',
    },
    {
      id: 2,
      value: 'Found a better alternative',
    },
    {
      id: 3,
      value: 'Privacy concerns',
    },
    {
      id: 4,
      value: 'Too many emails notifications',
    },
    {
      id: 5,
      value: 'Difficulty navigating the platform',
    },
    {
      id: 6,
      value: 'Account security concerns',
    },
    {
      id: 7,
      value: 'Personal reasons',
    },
    {
      id: 8,
      value: 'Others',
    },
  ];

  const handleSubmit = async () => {
    const deactivateAccountResponse = await deleteAccount({
      reason: selected,
      message,
    });

    if (deactivateAccountResponse && !deactivateAccountResponse.error) {
      const logoutResponse = await logOut();
      if (logoutResponse && !logoutResponse.error) {
        // @ts-expect-error
        navigation.navigate('Onboarding');
      }
    }
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
          <View style={layout.flex1}>
            <View>
              <Text style={styles.semiheader28}>Delete Account</Text>

              <Text style={[styles.text16, spacing.marginTop4]}>
                If you need to delete your account, You're prompted to provide a
                reason
              </Text>
            </View>

            <View style={[spacing.marginTop24, common.container]}>
              {options.map((field, _, array) => (
                <View key={field.id}>
                  <TouchableOpacity
                    style={common.flexedRow}
                    onPress={() => setSelected(field.value)}>
                    <View style={[common.spacedRow, styles.gap]}>
                      <CheckBox
                        title={field.value}
                        checked={field.value === selected}
                        onPress={() => setSelected(field.value)}
                        containerStyle={styles.optionContainer}
                        textStyle={[styles.text16, styles.optionLabel]}
                        uncheckedIcon={
                          <Ionicons
                            name="square-outline"
                            size={24}
                            color={palette.PRIMARY}
                          />
                        }
                        checkedIcon={
                          <Ionicons
                            name="checkbox-sharp"
                            size={24}
                            color={palette.PRIMARY}
                          />
                        }
                      />
                    </View>
                  </TouchableOpacity>

                  {field.id !== array.length && <View style={common.line} />}
                </View>
              ))}

              {selected === 'Others' && (
                <Input
                  label=""
                  placeholder="Write your review"
                  value={message}
                  onChangeText={text => setMessage(text)}
                  containerStyle={spacing.marginTop4}
                  textBoxStyle={{height: 120, textAlignVertical: 'top'}}
                  rows={5}
                />
              )}
            </View>
          </View>

          <Button
            title="Continue"
            disabled={!selected || loading}
            style={spacing.marginTop24}
            loading={loading}
            onPress={handleSubmit}
          />
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

export default DeleteAccount;
