import AsyncStorage from '@react-native-async-storage/async-storage';

export const set = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const get = async (key: string) => {
  const value = await AsyncStorage.getItem(key);

  if (!value) {
    return undefined;
  }

  return value;
};

export const remove = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
