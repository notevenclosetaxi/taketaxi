import React from 'react';
import { IconLabel } from '../../../../../../../../components';
import { ModeEnum } from '../../../../../../../../enums';
import { Text, View } from 'react-native';
import { styled } from './styles';
import { TimeUtil } from '../../../../../../../../utils';

interface SubwayModeProps {
  percent: number;
  sectionTime: number;
}

const SubwayMode: React.FC<SubwayModeProps> = ({ percent, sectionTime }) => {
  return (
    <View style={styled(percent).bar}>
      <IconLabel labelColor="green" iconType={ModeEnum.SUBWAY} />
      <Text style={{ fontSize: 12, color: 'white' }}>
        {TimeUtil.setSecondToMinute(sectionTime)}분
      </Text>
    </View>
  );
};

export default SubwayMode;
