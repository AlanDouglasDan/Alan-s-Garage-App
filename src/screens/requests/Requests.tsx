import React, {FC, useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useRequest} from 'store/request/hooks';
import {Empty} from 'components/Empty';
import {RequestCard} from 'components/RequestCard';
import {common, palette, spacing, layout} from 'core/styles';
import styles from './Requests.styles';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 100};

const Requests: FC<NativeStackScreenProps<BottomTabsNavParams, 'Requests'>> = ({
  navigation,
}) => {
  const {getRequests, getBids, bids, requests, loading} = useRequest();

  const fetchAll = () => {
    getRequests();
    getBids();
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeTab, setActiveTab] = useState<number>(1);

  const flatListref = useRef<any>();

  const onViewRef = useRef(({changed}: {changed: any}) => {
    if (changed[0].isViewable) {
      setActiveTab(changed[0].index + 1);
    }
  });

  const scrollToIndex = (index: number) => {
    setActiveTab(index);

    flatListref.current?.scrollToIndex({
      animated: true,
      index: index - 1,
      viewOffset: 0,
    });
  };

  const empty = (
    <Empty title="No requests" body="There are no requests to show" />
  );

  const tabs = [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Pending',
    },
    {
      id: 3,
      name: 'Submitted',
    },
    {
      id: 4,
      name: 'Booked',
    },
    {
      id: 5,
      name: 'Completed',
    },
  ];

  const getComponent = (index: number) => {
    switch (index) {
      case 1:
        return requests?.length !== 0
          ? requests
              ?.filter(
                request =>
                  request.status !== 'Booked' &&
                  request.status !== 'Started' &&
                  request.status !== 'Accepted',
              )
              ?.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  navigation={navigation}
                  status={request.status}
                />
              ))
          : empty;
      case 2:
        return requests?.filter(
          request =>
            request.status === 'Pending' &&
            !bids?.some(bid => bid.request._id === request._id)
        )
          ?.length !== 0
          ? requests
              ?.filter(
                request =>
                  request.status === 'Pending' &&
                  !bids?.some(bid => bid.request._id === request._id)
              )
              ?.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  navigation={navigation}
                  status={request.status}
                />
              ))
          : empty;
      case 3:
        return bids?.filter(
          bid =>
            bid.status === 'Submitted' ||
            bid.status === 'Rejected' ||
            bid.status === 'Accepted',
        )?.length !== 0
          ? bids
              ?.filter(
                bid =>
                  bid.status === 'Submitted' ||
                  bid.status === 'Rejected' ||
                  bid.status === 'Accepted',
              )
              ?.map(bid => (
                <RequestCard
                  key={bid._id}
                  request={bid.request}
                  navigation={navigation}
                  status={bid.status}
                  bidPrices={bid.prices}
                  id={bid._id}
                />
              ))
          : empty;
      case 4:
        return bids?.filter(
          bid => bid.status === 'Booked' || bid.status === 'Started',
        )?.length !== 0 ? (
          <>
            {bids
              ?.filter(
                bid => bid.status === 'Booked' || bid.status === 'Started',
              )
              ?.map(bid => (
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
        );
      case 5:
        return bids?.filter(bid => bid.status === 'Completed')?.length !== 0 ? (
          <>
            {bids
              ?.filter(bid => bid.status === 'Completed')
              ?.map(bid => (
                <RequestCard
                  key={bid._id}
                  request={bid.request}
                  navigation={navigation}
                  status={bid.status}
                  bidPrices={bid.prices}
                />
              ))}
          </>
        ) : (
          empty
        );
    }
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
            <RefreshControl refreshing={loading} onRefresh={() => fetchAll()} />
          }>
          <View style={common.spacedRow}>
            <Text style={styles.semiheader28}>Requests</Text>

            <Ionicons name="filter" size={24} color={palette.TEXT_HEADING} />
          </View>

          <View style={[spacing.marginTop24, styles.flexedRow]}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id ? styles.active : {}]}
                onPress={() => scrollToIndex(tab.id)}>
                <Text style={styles.text13}>{tab.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* {tabs[activeTab - 1].component} */}
          <FlatList
            data={tabs}
            renderItem={({item}) => {
              return (
                <View style={{width: wp(100) - 40}}>
                  {getComponent(item.id)}
                </View>
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={ref => (flatListref.current = ref)}
            windowSize={tabs.length}
            bounces={false}
            bouncesZoom={false}
            alwaysBounceHorizontal={false}
            removeClippedSubviews
            initialNumToRender={2}
            viewabilityConfig={viewConfigRef}
            onViewableItemsChanged={onViewRef.current}
            onScrollToIndexFailed={info => {
              flatListref.current?.scrollToOffset({
                offset: info.averageItemLength * info.index,
                animated: true,
              });
            }}
            // style={{flexGrow: 0}}
            // style={{height: 'auto', borderWidth: 1}}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Requests;
