import React, {FC, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {timeDifference} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Notifications.styles';

const Notifications: FC<
  NativeStackScreenProps<AppStackNavParams, 'Notifications'>
> = ({navigation}) => {
  const {getNotifications, notifications, loading} = useUser();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const [active, setActive] = useState<number>(1);

  const tabs = [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Read',
    },
    {
      id: 3,
      name: 'Unread',
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getNotifications()}
            />
          }>
          <Text style={styles.semiheader28}>Notifications</Text>

          <View style={[spacing.marginTop24, styles.flexedRow]}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, active === tab.id ? styles.active : {}]}
                onPress={() => setActive(tab.id)}>
                <Text style={styles.text13}>{tab.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[spacing.marginTop24, common.container]}>
            {notifications?.map(notification => {
              let icon;

              if (notification.type === 'request') {
                icon = (
                  <Ionicons
                    name="car-outline"
                    size={24}
                    color={palette.DEFAULT}
                  />
                );
              } else if (notification.type === 'bid') {
                icon = (
                  <SimpleLineIcons
                    name="wrench"
                    size={20}
                    color={palette.DEFAULT}
                  />
                );
              } else if (notification.type === 'booked_appointment') {
                icon = (
                  <AntDesign
                    name="clockcircleo"
                    size={20}
                    color={palette.SUCCESS}
                  />
                );
              } else if (notification.type === 'bid_accepted') {
                icon = (
                  <AntDesign name="like2" size={20} color={palette.INFO} />
                );
              } else if (notification.type === 'bid_rejected') {
                icon = (
                  <AntDesign name="dislike2" size={20} color={palette.DANGER} />
                );
              } else if (notification.type === 'additional_repair') {
                icon = <Octicons name="gear" size={20} color={palette.INFO} />;
              } else {
                icon = (
                  <MaterialIcons
                    name="info-outline"
                    size={24}
                    color={palette.INFO}
                  />
                );
              }

              return (
                <TouchableOpacity
                  key={notification._id}
                  onPress={() =>
                    // @ts-expect-error
                    navigation.navigate('Bottom Tabs', {screen: 'Requests'})
                  }>
                  <View
                    style={[common.flexedRow, styles.gap, common.alignStart]}>
                    {icon}

                    <View style={layout.flex1}>
                      <View style={common.spacedRow}>
                        <Text style={styles.text16} numberOfLines={1}>
                          {notification.title}
                        </Text>

                        <View style={[common.flexedRow, styles.gap]}>
                          <Text style={styles.semiheader12}>
                            {timeDifference(notification.createdAt)}
                          </Text>

                          {!notification.isRead && <View style={styles.dot} />}
                        </View>
                      </View>

                      <Text style={[styles.text13, {color: palette.DEFAULT}]}>
                        {notification.body}
                      </Text>
                    </View>
                  </View>

                  {notification._id !==
                    notifications[notifications.length - 1]._id && (
                    <View style={styles.line} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Notifications;
