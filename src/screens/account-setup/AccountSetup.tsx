import React, {FC, useEffect} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
// import {useUser} from 'store/user/hooks';
import {useBusiness} from 'store/business/hooks';
import Document from 'components/svg/Document';
// import User2 from 'components/svg/User2';
import Briefcase from 'components/svg/Briefcase';
import {common, palette, spacing} from 'core/styles';
import styles from './AccountSetup.styles';

// const personalRequiredFields = [
//   'firstName',
//   'lastName',
//   'email',
//   'phone',
//   'location',
//   'isPhoneVerified',
// ];

const businessRequiredFields = [
  'businessName',
  'country',
  'ownsGarage',
  'hasSchedule',
  'businessRegistrationNo',
  'employeeCount',
  'description',
  'addressLine1',
  'addressLine2',
  'city',
  'postCode',
  'services',
  'brandSpecialization',
  'accountType',
];

const AccountSetup: FC<
  NativeStackScreenProps<AppStackNavParams, 'Account Setup'>
> = ({navigation}) => {
  // const {current} = useUser();
  const {business, getBusiness} = useBusiness();

  useEffect(() => {
    getBusiness();
  }, [getBusiness]);

  // let personalPercCount = 0;
  let businessPercCount = 0;

  // if (current) {
  //   personalRequiredFields.forEach(field => {
  //     if (current[field]) {
  //       personalPercCount += 100 / personalRequiredFields.length;
  //     }
  //   });
  // }

  if (business) {
    businessRequiredFields.forEach((field, index) => {
      if (
        index === businessRequiredFields.length - 1
          ? business[field].length > 0
          : business[field]
      ) {
        businessPercCount += 100 / businessRequiredFields.length;
      }
    });
  }

  const branches = [
    // {
    //   id: 1,
    //   title: 'Personal Details',
    //   icon: <User2 />,
    //   screen: 'Personal Details',
    //   status:
    //     Number(personalPercCount.toFixed(0)) === 100 ? 'Complete' : 'Pending',
    // },
    {
      id: 1,
      title: 'Company Details',
      icon: <Document size="20" color={palette.SUPPORT} />,
      screen: 'Operating Days',
      status:
        Number(businessPercCount.toFixed(0)) === 100 ? 'Complete' : 'Pending',
    },
    {
      id: 2,
      title: 'Business Verification',
      icon: <Briefcase />,
      screen: 'Business Verification',
      status: business?.stripeDetailsSubmitted
        ? 'Complete'
        : business?.stripeAccountId
        ? 'In review'
        : 'Pending',
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.semiheader28}>Finish account setup</Text>

        <Text style={styles.text16}>
          Complete these tasks to get the most out of your Aucarga account
        </Text>

        <View style={spacing.marginTop24}>
          {branches.map(branch => (
            <TouchableOpacity
              style={[
                common.container,
                spacing.marginBottom20,
                common.spacedRow,
              ]}
              key={branch.id}
              // @ts-expect-error
              onPress={() => navigation.navigate(branch.screen)}>
              <View style={[common.flexedRow, styles.gap]}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor:
                        branch.status === 'Complete'
                          ? palette.SUCCESS_LIGHTEST
                          : palette.NEUTRAL20,
                    },
                  ]}>
                  {branch.status === 'Complete' ? (
                    <Feather name="check" color={palette.SUCCESS} size={20} />
                  ) : (
                    branch.icon
                  )}
                </View>

                <Text style={styles.semiheader16}>{branch.title}</Text>
              </View>

              <View style={[common.flexedRow, styles.gap]}>
                <View
                  style={[
                    styles.statusContainer,
                    {
                      backgroundColor:
                        branch.status === 'Complete'
                          ? palette.SUCCESS_LIGHTEST
                          : branch.status === 'Pending'
                          ? palette.NEUTRAL10
                          : palette.LIGHT_YELLOW,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text12,
                      {
                        color:
                          branch.status === 'Complete'
                            ? palette.SUCCESS
                            : branch.status === 'Pending'
                            ? palette.DEFAULT
                            : palette.BROWN,
                      },
                    ]}>
                    {branch.status}
                  </Text>
                </View>

                <Entypo
                  name="chevron-small-right"
                  size={24}
                  color={palette.DEFAULT}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountSetup;
