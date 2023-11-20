import React from 'react';
import {IconLabel} from '../../../../../../../../components';
import {ModeEnum} from '../../../../../../../../enums';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {IconMapPinFilled} from 'tabler-icons-react-native';

interface WalkModeProps {
  station: string;
  destinationInfo: string;
}

const WalkMode: React.FC<WalkModeProps> = ({station, destinationInfo}) => {
  return (
    <View style={styled.container}>
      <View style={styled.barWrap}>
        <IconLabel labelColor="#777" iconType={ModeEnum.WALK} />
        <View style={styled.bar} />
        <IconMapPinFilled />
      </View>
      <View style={styled.info}>
        <View style={styled.stationInfo}>
          <Text>{station}</Text>
        </View>
        <View style={styled.gap} />
        <View style={styled.textInfo}>
          <Text>{destinationInfo}</Text>
        </View>
      </View>
    </View>
  );
};

export default WalkMode;
