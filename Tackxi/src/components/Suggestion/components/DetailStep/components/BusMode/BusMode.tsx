import React from 'react';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {ModeEnum} from '../../../../../../enums';
import {IconLabel} from '../../../../../IconLabel';

interface BusModeProps {
  station: string;
  busInfo: string | null;
}

const BusMode: React.FC<BusModeProps> = ({station, busInfo}) => {
  return (
    <View style={styled.container}>
      <View style={styled.barWrap}>
        <IconLabel labelColor="#34447F" iconType={ModeEnum.BUS} />
        <View style={styled.bar} />
      </View>
      <View style={styled.info}>
        <View style={styled.stationInfo}>
          <Text>{station} 버스 승차</Text>
        </View>
        <View style={styled.textInfo}>
          <Text style={{fontSize: 12, color: 'gray'}}>{busInfo}</Text>
        </View>
      </View>
    </View>
  );
};

export default BusMode;
