import React, { useEffect, useState } from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStack, TransportationStack } from './Stacks';
import { TokenService } from '../service';
import { RouteStack } from './Stacks/RouteStack';

const { Screen, Navigator } = createNativeStackNavigator<AppStackParamList>();

export type AppStackParamList = {
  authStack: undefined;
  transportationStack: undefined;
  routeStack: undefined;
};

export type AppStackNavigationProp<RouteName extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, RouteName>;

export type AppNavigations = {
  [RouteName in keyof AppStackParamList]: AppStackNavigationProp<RouteName>;
};

export type AppStackRoutes = {
  [RouteName in keyof AppStackParamList]: RouteProp<AppStackParamList, RouteName>;
};

const AppStack: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    const tokens = await TokenService.getTokens();

    if (tokens?.accessToken) {
      setIsAuth(true);
      return;
    }

    setIsAuth(false);
  };

  return (
    <Navigator initialRouteName="authStack" screenOptions={{ headerShown: false }}>
      <Screen name="authStack" component={AuthStack} />
      {isAuth && <Screen name="transportationStack" component={TransportationStack} />}
      <Screen name="routeStack" component={RouteStack} />
    </Navigator>
  );
};

export default AppStack;
