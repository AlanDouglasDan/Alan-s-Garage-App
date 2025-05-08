import React, {FC, useState} from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  Text,
  KeyboardTypeOptions,
  Keyboard,
} from 'react-native';

import {noop} from 'core/utils';
import {palette} from 'core/styles';
import styles from './Input.styles';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  error?: string;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
  textBoxStyle?: any;
  rows?: number;
  disabled?: boolean;
  icon?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const Input: FC<InputProps> = ({
  placeholder,
  value,
  label,
  containerStyle = {},
  onChangeText,
  error,
  onBlur = noop,
  keyboardType,
  textBoxStyle = {},
  rows,
  disabled,
  icon,
  autoCapitalize = 'sentences',
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      {icon && <View style={styles.icon}>{icon}</View>}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={palette.SUPPORT}
        style={[
          styles.input,
          focused && styles.inputFocus,
          error && styles.inputError,
          textBoxStyle,
          disabled ? styles.disabled : null,
          icon && styles.iconPadding,
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => {
          if (!value) {
            setFocused(false);
          }
          onBlur();
        }}
        onFocus={() => {
          setFocused(true);
        }}
        keyboardType={keyboardType}
        returnKeyLabel="Done"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        multiline={rows ? true : false}
        numberOfLines={rows}
        editable={!disabled}
        autoCapitalize={autoCapitalize}
      />

      {!!error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default Input;
