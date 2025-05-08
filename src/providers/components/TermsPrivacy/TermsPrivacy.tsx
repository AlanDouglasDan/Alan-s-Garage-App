import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useUser} from 'store/user/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {navigate} from 'navigation/utils';
import {spacing, palette} from 'core/styles';
import styles from './TermsPrivacy.styles';

const TermsPrivacy = (props: any) => {
  const password: string = props?.payload?.password ?? '';

  const {changePassword, loading, error, setError} = useUser();

  const [selected, setSelected] = useState<boolean>(false);

  const navigateToTermsPrivacy = async () => {
    const res = await changePassword({password});

    if (res && !res.error) {
      SheetManager.hide('terms-privacy');

      navigate('Success', {
        title: 'Account Successfully Created',
        nextScreen: 'Permissions',
      });
    }
  };

  console.log(password);

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header22}>
        Accept Aucarga's Terms & Review Privacy Notice
      </Text>

      <Text style={styles.text16}>
        By selection "I Agree" below, I have reviewed and agreed to the{' '}
        <Text style={styles.mediumText}>Terms of Use</Text> and acknowledged the{' '}
        <Text style={styles.mediumText}>Privacy Notice</Text>
      </Text>

      <View style={styles.line} />

      <View style={styles.marginalize}>
        <CheckBox
          title="I Agree"
          checked={selected}
          onPress={() => {
            setSelected(true);
          }}
          containerStyle={styles.optionContainer}
          textStyle={styles.optionLabel}
          uncheckedIcon={
            <Ionicons
              name="radio-button-off"
              size={24}
              color={palette.NEUTRAL30}
            />
          }
          checkedIcon={
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={palette.SUCCESS}
            />
          }
        />
      </View>

      <View>
        <Button
          title="Continue"
          onPress={navigateToTermsPrivacy}
          style={spacing.marginTop16}
          loading={loading}
          disabled={!selected ? true : loading}
        />
      </View>

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </ActionSheet>
  );
};

export default TermsPrivacy;
