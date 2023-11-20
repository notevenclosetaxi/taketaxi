import {StyleSheet} from 'react-native';

export const styled = StyleSheet.create({
  container: {
    height: 365,
    backgroundColor: 'white',
  },
  body: {
    height: 360,
  },
  simpleRoute: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    height: 110,
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  saveInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    gap: 5,
    width: '100%',
  },
  routeInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    gap: 10,
    width: '100%',
  },
  simpleWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    height: 40,
  },
  detailRoute: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 250,
    padding: 15,
  },
  rowDivider: {
    height: '50%',
    width: 2,
    backgroundColor: '#d3d3d3',
  },
  columnDivider: {
    height: 3,
    backgroundColor: '#d3d3d3',
  },
});
