import React, {FC, useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useAuth} from 'store/auth/hooks';
import {useUser} from 'store/user/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import Pencil from 'components/svg/Pencil';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './PersonalDetails.styles';

const PersonalDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Personal Details'>
> = ({navigation}) => {
  const {current, updateProfile, getProfile, loading, setError, error} =
    useUser();
  const {setFormData} = useAuth();

  const [profileImage, setProfileImage] = useState<Asset | undefined>();

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.didCancel && result.assets) {
      setProfileImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    await setFormData(true);

    const formData = new FormData();

    formData.append('profileImage', {
      uri: profileImage?.uri,
      type: 'image/jpg',
      /* @ts-expect-error */
      name: profileImage.uri.split('/').slice(-1)[0],
    });

    const res = await updateProfile(formData);

    if (res && !res.error) {
      await getProfile();
      navigation.navigate('Bottom Tabs');
    }

    await setFormData(false);
  };

  const fields = [
    {
      id: 1,
      property: 'First name',
      value: current?.firstName,
      editable: true,
      onPress: () => navigation.navigate('Change Name', {type: 'first'}),
    },
    {
      id: 2,
      property: 'Last name',
      value: current?.lastName,
      editable: true,
      onPress: () => navigation.navigate('Change Name', {type: 'last'}),
    },
    {
      id: 3,
      property: 'Email',
      value: current?.email,
      editable: false,
      onPress: () => {},
    },
    {
      id: 4,
      property: 'Phone No',
      value: current?.phone,
      editable: true,
      onPress: () => navigation.navigate('Verify Phone'),
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.semiheader28}>Personal details</Text>

        <TouchableOpacity
          style={[common.alignSelfCenter, spacing.marginTop24]}
          onPress={pickImage}>
          <View style={[styles.absoluteCircle, common.centeredRow]}>
            <Pencil />
          </View>

          {profileImage ? (
            <Image
              source={profileImage}
              style={styles.imgCircle}
              resizeMode="cover"
            />
          ) : current?.profileImage ? (
            <Image
              source={{uri: current?.profileImage}}
              style={styles.imgCircle}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imgCircle}>
              <Text style={styles.semiheader22}>
                {current?.firstName.charAt(0).toUpperCase()}
                {current?.lastName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {!current?.phone && (
          <View style={spacing.marginTop16}>
            <Text style={[styles.text16, {color: palette.SUPPORT}]}>
              Attention Required
            </Text>

            <TouchableOpacity
              style={[common.container, spacing.marginTop4, common.spacedRow]}
              onPress={() => navigation.navigate('Verify Phone')}>
              <View style={[common.spacedRow, layout.flex1]}>
                <View>
                  <Text style={styles.text16}>Phone Number</Text>

                  <Text style={styles.text13}>
                    for notifications, reminders
                  </Text>
                </View>

                <View style={common.flexedRow}>
                  <Text style={styles.semiheader16}>Add</Text>

                  <Feather name="plus" size={20} color={palette.PRIMARY} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={layout.flex1}>
          <View style={[spacing.marginTop32, common.container]}>
            {fields
              .filter(filteredField => filteredField.value)
              .map((field, _, array) => (
                <View key={field.id}>
                  <TouchableOpacity
                    style={common.spacedRow}
                    activeOpacity={1}
                    onPress={() => field.editable && field.onPress()}>
                    <Text style={styles.text16}>{field.property}</Text>

                    <View style={[common.spacedRow, styles.gap]}>
                      <Text style={styles.text16}>{field.value}</Text>

                      {field.editable && (
                        <Octicons
                          name="pencil"
                          color={palette.DEFAULT}
                          size={18}
                        />
                      )}
                    </View>
                  </TouchableOpacity>

                  {field.id !== array.length && <View style={styles.line} />}
                </View>
              ))}
          </View>

          <View style={spacing.marginTop16}>
            <Text style={[styles.text16, {color: palette.SUPPORT}]}>
              Account
            </Text>

            <TouchableOpacity
              style={[common.container, spacing.marginTop4, common.spacedRow]}
              onPress={() => navigation.navigate('Change Password')}>
              <View style={[common.spacedRow, layout.flex1]}>
                <Text style={styles.text16}>Change Password</Text>

                <Entypo
                  name="chevron-small-right"
                  size={24}
                  color={palette.DEFAULT}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Save Changes"
          disabled={loading}
          loading={loading}
          onPress={handleSubmit}
        />
      </View>

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

export default PersonalDetails;
