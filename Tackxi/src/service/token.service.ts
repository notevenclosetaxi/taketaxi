import AsyncStorage from '@react-native-async-storage/async-storage';
import {JwtTokens} from '../interface';

export const setTokens = async (tokens: JwtTokens) => {
  await AsyncStorage.setItem('accessToken', tokens.accessToken);
  await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
};

export const getTokens = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    const tokens: JwtTokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return tokens;
  }

  return undefined;
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};
