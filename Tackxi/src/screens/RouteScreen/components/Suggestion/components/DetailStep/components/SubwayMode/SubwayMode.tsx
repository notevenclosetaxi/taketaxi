import React from 'react';
import { IconLabel } from '../../../../../../../../components';
import { ModeEnum } from '../../../../../../../../enums';
import { Text, View } from 'react-native';
import { styled } from './styles';
import { IconMapPinFilled } from 'tabler-icons-react-native';

interface SubwayModeProps {
  station: string;
  subwayInfo: string | null;
}

const SubwayMode: React.FC<SubwayModeProps> = ({ station, subwayInfo }) => {
  return (
    <View style={styled.container}>
      <View style={styled.barWrap}>
        <IconLabel labelColor="green" iconType={ModeEnum.SUBWAY} />
        <View style={styled.bar} />
      </View>
      <View style={styled.info}>
        <View style={styled.stationInfo}>
          <Text>{station} 지하철 승차</Text>
        </View>
        <View style={styled.textInfo}>
          <Text style={{ fontSize: 12, color: 'gray' }}>{subwayInfo}</Text>
        </View>
      </View>
    </View>
  );
};

export default SubwayMode;
