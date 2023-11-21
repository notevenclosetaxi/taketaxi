import React from 'react';
import {IconLabel} from '../../../../../../../../components';
import {ModeEnum} from '../../../../../../../../enums';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {TimeUtil} from '../../../../../../../../utils';

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
