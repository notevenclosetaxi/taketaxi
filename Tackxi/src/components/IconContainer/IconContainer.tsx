import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IconProps {
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const IconContainer: React.FC<IconProps> = ({name, size, style, onPress}) => {
  return (
    <View style={style}>
      <Icon name={name} size={size} onPress={onPress} />
    </View>
  );
};

export default IconContainer;
