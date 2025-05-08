/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabsNav} from 'navigation/bottom-tabs-nav';
import {
  AddName,
  OwnGarage,
  AddBusiness,
  CreatePassword,
  ChangePassword,
  Success,
  Permissions,
  Welcome,
  AccountSetup,
  PersonalDetails,
  VerifyPhone,
  PhoneVerification,
  Notifications,
  OperatingDays,
  OperatingHours,
  Services,
  BusinessInfo,
  Address,
  Documents,
  BusinessDetails,
  RequestDetails,
  Summary,
  ChangeName,
  Terms,
  Privacy,
  ContactUs,
  HelpCenter,
  BusinessVerification,
  StripeOnboarding,
  RepairDetails,
  AddGarage,
  GarageAddress,
  GarageServices,
  AdditionalRepairs,
  AdditionalPricing,
  CancelRequest,
  DeleteAccount,
} from 'screens';
import {useAuth} from 'store/auth/hooks';
import {ArrowBack} from 'components/ArrowBack';
import {SelectedService} from 'screens/additional-repairs/AdditionalRepairs';
import {layout, palette, common} from 'core/styles';
import styles from './AppStackNav.styles';

export type AppStackNavParams = {
  'Bottom Tabs': undefined;

  // app stack
  'Add Name': undefined;
  'Own Garage': undefined;
  'Add Business': {ownsGarage: boolean};
  'Create Password': undefined;
  'Change Password': undefined;
  Success: {title: string; body?: string; nextScreen: any};
  Permissions: {step?: number};
  Welcome: undefined;
  'Account Setup': undefined;
  'Personal Details': undefined;
  'Verify Phone': undefined;
  'Phone Verification': {phone: string};
  Notifications: undefined;
  'Operating Days': {shouldFlow?: boolean};
  'Operating Hours': {shouldFlow?: boolean; selectedDays: number[]};
  Services: {shouldFlow?: boolean};
  'Business Info': {shouldFlow?: boolean};
  Address: {shouldFlow?: boolean};
  Documents: undefined;
  'Business Details': undefined;
  'Request Details': {request: any};
  Summary: {request: any; bidData: any; additionalRepair: boolean};
  'Change Name': {type: 'first' | 'last'};
  Terms: undefined;
  Privacy: undefined;
  'Contact Us': undefined;
  'Help Center': undefined;
  'Business Verification': undefined;
  'Stripe Onboarding': {url: string};
  'Repair Details': {request: any; bidPrices: any; date: string; id: string};
  'Add Garage': {garage?: any};
  'Garage Address': {garage: any};
  'Garage Services': {garage: any};
  'Additional Repairs': {request: any};
  'Additional Pricing': {request: any; selectedServices: SelectedService[]};
  'Cancel Request': {id: string};
  'Delete Account': undefined;
};

const Stack = createNativeStackNavigator<AppStackNavParams>();

const AppStackNav: FC = () => {
  const {initialAppRoute} = useAuth();

  const header = (
    <View
      style={[
        layout.flex1,
        common.centeredColumn,
        {backgroundColor: palette.WHITE},
      ]}
    />
  );

  return (
    <Stack.Navigator initialRouteName={initialAppRoute}>
      <Stack.Screen
        name="Bottom Tabs"
        component={BottomTabsNav}
        options={{headerShown: false, gestureEnabled: false}}
      />

      <Stack.Screen
        name="Add Name"
        component={AddName}
        options={({}) => ({
          headerBackground: () => header,
          headerTitle: '',
          // headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 3/6</Text>,
        })}
      />

      <Stack.Screen
        name="Own Garage"
        component={OwnGarage}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 4/6</Text>,
        })}
      />

      <Stack.Screen
        name="Add Business"
        component={AddBusiness}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 5/6</Text>,
        })}
      />

      <Stack.Screen
        name="Create Password"
        component={CreatePassword}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 6/6</Text>,
        })}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Permissions"
        component={Permissions}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Account Setup"
        component={AccountSetup}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Personal Details"
        component={PersonalDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Verify Phone"
        component={VerifyPhone}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Phone Verification"
        component={PhoneVerification}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Operating Days"
        component={OperatingDays}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Operating Hours"
        component={OperatingHours}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Services"
        component={Services}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Business Info"
        component={BusinessInfo}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Address"
        component={Address}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Documents"
        component={Documents}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Business Details"
        component={BusinessDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Request Details"
        component={RequestDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Summary"
        component={Summary}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Change Name"
        component={ChangeName}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Terms"
        component={Terms}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Help Center"
        component={HelpCenter}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Business Verification"
        component={BusinessVerification}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Stripe Onboarding"
        component={StripeOnboarding}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Repair Details"
        component={RepairDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Add Garage"
        component={AddGarage}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Garage Address"
        component={GarageAddress}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Garage Services"
        component={GarageServices}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Additional Repairs"
        component={AdditionalRepairs}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Additional Pricing"
        component={AdditionalPricing}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Cancel Request"
        component={CancelRequest}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Delete Account"
        component={DeleteAccount}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStackNav;
