import {StyleSheet} from 'react-native';

export const styled = (isOpen: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    body: {
      position: 'absolute',
      width: '100%',
      height: isOpen ? 390 : 140,
      bottom: 0,
      transition: 'all 0.4s ease-out',
    },
    bodyHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      width: '100%',
      backgroundColor: 'white',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
    },
    icon: {
      position: 'absolute',
      top: 50,
      right: 20,
      zIndex: 9999,
    },
  });
