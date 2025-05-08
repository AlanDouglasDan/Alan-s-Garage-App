import React, {FC, useState, useEffect} from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  TextStyle,
  ImageStyle,
  KeyboardTypeOptions,
  Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CheckBox} from '@rneui/themed';

import {BottomSheet} from 'components/BottomSheet';
import {palette} from 'core/styles';
import {noop} from 'core/utils';
import styles from './SelectInput.styles';

interface OptionValue {
  label: string;
  value: {name: string; id: any};
}

interface SelectInputProps {
  label: string;
  value: string[] | string;
  options: OptionValue[];
  onSelect: (selectedValue: any) => void;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  placeholder?: string;
  error?: string;
  selectorHeight?: number;
  labelStyle?: TextStyle;
  selectIconContainerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle | ViewStyle[] | TextStyle[];
  iconStyle?: ImageStyle;
  showPlaceholder?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  onBlur?: () => void;
  multi?: boolean;
  searchable?: boolean;
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChangeText,
  onSelect,
  containerStyle = {},
  placeholder,
  error,
  selectorHeight,
  labelStyle = {},
  selectIconContainerStyle = {},
  inputContainerStyle = {},
  inputStyle = {},
  iconStyle = {},
  showPlaceholder = true,
  keyboardType,
  editable = false,
  onBlur = noop,
  multi,
  searchable,
}) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const [search, setSearch] = useState<string>('');

  const [_options, setOptions] = useState<OptionValue[]>(options);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  const onOpen = () => {
    Keyboard.dismiss();
    setOpen(prevState => !prevState);
  };

  const handleSearch = async (text: string) => {
    setSearch(text);

    if (text) {
      setOptions(
        options.filter(option => {
          const nameToLower = option.label.toLowerCase();

          return nameToLower.includes(text.toLowerCase());
        }),
      );
    } else {
      setOptions(options);
    }
  };

  return (
    <>
      <View style={containerStyle}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

        <TouchableOpacity
          style={[styles.inputContainer, inputContainerStyle]}
          onPress={onOpen}>
          <TextInput
            placeholder={showPlaceholder ? placeholder : undefined}
            placeholderTextColor={palette.SUPPORT}
            style={[
              styles.input,
              inputStyle,
              focused && value ? styles.inputFocus : null,
            ]}
            value={typeof value === 'string' ? value : value.join(', ')}
            editable={editable}
            pointerEvents={editable ? 'auto' : 'none'}
            keyboardType={keyboardType}
            onChangeText={text => onChangeText && onChangeText(text)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              if (!value) {
                setFocused(false);
              }
              onBlur();
              Keyboard.dismiss();
            }}
            returnKeyLabel="Done"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            multiline
          />

          <View style={[styles.iconContainer, selectIconContainerStyle]}>
            <Entypo
              name="chevron-down"
              size={20}
              color={palette.PRIMARY}
              style={[styles.icon, iconStyle]}
            />
          </View>
        </TouchableOpacity>

        {!!error && <Text style={styles.textError}>{error}</Text>}
      </View>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        height={selectorHeight}
        HeaderComponent={
          <>
            <View style={styles.header} />

            <View style={styles.paddedBackground}>
              <Text style={styles.bottomSheetTitle}>
                {placeholder || `Select ${label.toLocaleLowerCase()}`}
              </Text>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setOpen(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View
                style={[
                  styles.searchContainer,
                  focused ? styles.inputFocus : {},
                ]}>
                <Ionicons
                  name="search"
                  size={18}
                  color={palette.DEFAULT}
                  style={styles.icon2}
                />

                <TextInput
                  style={styles.input2}
                  placeholder={
                    label ? `Search by ${label.toLocaleLowerCase()}` : 'Search'
                  }
                  placeholderTextColor={palette.SUPPORT}
                  onChangeText={text => handleSearch(text)}
                  value={search}
                  onFocus={() => setFocused(true)}
                  onBlur={() => !search && setFocused(false)}
                  returnKeyLabel="Done"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />

                <AntDesign
                  name="close"
                  size={18}
                  color={palette.DEFAULT}
                  onPress={() => handleSearch('')}
                />
              </View>
            )}
          </>
        }>
        <View style={styles.content}>
          {_options.map(option => (
            <CheckBox
              key={option.value.id}
              title={option.label}
              checked={
                multi
                  ? value.includes(option.value.id)
                  : option.value.id === value
              }
              onPress={() => {
                if (option.value.id === value) {
                  onSelect('');
                } else {
                  onSelect(option.value);
                }
                !multi && setOpen(false);
                setFocused(true);
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
                  name="radio-button-on"
                  size={24}
                  color={palette.PRIMARY}
                />
              }
            />
          ))}
        </View>
      </BottomSheet>
    </>
  );
};

export default SelectInput;
