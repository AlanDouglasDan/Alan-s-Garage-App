import React, {FC, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {Button} from 'components/Button';
import {Input} from 'components/Input';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './CancelRequest.styles';

const cancellationReasons = [
  'Emergency/Unforeseen circumstances',
  'Overbooking or Scheduling conflict',
  'Lack of required parts or tools',
  'Unrealistic customer expectations',
  'Weather or location issues',
  'Others',
];

const CancelRequest: FC<
  NativeStackScreenProps<AppStackNavParams, 'Cancel Request'>
> = ({route}) => {
  const {id} = route.params ?? {};

  const [selected, setSelected] = useState<string | undefined>();
  const [message, setMessage] = useState<string>('');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.innerContainer}>
        <View style={layout.flex1}>
          <Text style={styles.semiheader28}>Cancel repair request</Text>

          <Text style={styles.text16}>
            Tell us why you're cancelling this repair request. We'd appreciate
            your feedback
          </Text>

          <View style={[spacing.marginTop24, common.container]}>
            {cancellationReasons.map((field, index, array) => (
              <View key={index}>
                <TouchableOpacity
                  style={common.flexedRow}
                  onPress={() => setSelected(field)}>
                  <View style={[common.spacedRow, styles.gap]}>
                    <CheckBox
                      title={field}
                      checked={field === selected}
                      onPress={() => setSelected(field)}
                      containerStyle={styles.optionContainer}
                      textStyle={[styles.text16, styles.optionLabel]}
                      uncheckedIcon={
                        <Ionicons
                          name="square-outline"
                          size={24}
                          color={palette.PRIMARY}
                        />
                      }
                      checkedIcon={
                        <Ionicons
                          name="checkbox-sharp"
                          size={24}
                          color={palette.PRIMARY}
                        />
                      }
                    />
                  </View>
                </TouchableOpacity>

                {index + 1 !== array.length && <View style={common.line} />}
              </View>
            ))}

            {selected === 'Others' && (
              <Input
                label=""
                placeholder="State your reason for cancelling the request"
                value={message}
                onChangeText={text => setMessage(text)}
                containerStyle={spacing.marginTop4}
                textBoxStyle={{height: 120, textAlignVertical: 'top'}}
                rows={5}
              />
            )}
          </View>
        </View>

        <Button
          title="Continue"
          style={spacing.marginTop12}
          disabled={!selected}
          onPress={() =>
            SheetManager.show('cancel-request', {
              // @ts-expect-error
              payload: {id, reason: selected, message},
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelRequest;
