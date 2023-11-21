import React from 'react';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {ModeEnum} from '../../../../../../enums';
import {TimeUtil} from '../../../../../../utils';
import {IconLabel} from '../../../../../IconLabel';

interface WalkModeProps {
  percent: number;
  sectionTime: number;
}

const WalkMode: React.FC<WalkModeProps> = ({percent, sectionTime}) => {
  return (
    <View style={styled(percent).bar}>
      <IconLabel labelColor="#777" iconType={ModeEnum.WALK} />
      <Text style={{fontSize: 12, color: 'white'}}>
        {TimeUtil.setSecondToMinute(sectionTime)}분
      </Text>
    </View>
  );
};

export default WalkMode;
