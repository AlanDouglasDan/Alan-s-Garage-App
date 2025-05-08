import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {palette} from 'core/styles';

interface ArrowBackProps {
  onPress: () => void;
  color?: string;
}

const ArrowBack: FC<ArrowBackProps> = ({
  onPress,
  color = palette.TEXT_HEADING,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name="arrowleft" size={24} color={color} />
    </TouchableOpacity>
  );
};

export default ArrowBack;
