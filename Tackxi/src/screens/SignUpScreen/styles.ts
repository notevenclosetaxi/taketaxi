import {StyleSheet} from 'react-native';

export const styled = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: '80%',
    height: '40%',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  id: {
    width: '70%',
    height: 30,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 4,
  },
  pw: {
    width: '70%',
    height: 30,
    borderWidth: 1,
    borderRadius: 2,
  },
  button: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
