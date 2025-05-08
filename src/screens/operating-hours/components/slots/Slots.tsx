import React, {FC, useState} from 'react';
import {TouchableOpacity, View, Text, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BottomSheet} from 'components/BottomSheet';
import {OperatingHour} from '../../OperatingHours';
import {days} from 'core/constants';
import {palette, common, layout, spacing} from 'core/styles';
import styles from './Slots.styles';

interface SlotsProps {
  day: number;
  operatingHours: OperatingHour[];
  setOperatingHours: React.Dispatch<React.SetStateAction<OperatingHour[]>>;
}

const Slots: FC<SlotsProps> = ({day, operatingHours, setOperatingHours}) => {
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);

  const startTime =
    operatingHours.find(slot => slot.day === day)?.startTime || new Date();
  const endTime =
    operatingHours.find(slot => slot.day === day)?.endTime || new Date();

  const onChangeStartTime = (_, selectedTime: any) =>
    setOperatingHours(prevOperatingHours =>
      prevOperatingHours.map(slot =>
        slot.day === day ? {...slot, startTime: selectedTime} : slot,
      ),
    );

  const onChangeEndTime = (_, selectedTime: any) =>
    setOperatingHours(prevOperatingHours =>
      prevOperatingHours.map(slot =>
        slot.day === day ? {...slot, endTime: selectedTime} : slot,
      ),
    );

  const showTimepickerStart = () => {
    DateTimePickerAndroid.open({
      value: startTime,
      onChange: onChangeStartTime,
      mode: 'time',
    });
  };

  const showTimepickerEnd = () => {
    DateTimePickerAndroid.open({
      value: endTime,
      onChange: onChangeEndTime,
      mode: 'time',
    });
  };

  return (
    <View>
      <View style={spacing.marginTop24}>
        <Text style={styles.semiheader17}>
          {days.find(_day => _day.id === day)?.name}
        </Text>

        <View style={[spacing.marginTop8, common.flexedRow, styles.gap16]}>
          <TouchableOpacity
            style={[
              common.container,
              common.flexedRow,
              styles.gap16,
              layout.flex1,
              {borderColor: palette.PRIMARY},
            ]}
            onPress={() =>
              Platform.OS === 'ios' ? setShowStart(true) : showTimepickerStart()
            }>
            <AntDesign name="clockcircleo" size={24} color={palette.DEFAULT} />

            <Text style={styles.text17}>
              {startTime.toLocaleString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              common.container,
              common.flexedRow,
              styles.gap16,
              layout.flex1,
              {borderColor: palette.PRIMARY},
            ]}
            onPress={() =>
              Platform.OS === 'ios' ? setShowEnd(true) : showTimepickerEnd()
            }>
            <AntDesign name="clockcircleo" size={24} color={palette.DEFAULT} />

            <Text style={styles.text17}>
              {endTime.toLocaleString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        open={showStart}
        onClose={() => setShowStart(false)}
        height={hp(40)}>
        <View style={styles.content}>
          <View style={spacing.marginBottom20}>
            <Text style={styles.text22}>Select Start Time</Text>
          </View>
          {showStart && (
            <DateTimePicker
              value={startTime}
              mode="time"
              onChange={onChangeStartTime}
              display="spinner"
              textColor={palette.DEFAULT}
              accentColor={palette.PRIMARY}
              themeVariant="dark"
            />
          )}
        </View>
      </BottomSheet>

      <BottomSheet
        open={showEnd}
        onClose={() => setShowEnd(false)}
        height={hp(40)}>
        <View style={styles.content}>
          <View style={spacing.marginBottom20}>
            <Text style={styles.text22}>Select End Time</Text>
          </View>
          {showEnd && (
            <DateTimePicker
              value={endTime}
              mode="time"
              onChange={onChangeEndTime}
              display="spinner"
              textColor={palette.DEFAULT}
              accentColor={palette.PRIMARY}
              themeVariant="dark"
            />
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default Slots;
