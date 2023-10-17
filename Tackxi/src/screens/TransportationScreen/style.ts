import {StyleSheet} from 'react-native';

export const styled = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderRadius: 10,
    gap: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconWrap: {
    gap: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  iconStyle: {
    backgroundColor: 'skyblue',
  },
});
