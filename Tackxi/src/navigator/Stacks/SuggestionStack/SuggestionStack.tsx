import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MapScreen, SuggestionScreen } from '../../../screens';

const { Screen, Navigator } = createNativeStackNavigator<SuggestionStackParamList>();

export type SuggestionStackParamList = { suggestion: undefined; map: undefined };

export type SuggestionStackNavigationProp<
  RouteName extends keyof SuggestionStackParamList
> = NativeStackNavigationProp<SuggestionStackParamList, RouteName>;

export type SuggestionNavigations = {
  [RouteName in keyof SuggestionStackParamList]: SuggestionStackNavigationProp<RouteName>;
};

export type SuggestionStackSuggestions = {
  [RouteName in keyof SuggestionStackParamList]: RouteProp<
    SuggestionStackParamList,
    RouteName
  >;
};

const SuggestionStack: React.FC = () => {
  return (
    <Navigator initialRouteName="suggestion" screenOptions={{ headerShown: false }}>
      <Screen name="suggestion" component={SuggestionScreen} />
      <Screen name="map" component={MapScreen} />
    </Navigator>
  );
};

export default SuggestionStack;
