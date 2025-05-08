import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useBusiness} from 'store/business/hooks';
import {Empty} from 'components/Empty';
import Mail from 'components/svg/Mail';
// import Checkbox from 'components/svg/Checkbox';
import Location from 'components/svg/Location';
import Box from 'components/svg/Box';
import {common, palette, spacing, layout} from 'core/styles';
import styles from './Garages.styles';

const Garages: FC<NativeStackScreenProps<BottomTabsNavParams, 'Garages'>> = ({
  navigation,
}) => {
  const {getGarages, garages, loading2} = useBusiness();

  useEffect(() => {
    getGarages();
  }, [getGarages]);

  const [focused, setFocused] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const [filteredGarages, setFilteredGarages] = useState<any>([]);

  useEffect(() => {
    if (garages) {
      setFilteredGarages(garages);
    }
  }, [garages]);

  const empty = (
    <View style={spacing.marginTop90}>
      <Empty
        title="No Garages yet"
        body="Click the button below to add your first garage"
        buttonText="Create Garage"
        /* @ts-expect-error Action will bubble up to the AppStackNav where "Add Garage" screen is defined */
        onPress={() => navigation.navigate('Add Garage')}
      />
    </View>
  );

  const handleSearch = (text: string) => {
    setSearch(text);

    setFilteredGarages(
      garages?.filter(garage =>
        garage.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading2 ? (
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
            <RefreshControl
              refreshing={loading2}
              onRefresh={() => getGarages()}
            />
          }>
          <View style={[common.spacedRow, spacing.marginTop20]}>
            <Text style={styles.semiheader28}>Garages</Text>

            <TouchableOpacity
              style={[common.flexedRow, styles.gap]}
              /* @ts-expect-error Action will bubble up to the AppStackNav where "Add Garage" screen is defined */
              onPress={() => navigation.navigate('Add Garage')}>
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={palette.PRIMARY}
              />

              <Text style={styles.semiheader16}>Add garage</Text>
            </TouchableOpacity>
          </View>

          {garages?.length !== 0 && (
            <View
              style={[
                styles.searchContainer,
                focused ? styles.inputFocus : {},
                spacing.marginTop24,
              ]}>
              <Ionicons name="search" size={22} color={palette.GRAY500} />

              <TextInput
                style={styles.input2}
                placeholder="Search garages"
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

          {filteredGarages.length !== 0 ? (
            <View>
              {filteredGarages.map(garage => (
                <TouchableOpacity
                  style={[common.container, spacing.marginTop16]}
                  key={garage._id}
                  onPress={() =>
                    /* @ts-expect-error Action will bubble up to the AppStackNav where "Add Garage" screen is defined */
                    navigation.navigate('Add Garage', {
                      garage,
                    })
                  }>
                  <View
                    style={[
                      common.spacedRow,
                      common.alignStart,
                      spacing.marginBottom4,
                    ]}>
                    <View style={styles.image}>
                      <Box color={palette.SUPPORT} />
                    </View>
                  </View>

                  <Text style={[styles.semiheader16, layout.flex1]}>
                    {garage.name}
                  </Text>

                  <View style={styles.line} />

                  <View style={styles.gap10}>
                    <View style={[common.flexedRow, styles.gap]}>
                      <Mail size="16" />

                      <Text style={styles.text14}>{garage.email}</Text>
                    </View>

                    {/* <View style={[common.flexedRow, styles.gap]}>
                      <Checkbox />

                      <Text style={styles.text14} numberOfLines={1}>
                        {garage.registrationNumber}
                      </Text>
                    </View> */}

                    <View style={[common.flexedRow, styles.gap]}>
                      <Location />

                      <Text style={styles.text14}>{garage.addressLine1}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            empty
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Garages;
