import {StyleSheet} from 'react-native';

export const styled = StyleSheet.create({
  container: {
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  inputWrap: {
    width: '78%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  input: {
    width: '100%',
    height: 35,
    borderRadius: 3,
    backgroundColor: '#DEE2E6',
    color: 'black',
    padding: 5,
  },
  buttonWrap: {
    width: '12%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
