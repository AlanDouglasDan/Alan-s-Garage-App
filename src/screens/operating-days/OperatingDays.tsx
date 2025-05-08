import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {days} from 'core/constants';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './OperatingDays.styles';

const morning = new Date();
morning.setHours(9, 0, 0, 0);

const evening = new Date();
evening.setHours(20, 0, 0, 0);

const OperatingDays: FC<
  NativeStackScreenProps<AppStackNavParams, 'Operating Days'>
> = ({navigation, route}) => {
  const {shouldFlow = true} = route.params ?? {};

  const {getSchedule, loading, loading2, error, setError, schedule} =
    useBusiness();

  const [selectedDays, setSelectedDays] = useState<number[]>([]);


  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  useEffect(() => {
    if (schedule && schedule.length !== 0) {
      const uniqueDaysOfWeek = schedule.reduce((acc, obj) => {
        if (!acc.includes(obj.dayOfWeek)) {
          acc.push(obj.dayOfWeek);
        }
        return acc;
      }, []);

      setSelectedDays(uniqueDaysOfWeek);
    }
  }, [schedule]);


  const selectDay = value => {
    if (selectedDays.includes(value)) {
      const newArr = selectedDays.filter(item => item !== value);

      setSelectedDays(newArr);
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleSubmit = async () => {
    navigation.navigate('Operating Hours', {shouldFlow, selectedDays});
  };

  const cellWidth = (Dimensions.get('window').width - 40 - 48) / 7;

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading2 ? (
        <ActivityIndicator
          size={'large'}
          color={palette.PRIMARY}
          style={layout.flex1}
        />
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.semiheader28}>
            {/* What days & time does your garage operate? */}
            Select open days
          </Text>

          <Text style={styles.text16}>
            This helps us match you with repair requests that align with your
            availability
          </Text>

          <View style={layout.flex1}>
            <View style={spacing.marginTop24}>
              <Text style={styles.semiheader17}>On</Text>

              <View style={[common.flexedRow, styles.gap, spacing.marginTop4]}>
                {days.map(day => (
                  <TouchableOpacity
                    key={day.id}
                    style={[
                      styles.circle,
                      {
                        backgroundColor: selectedDays.includes(day.id)
                          ? palette.PRIMARY
                          : palette.NEUTRAL20,
                        width: cellWidth,
                        height: cellWidth,
                        borderRadius: cellWidth / 2,
                      },
                    ]}
                    onPress={() => selectDay(day.id)}>
                    <Text
                      style={[
                        styles.text13,
                        {
                          color: selectedDays.includes(day.id)
                            ? palette.NEUTRAL20
                            : palette.SUPPORT,
                        },
                      ]}>
                      {day.abbreviate}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.text14}>1 of 2</Text>
          </View>

          <Button
            title="Proceed"
            style={spacing.marginTop44}
            onPress={handleSubmit}
            disabled={loading}
            loading={loading}
          />
        </View>
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

export default OperatingDays;
