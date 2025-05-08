import React, {FC} from 'react';
import {View, Image, Text} from 'react-native';

import {Button} from '../Button';
import {images} from 'core/images';
import {palette, common, spacing} from 'core/styles';
import styles from './Empty.styles';

interface EmptyProps {
  title: string;
  body: string;
  buttonText?: string;
  onPress?: () => void;
}

const Empty: FC<EmptyProps> = ({title, buttonText, body, onPress}) => {
  return (
    <View style={[common.centeredColumn, spacing.marginTop90, styles.gap]}>
      <Image source={images.empty} resizeMode="contain" style={styles.empty} />

      <View style={[styles.gap4, common.centeredColumn]}>
        <Text style={[styles.semiheader16, {color: palette.DEFAULT}]}>
          {title}
        </Text>

        <Text style={styles.text13}>{body}</Text>
      </View>

      {buttonText && (
        <View>
          <Button title={buttonText} onPress={onPress} />
        </View>
      )}
    </View>
  );
};

export default Empty;
