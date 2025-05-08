import React, {FC, useState} from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {palette} from 'core/styles';
import {noop} from 'core/utils';
import styles from './PasswordInput.styles';

interface PasswordInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  placeholder?: string;
  error?: string;
  onBlur?: () => void;
  displayEye?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
  value,
  label,
  containerStyle = {},
  onChangeText,
  placeholder,
  error,
  onBlur = noop,
  displayEye = true,
}) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          // placeholderTextColor={palette.NEUTRAL30}
          style={[
            styles.input,
            focused && styles.inputFocus,
            error ? styles.inputError : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (!value) {
              setFocused(false);
            }
            onBlur();
            // Keyboard.dismiss();
          }}
          secureTextEntry={!visible}
          returnKeyLabel="Done"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        {displayEye && (
          <TouchableOpacity
            onPress={() => setVisible(prevState => !prevState)}
            style={styles.iconContainer}>
            {visible ? (
              <Feather name="eye" size={22} color={palette.DEFAULT} />
            ) : (
              <Feather name="eye-off" size={22} color={palette.DEFAULT} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default PasswordInput;
