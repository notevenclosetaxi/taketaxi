import React from 'react';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {ModeEnum} from '../../../../../../enums';
import {TimeUtil} from '../../../../../../utils';
import {IconLabel} from '../../../../../IconLabel';

interface BusModeProps {
  percent: number;
  sectionTime: number;
}

const BusMode: React.FC<BusModeProps> = ({percent, sectionTime}) => {
  return (
    <View style={styled(percent).bar}>
      <IconLabel labelColor="#34447F" iconType={ModeEnum.BUS} />
      <Text style={{fontSize: 12, color: 'white'}}>
        {TimeUtil.setSecondToMinute(sectionTime)}분
      </Text>
    </View>
  );
};

export default BusMode;
