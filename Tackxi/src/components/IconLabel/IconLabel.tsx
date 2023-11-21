import React, { useMemo } from 'react';
import { View } from 'react-native';
import { styled } from './styles';
import { ModeEnum } from '../../enums';
import BUS from '../../assets/Bus.svg';
import Taxi from '../../assets/Taxi.svg';
import Walk from '../../assets/Walk.svg';
import Location from '../../assets/Location.svg';
import Subway from '../../assets/Subway.svg';

interface IconLabelProps {
  iconType: ModeEnum;
  iconColor?: string;
  labelColor?: string;
}

const IconLabel: React.FC<IconLabelProps> = ({ iconType, iconColor, labelColor }) => {
  const icon = useMemo(() => {
    switch (iconType) {
      case ModeEnum.BUS: {
        return <BUS />;
      }
      case ModeEnum.TAXI: {
        return <Taxi />;
      }
      case ModeEnum.WALK: {
        return <Walk />;
      }
      case ModeEnum.LOCATION: {
        return <Location />;
      }
      case ModeEnum.SUBWAY: {
        return <Subway />;
      }
    }
  }, [iconType]);

  return (
    <View style={styled(labelColor).label}>
      {React.cloneElement(icon, { fill: iconColor })}
    </View>
  );
};

export default IconLabel;
