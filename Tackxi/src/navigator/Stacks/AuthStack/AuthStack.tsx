import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {LoginScreen, SignUpScreen} from '../../../screens';

const {Screen, Navigator} = createNativeStackNavigator<AuthStackParamList>();

export type AuthStackParamList = {login: undefined; signUp: undefined};

export type AuthStackNavigationProp<
  RouteName extends keyof AuthStackParamList,
> = NativeStackNavigationProp<AuthStackParamList, RouteName>;

export type AuthNavigations = {
  [RouteName in keyof AuthStackParamList]: AuthStackNavigationProp<RouteName>;
};

export type AuthStackRoutes = {
  [RouteName in keyof AuthStackParamList]: RouteProp<
    AuthStackParamList,
    RouteName
  >;
};

const AuthStack: React.FC = () => {
  return (
    <Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
      <Screen name="login" component={LoginScreen} />
      <Screen name="signUp" component={SignUpScreen} />
    </Navigator>
  );
};

export default AuthStack;
