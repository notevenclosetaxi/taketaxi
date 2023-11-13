import { StyleSheet, TextInput, View } from 'react-native';
import { RouteQuery } from '../../interface';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconArrowsExchange, IconX } from 'tabler-icons-react-native';

export const SearchInput = ({ queryData, setQueryData }: any) => {
  const handleChangQuery = (name: 'startQuery' | 'endQuery', text: string): void => {
    setQueryData({
      ...queryData,
      [name]: text,
    });
  };

  return (
    <View style={styled.container}>
      <View style={styled.inputWrap}>
        <TextInput
          style={styled.input}
          placeholder="출발지"
          value={queryData.startQuery}
          onChangeText={(text) => handleChangQuery('startQuery', text)}
        />
        <TextInput
          style={styled.input}
          placeholder="목적지"
          value={queryData.endQuery}
          onChangeText={(text) => handleChangQuery('endQuery', text)}
        />
      </View>
      <View style={styled.buttonWrap}>
        <IconX size={30} color="#969da3" />
        <IconArrowsExchange size={30} color="#969da3" />
      </View>
    </View>
  );
};

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
