import React from 'react';
import {IconLabel} from '../../../../../../../../components';
import {ModeEnum} from '../../../../../../../../enums';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {TimeUtil} from '../../../../../../../../utils';

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
