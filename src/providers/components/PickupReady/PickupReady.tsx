import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {common} from 'core/styles';
import styles from './PickupReady.styles';

const PickupReady = (props: any) => {
  const id: string = props?.payload?.id ?? '';

  const {
    updateBidStatus,
    getBid,
    getBids,
    getRequests,
    loading,
    error,
    setError,
  } = useRequest();

  const completeRepair = async () => {
    const res = await updateBidStatus({id, status: 'Completed'});

    if (res && !res.error) {
      await getBid(id);
      getBids();
      getRequests();

      SheetManager.hide('pickup-ready');
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header22}>Pickup ready</Text>

      <Text style={styles.text16}>
        Are you sure you want to mark this repiar as pickup ready? It's
        recommended to do this only when the repiar job is done
      </Text>

      <View style={common.line} />

      <View>
        <Button
          title="Pickup ready"
          onPress={completeRepair}
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

export default PickupReady;
