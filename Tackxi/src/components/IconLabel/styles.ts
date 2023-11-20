import {StyleSheet} from 'react-native';

export const styled = (iconColor?: string) =>
  StyleSheet.create({
    label: {
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: iconColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
