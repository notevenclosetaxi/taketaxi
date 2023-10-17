import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styled} from './styles';

interface BaseViewProps {
  children?: React.ReactNode;
  style?: Object;
}

const BaseView: React.FC<BaseViewProps> = ({children, style}) => {
  const containerStyle = useMemo(() => {
    return {
      ...styled.container,
      ...style,
    };
  }, [style]);

  return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>;
};

export default BaseView;
