import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  //   TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Keyboard,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useRequest} from 'store/request/hooks';
import {useBusiness} from 'store/business/hooks';
import {Empty} from 'components/Empty';
import {RequestCard} from 'components/RequestCard';
import {common, palette, spacing, layout} from 'core/styles';
import styles from './Appointments.styles';

const Appointments: FC<
  NativeStackScreenProps<BottomTabsNavParams, 'Appointments'>
> = ({navigation}) => {
  const {getBids, bids, loading} = useRequest();
  const {getServices} = useBusiness();

  useEffect(() => {
    getBids();
    getServices();
  }, [getBids, getServices]);

  const [focused, setFocused] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const [appointments, setAppointments] = useState<any>([]);

  useEffect(() => {
    if (bids) {
      setAppointments(bids);
    }
  }, [bids]);

  const empty = (
    <View style={spacing.marginTop90}>
      <Empty
        title="No appointments yet"
        body="All your confirmed appointments will appear here"
      />
    </View>
  );

  console.log(search);

  const handleSearch = (text: string) => {
    setSearch(text);

    setAppointments(
      bids?.filter(appointment => {
        const name = `${appointment.request.user.firstName}'s ${appointment.request.vehicle.make}`;

        return name.toLocaleLowerCase().includes(text.toLocaleLowerCase());
      }),
    );
  };

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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => getBids()} />
          }>
          <View style={[common.spacedRow, spacing.marginTop20]}>
            <Text style={styles.semiheader28}>Appointments</Text>

            <Ionicons name="filter" size={24} color={palette.TEXT_HEADING} />
          </View>

          {bids?.filter(bid => bid.status === 'Booked')?.length !== 0 && (
            <View
              style={[
                styles.searchContainer,
                focused ? styles.inputFocus : {},
                spacing.marginTop24,
                spacing.marginBottom8,
              ]}>
              <Ionicons name="search" size={22} color={palette.GRAY500} />

              <TextInput
                style={styles.input2}
                placeholder="Search appointments"
                placeholderTextColor={palette.SUPPORT}
                onChangeText={text => handleSearch(text)}
                value={search}
                onFocus={() => setFocused(true)}
                onBlur={() => !search && setFocused(false)}
                returnKeyLabel="Done"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
          )}

          {appointments.filter(bid => bid.status === 'Booked')?.length !== 0 ? (
            <>
              {appointments
                .filter(bid => bid.status === 'Booked')
                .map(bid => (
                  <RequestCard
                    key={bid._id}
                    request={bid.request}
                    navigation={navigation}
                    status={bid.status}
                    bidPrices={bid.prices}
                    id={bid._id}
                  />
                ))}
            </>
          ) : (
            empty
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Appointments;
