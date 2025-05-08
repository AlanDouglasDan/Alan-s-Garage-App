import React, {FC, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {Slots} from './components/slots';
import {convertTimeToToday} from 'core/utils';
import {layout, palette, spacing} from 'core/styles';
import styles from './OperatingHours.styles';

const morning = new Date();
morning.setHours(9, 0, 0, 0);

const evening = new Date();
evening.setHours(20, 0, 0, 0);

export interface OperatingHour {
  day: number;
  startTime: Date;
  endTime: Date;
}

const OperatingHours: FC<
  NativeStackScreenProps<AppStackNavParams, 'Operating Hours'>
> = ({navigation, route}) => {
  const {shouldFlow = true, selectedDays} = route.params ?? {};

  const {
    loading,
    loading2,
    error,
    setError,
    saveSchedule,
    schedule,
    getBusiness,
  } = useBusiness();

  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>(
    selectedDays.map(day => ({
      day,
      startTime: schedule.find(_day => _day.dayOfWeek === day)?.startTime
        ? convertTimeToToday(
            schedule.find(_day => _day.dayOfWeek === day).startTime,
          )
        : morning,
      endTime: schedule.find(_day => _day.dayOfWeek === day)?.endTime
        ? convertTimeToToday(
            schedule.find(_day => _day.dayOfWeek === day).endTime,
          )
        : evening,
    })),
  );

  const handleSubmit = async () => {
    const body = {
      slots: operatingHours.map(slot => ({
        day: slot.day,
        startTime: slot.startTime.toLocaleString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        }),
        endTime: slot.endTime.toLocaleString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        }),
      })),
    };

    const res = await saveSchedule(body);

    if (res && !res.error) {
      if (shouldFlow) {
        navigation.navigate('Services', {shouldFlow});
      } else {
        await getBusiness();
        navigation.pop(2);
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading2 ? (
        <ActivityIndicator
          size={'large'}
          color={palette.PRIMARY}
          style={layout.flex1}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.innerContainer}>
          <Text style={styles.semiheader28}>Enter open times</Text>

          <Text style={styles.text16}>
            This helps us match you with repair requests that align with your
            availability
          </Text>

          <View style={layout.flex1}>
            {selectedDays
              .sort((a, b) => a - b)
              .map(day => (
                <Slots
                  day={day}
                  key={day}
                  operatingHours={operatingHours}
                  setOperatingHours={setOperatingHours}
                />
              ))}

            <Text style={styles.text14}>2 of 2</Text>
          </View>

          <Button
            title="Save"
            style={spacing.marginTop44}
            onPress={handleSubmit}
            disabled={loading}
            loading={loading}
          />
        </ScrollView>
      )}

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

export default OperatingHours;
