import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import Car from 'components/svg/Car';
import Calendar from 'components/svg/Calendar';
import Gear from 'components/svg/Gear';
import Location from 'components/svg/Location';
import {formatDate, formatCurrency} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './RequestCard.styles';

interface RequestCardProps {
  request: any;
  navigation: any;
  status: string;
  bidPrices?: any;
  id?: string;
}

const RequestCard: FC<RequestCardProps> = ({
  request,
  navigation,
  status,
  bidPrices,
  id,
}) => {
  let bg, color, name;
  if (status === 'Pending') {
    bg = palette.NEUTRAL10;
    color = palette.DEFAULT;
    name = `${request.user.firstName} ${request.user.lastName}`;
  } else if (status === 'Submitted') {
    bg = palette.LIGHT_BLUE;
    color = palette.BLUE;
    name = `${request.user.firstName}'s ${request.vehicle.make}`;
  } else if (status === 'Rejected') {
    bg = '#fae5e3';
    color = palette.DANGER;
    name = `${request.user.firstName}'s ${request.vehicle.make}`;
  } else if (status === 'Accepted') {
    bg = palette.SUCCESS_LIGHTEST;
    color = palette.SUCCESS;
    name = `${request.user.firstName}'s ${request.vehicle.make}`;
  } else if (status === 'Booked') {
    bg = '#FFFAEB';
    color = '#B54708';
    name = `${request.user.firstName}'s ${request.vehicle.make}`;
  } else if (status === 'Completed') {
    bg = palette.LIGHT_GREEN;
    color = '#027A48';
    name = `${request.user.firstName} ${request.user.lastName}`;
  } else if (status === 'Started') {
    bg = palette.LIGHT_BLUE;
    color = palette.BLUE;
    name = `${request.user.firstName}'s ${request.vehicle.make}`;
  }

  let screen, object;
  if (status === 'Pending') {
    screen = 'Request Details';
    object = {request};
  } else if (
    status === 'Booked' ||
    status === 'Submitted' ||
    status === 'Rejected'
  ) {
    screen = 'Repair Details';
    object = {id};
  } else if (status === 'Completed') {
    screen = 'Additional Repairs';
    object = {request};
  } else if (status === 'Started') {
    screen = 'Repair Details';
    object = {id};
  }

  return (
    <TouchableOpacity
      style={[common.container, spacing.marginTop16]}
      key={request._id}
      onPress={() => (screen ? navigation.navigate(screen, {...object}) : {})}>
      <View
        style={[common.spacedRow, common.alignStart, spacing.marginBottom4]}>
        {request.user.profileImage ? (
          <Image
            source={{uri: request.user.profileImage}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.image}>
            <Text style={styles.semiheader22}>
              {request.user.firstName.charAt(0).toUpperCase()}
              {request.user.lastName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: bg,
            },
          ]}>
          <Text style={[styles.text12, {color}]}>{status}</Text>
        </View>
      </View>

      <View style={[common.spacedRow, styles.gap]}>
        <Text style={[styles.semiheader16, layout.flex1]}>{name}</Text>

        {bidPrices && (
          <Text style={styles.semiheader16}>
            {bidPrices[0].currency}{' '}
            {formatCurrency(
              bidPrices.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.amount,
                0,
              ),
              2,
            )}
          </Text>
        )}
      </View>

      <View style={styles.line} />

      <View style={styles.gap}>
        <View style={[common.flexedRow, styles.gap4]}>
          <Car />

          <Text style={styles.text14}>
            {request.vehicle.make} {request.vehicle.model}
          </Text>
        </View>

        <View style={[common.flexedRow, styles.gap4]}>
          <Calendar />

          <Text style={styles.text14}>{formatDate(request.createdAt)}</Text>
        </View>

        <View style={[common.flexedRow, styles.gap4]}>
          <Gear />

          <Text style={styles.text14} numberOfLines={1}>
            {request.description}
          </Text>
        </View>

        <View style={[common.flexedRow, styles.gap4]}>
          <Location />

          <Text style={styles.text14}>{request.user.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
