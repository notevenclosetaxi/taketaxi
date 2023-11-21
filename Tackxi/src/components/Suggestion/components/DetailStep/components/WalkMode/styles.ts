import {StyleSheet} from 'react-native';

export const styled = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '36%',
    width: '100%',
  },
  barWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: 25,
  },
  bar: {
    flex: 1,
    width: 2,
    backgroundColor: '#777',
  },
  info: {
    display: 'flex',
    flex: 1,
  },
  stationInfo: {
    display: 'flex',
    justifyContent: 'center',
    height: '35%',
    width: '100%',
    paddingLeft: 8,
  },
  gap: {
    flex: 1,
  },
  textInfo: {
    display: 'flex',
    justifyContent: 'center',
    height: '28%',
    width: '100%',
    paddingLeft: 8,
  },
});
