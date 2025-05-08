import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Input} from 'components/Input';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Request.styles';

interface RequestProps {
  service: any;
  array: any;
  country: any;
  index: number;
  amount: number;
  updateAmount: (index: number, newAmount: number) => void;
  title: string;
  body: string;
}

const Request: FC<RequestProps> = ({
  service,
  array,
  country,
  index,
  amount,
  updateAmount,
  title,
  body,
}) => {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);

  const selectRequest = value => {
    if (selectedRequests.includes(value)) {
      const newArr = selectedRequests.filter(item => item !== value);

      setSelectedRequests(newArr);
    } else {
      setSelectedRequests([...selectedRequests, value]);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        selectRequest(service._id);
      }}>
      <View style={common.spacedRow}>
        <View style={layout.flex1}>
          <Text style={styles.semiheader16}>{title}</Text>

          <Text style={[styles.text13, {color: palette.GRAY500}]}>{body}</Text>
        </View>

        <CheckBox
          key={service._id}
          checked={selectedRequests.includes(service._id)}
          onPress={() => {
            selectRequest(service._id);
          }}
          containerStyle={styles.optionContainer}
          textStyle={styles.optionLabel}
          uncheckedIcon={
            <Ionicons
              name="square-outline"
              size={24}
              color={palette.NEUTRAL30}
            />
          }
          checkedIcon={
            <Ionicons
              name="checkbox-sharp"
              size={24}
              color={palette.TEXT_HEADING}
            />
          }
        />
      </View>

      {selectedRequests.includes(service._id) && (
        <View style={[common.flexedRow, styles.gap8, spacing.marginTop12]}>
          <TouchableOpacity style={styles.input} activeOpacity={1}>
            <Text style={styles.semiheader16}>{country?.flag}</Text>

            <Text style={styles.text17}>{country?.currency}</Text>
          </TouchableOpacity>

          <Input
            label=""
            placeholder="0.00"
            value={String(amount)}
            onChangeText={val => updateAmount(index, Number(val))}
            containerStyle={layout.flex1}
            textBoxStyle={{textAlign: 'right'}}
            keyboardType="numeric"
          />
        </View>
      )}

      {service !== array[array.length - 1]._id && <View style={styles.line} />}
    </TouchableOpacity>
  );
};

export default Request;
