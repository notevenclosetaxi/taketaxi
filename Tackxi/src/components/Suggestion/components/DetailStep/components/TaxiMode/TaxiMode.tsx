import React from 'react';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {ModeEnum} from '../../../../../../enums';
import {IconLabel} from '../../../../../IconLabel';

interface TaxiModeProps {
  station: string;
  taxiInfo: number;
}

const TaxiMode: React.FC<TaxiModeProps> = ({station, taxiInfo}) => {
  return (
    <View style={styled.container}>
      <View style={styled.barWrap}>
        <IconLabel labelColor="#f57c2c" iconType={ModeEnum.TAXI} />
        <View style={styled.bar} />
      </View>
      <View style={styled.info}>
        <View style={styled.stationInfo}>
          <Text>{station} 택시 승차</Text>
        </View>
        <View style={styled.textInfo}>
          <Text style={{fontSize: 12, color: 'gray'}}>약 {taxiInfo}원</Text>
        </View>
      </View>
    </View>
  );
};

export default TaxiMode;
