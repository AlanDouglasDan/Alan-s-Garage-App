import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {common} from 'core/styles';
import styles from './CancelRequest.styles';

const CancelRequest = (props: any) => {
  const id: string = props?.payload?.id ?? '';
  const reason: string = props?.payload?.reason ?? '';
  const message: string = props?.payload?.message ?? '';

  const {updateBidStatus, getBid, loading, error, setError} = useRequest();

  const cancelRequest = async () => {
    const cancellationReason = reason === 'Others' ? message : reason;

    const res = await updateBidStatus({
      id,
      status: 'Canceled',
      cancellationReason,
    });

    if (res && !res.error) {
      await getBid(id);

      SheetManager.hide('cancel-request');
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header22}>Cancel repair request</Text>

      <Text style={styles.text16}>
        Are you sure you want to cancel this repair request? This action cannot
        be undone
      </Text>

      <View style={common.line} />

      <View>
        <Button
          title="Cancel repair request"
          onPress={cancelRequest}
          loading={loading}
          disabled={loading}
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

export default CancelRequest;
