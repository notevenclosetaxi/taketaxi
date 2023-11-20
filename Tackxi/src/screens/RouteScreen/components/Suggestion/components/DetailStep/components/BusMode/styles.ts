import { StyleSheet } from 'react-native';

export const styled = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '25%',
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
    backgroundColor: '#34447F',
  },
  info: {
    flex: 1,
  },
  stationInfo: {
    display: 'flex',
    justifyContent: 'center',
    height: '35%',
    width: '100%',
    paddingLeft: 8,
  },
  textInfo: {
    display: 'flex',
    height: '65%',
    width: '100%',
    paddingLeft: 8,
    paddingTop: 3,
  },
});
