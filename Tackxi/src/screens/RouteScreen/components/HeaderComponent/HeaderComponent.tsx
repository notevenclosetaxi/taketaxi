import React from 'react';
import {View} from 'react-native';
import {styled} from './styles';
import {TextInput} from 'react-native';
import {IconArrowsExchange, IconX} from 'tabler-icons-react-native';

const HeaderComponent: React.FC = () => {
  return (
    <View style={styled.container}>
      <View style={styled.inputWrap}>
        <TextInput style={styled.input} />
        <TextInput style={styled.input} />
      </View>
      <View style={styled.buttonWrap}>
        <IconX size={30} color="#969da3" />
        <IconArrowsExchange size={30} color="#969da3" />
      </View>
    </View>
  );
};

export default HeaderComponent;
