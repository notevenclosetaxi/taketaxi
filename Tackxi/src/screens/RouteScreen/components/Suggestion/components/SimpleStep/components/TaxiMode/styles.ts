import {StyleSheet} from 'react-native';

export const styled = (percent: number) =>
  StyleSheet.create({
    bar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: `${percent}%`,
      borderRadius: 50,
      height: 15,
      backgroundColor: '#f57c2c',
    },
  });
