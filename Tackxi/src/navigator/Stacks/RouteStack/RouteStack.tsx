import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RouteScreen } from '../../../screens/RouteScreen/RouteScreen';
import { RouteProp } from '@react-navigation/native';
import { RouteInfo } from '../../../screens/RouteScreen/RouteInfo';
import { SuggestionScreen } from '../../../screens/RouteScreen';

const { Screen, Navigator } = createNativeStackNavigator<RouteStackParamList>();

export type RouteStackParamList = {
  route: any;
  routeInfo: any;
  suggestion: any;
};

export type RouteStackNavigationProp<RouteName extends keyof RouteStackParamList> =
  NativeStackNavigationProp<RouteStackParamList, RouteName>;

export type RouteNavigations = {
  [RouteName in keyof RouteStackParamList]: RouteStackNavigationProp<RouteName>;
};

export type RouteStackRoutes = {
  [RouteName in keyof RouteStackParamList]: RouteProp<RouteStackParamList, RouteName>;
};

const RouteStack: React.FC = () => {
  return (
    <Navigator initialRouteName="route" screenOptions={{ headerShown: false }}>
      <Screen name="route" component={RouteScreen} />
      <Screen name="routeInfo" component={RouteInfo} />
      <Screen name="suggestion" component={SuggestionScreen} />
    </Navigator>
  );
};

export default RouteStack;
