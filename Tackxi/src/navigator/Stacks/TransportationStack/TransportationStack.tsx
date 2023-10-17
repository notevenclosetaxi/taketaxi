import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {TransportationScreen} from '../../../screens';

const {Screen, Navigator} =
  createNativeStackNavigator<TransportationStackParamList>();

export type TransportationStackParamList = {
  transportation: undefined;
};

export type TransportationStackNavigationProp<
  RouteName extends keyof TransportationStackParamList,
> = NativeStackNavigationProp<TransportationStackParamList, RouteName>;

export type TransportationNavigations = {
  [RouteName in keyof TransportationStackParamList]: TransportationStackNavigationProp<RouteName>;
};

export type TransportationStackRoutes = {
  [RouteName in keyof TransportationStackParamList]: RouteProp<
    TransportationStackParamList,
    RouteName
  >;
};

const TransportationStack: React.FC = () => {
  return (
    <Navigator
      initialRouteName="transportation"
      screenOptions={{headerShown: false}}>
      <Screen name="transportation" component={TransportationScreen} />
    </Navigator>
  );
};

export default TransportationStack;
