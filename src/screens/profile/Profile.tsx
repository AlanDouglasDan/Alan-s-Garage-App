import React, {FC} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useAuth} from 'store/auth/hooks';
import {useUser} from 'store/user/hooks';
import {useBusiness} from 'store/business/hooks';
import User3 from 'components/svg/User3';
import Briefcase2 from 'components/svg/Briefcase2';
// import Document2 from 'components/svg/Document2';
import Settings from 'components/svg/Settings';
import Passcode from 'components/svg/Passcode';
import Mail from 'components/svg/Mail';
import Support from 'components/svg/Support';
import Folder from 'components/svg/Folder';
import Trash from '@src/components/svg/Trash';
import {common, spacing, palette} from 'core/styles';
import styles from './Profile.styles';

const Profile: FC<NativeStackScreenProps<BottomTabsNavParams, 'Profile'>> = ({
  navigation,
}) => {
  const {business} = useBusiness();
  const {logOut} = useAuth();
  const {current} = useUser();

  const logoutFunc = async () => {
    await logOut();
  };

  const menu = [
    {
      header: 'Account',
      subMenu: [
        {
          id: 1,
          property: 'Personal details',
          icon: <User3 />,
          screen: 'Personal Details',
        },
        {
          id: 2,
          property: 'Company details',
          icon: <Folder />,
          screen: 'Business Verification',
        },
        {
          id: 3,
          property: 'Business details',
          icon: <Briefcase2 />,
          screen: 'Business Details',
        },
        {
          id: 4,
          property: 'Delete Account',
          icon: <Trash />,
          screen: 'Delete Account',
        },
        // {
        //   id: 3,
        //   property: 'Documents',
        //   icon: <Document2 />,
        //   screen: 'Documents',
        // },
      ],
    },
    {
      header: 'Security',
      subMenu: [
        {
          id: 1,
          property: 'Settings',
          icon: <Settings />,
          screen: '',
        },
        {
          id: 2,
          property: 'Passcode',
          icon: <Passcode />,
          screen: '',
        },
      ],
    },
    {
      header: 'Support',
      subMenu: [
        {
          id: 1,
          property: 'Contact us',
          icon: <Mail />,
          screen: 'Contact Us',
        },
        {
          id: 2,
          property: 'Help center',
          icon: <Support />,
          screen: 'Help Center',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={common.alignSelfCenter}>
          {current?.profileImage ? (
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
        </View>

        <View style={[spacing.marginTop16, common.alignSelfCenter]}>
          <Text style={styles.semiheader16}>{business?.businessName}</Text>

          <View
            style={[
              styles.statusContainer,
              common.alignSelfCenter,
              spacing.marginTop4,
            ]}>
            <Text style={styles.text12}>Active</Text>
          </View>
        </View>

        <View>
          {menu.map((section, index) => (
            <View key={index} style={spacing.marginTop32}>
              <Text style={styles.text16}>{section.header}</Text>

              <View style={[spacing.marginTop4, common.container]}>
                {section.subMenu.map((field, _, array) => (
                  <View key={field.id}>
                    <TouchableOpacity
                      style={common.spacedRow}
                      // @ts-expect-error
                      onPress={() => navigation.navigate(field.screen)}>
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

                    {field.id !== array.length && <View style={styles.line} />}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, common.centeredRow, spacing.marginTop32]}
          onPress={logoutFunc}>
          <MaterialIcons name="logout" size={24} color={palette.PRIMARY} />

          <Text style={[styles.semiheader16, {color: palette.PRIMARY}]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
