/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';

import {Home, Requests, Appointments, Garages, Profile} from 'screens';
import House from 'components/svg/House';
import User from 'components/svg/User';
import Document from 'components/svg/Document';
import Calendar2 from 'components/svg/Calendar2';
import Box from 'components/svg/Box';
import styles from './BottomTabsNav.styles';
import {palette} from '@src/core/styles';

// const Header = () => {
//   return <View style={styles.header} />;
// };

export type BottomTabsNavParams = {
  Home: undefined;
  Requests: undefined;
  Appointments: undefined;
  Garages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsNavParams>();

const renderTabBarIcon = (name: string, focused: boolean): JSX.Element => {
  let icon;

  switch (name) {
    case 'Home':
      icon = <House color={focused ? palette.TEXT_HEADING : palette.SUPPORT} />;
      break;
    case 'Requests':
      icon = (
        <Document color={focused ? palette.TEXT_HEADING : palette.SUPPORT} />
      );
      break;
    case 'Appointments':
      icon = (
        <Calendar2 color={focused ? palette.TEXT_HEADING : palette.SUPPORT} />
      );
      break;
    case 'Garages':
      icon = (
        <Box color={focused ? palette.TEXT_HEADING : palette.SUPPORT} />
      );
      break;
    default:
      icon = <User color={focused ? palette.TEXT_HEADING : palette.SUPPORT} />;
      break;
  }

  return <View style={styles.icon}>{icon}</View>;
};

const renderTabBarLabel = (name: string, focused: boolean): JSX.Element => {
  const style = focused ? 'text12Focus' : 'text12';
  return <Text style={styles[style]}>{name}</Text>;
};

const BottomTabsNav: FC = () => {
  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <Tab.Navigator screenOptions={{tabBarStyle: styles.tabBar}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => renderTabBarIcon('Home', focused),
            tabBarLabel: ({focused}) => renderTabBarLabel('Home', focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Requests"
          component={Requests}
          options={{
            tabBarIcon: ({focused}) => renderTabBarIcon('Requests', focused),
            tabBarLabel: ({focused}) => renderTabBarLabel('Requests', focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Appointments"
          component={Appointments}
          options={{
            tabBarIcon: ({focused}) =>
              renderTabBarIcon('Appointments', focused),
            tabBarLabel: ({focused}) => renderTabBarLabel('Appts', focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Garages"
          component={Garages}
          options={{
            tabBarIcon: ({focused}) => renderTabBarIcon('Garages', focused),
            tabBarLabel: ({focused}) => renderTabBarLabel('Garages', focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => renderTabBarIcon('Profile', focused),
            tabBarLabel: ({focused}) => renderTabBarLabel('Profile', focused),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabsNav;
