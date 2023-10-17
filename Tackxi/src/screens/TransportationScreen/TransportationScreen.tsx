import React from 'react';
import {BaseView, IconContainer} from '../../components';
import {Text, View} from 'react-native';
import {styled} from './style';
import {TransportationStore} from '../../stores';
import {Transportation} from '../../interface';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

const TransportationScreen = () => {
  const {transportationList, addTransportation, deleteTransportation} =
    TransportationStore();

  const handleIconClick = (name: string) => {
    const clickedTransportation: Transportation = {
      id: uuid(),
      name,
    };
    const isInclude = transportationList.find(
      transportation => transportation.name === clickedTransportation.name,
    );

    if (isInclude) {
      deleteTransportation(clickedTransportation);
      return;
    }

    addTransportation(clickedTransportation);
  };

  return (
    <BaseView style={styled.container}>
      <View style={styled.icon}>
        <View style={styled.iconWrap}>
          <IconContainer
            name="right"
            size={100}
            style={styled.iconStyle}
            onPress={() => {
              handleIconClick('right');
            }}
          />
          <IconContainer
            name="down"
            size={100}
            style={styled.iconStyle}
            onPress={() => {
              handleIconClick('down');
            }}
          />
        </View>
        <View style={styled.iconWrap}>
          <IconContainer
            name="up"
            size={100}
            style={styled.iconStyle}
            onPress={() => {
              handleIconClick('up');
            }}
          />
          <IconContainer
            name="left"
            size={100}
            style={styled.iconStyle}
            onPress={() => {
              handleIconClick('left');
            }}
          />
        </View>
      </View>
      {transportationList.map(transportation => (
        <View>
          <Text>{transportation.name}</Text>
        </View>
      ))}
    </BaseView>
  );
};

export default TransportationScreen;
