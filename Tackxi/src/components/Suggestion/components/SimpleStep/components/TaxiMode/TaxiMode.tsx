import React from 'react';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {ModeEnum} from '../../../../../../enums';
import {TimeUtil} from '../../../../../../utils';
import {IconLabel} from '../../../../../IconLabel';

interface TaxiModeProps {
  percent: number;
  sectionTime: number;
}

const TaxiMode: React.FC<TaxiModeProps> = ({percent, sectionTime}) => {
  return (
    <View style={styled(percent).bar}>
      <IconLabel labelColor="#f57c2c" iconType={ModeEnum.TAXI} />
      <Text style={{fontSize: 12, color: 'white'}}>
        {TimeUtil.setSecondToMinute(sectionTime)}분
      </Text>
    </View>
  );
};

export default TaxiMode;
