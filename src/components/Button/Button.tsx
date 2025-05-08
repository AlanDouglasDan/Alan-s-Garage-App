import React, {FC} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Button as Btn} from '@rneui/base';

import styles from './Button.styles';
import {palette} from 'core/styles';

interface ButtonProps {
  title: string;
  opaque?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  opaque = true,
  style,
  disabled = false,
  loading = false,
  textStyle,
  containerStyle,
}) => (
  <Btn
    title={title}
    titleStyle={[
      styles.textButton,
      opaque && {color: palette.WHITE},
      disabled && {color: palette.SUPPORT},
      textStyle,
    ]}
    containerStyle={[
      styles.buttonContainer,
      style,
    ]}
    buttonStyle={[
      styles.button,
      opaque && {backgroundColor: palette.PRIMARY_DARKEST},
      disabled && {backgroundColor: palette.NEUTRAL30},
      containerStyle,
    ]}
    onPress={() => onPress && !disabled && onPress()}
    loading={loading}
  />
);

export default Button;
