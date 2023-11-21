import React from 'react';
import { BaseView } from '../../components';
import { styled } from './styles';
import { ScrollView, TouchableOpacity } from 'react-native';
import { mock } from './mock';
import { HeaderComponent, Suggestion } from './components';
import { v4 as uuid } from 'uuid';
import { SuggestionStackParamList } from '../../navigator/Stacks/SuggestionStack/SuggestionStack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SuggestionStore } from '../../stores';
import { SearchInput } from './SearchInput';
import { TaxiInfo } from '../../interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RouteStackParamList } from '../../navigator/Stacks/RouteStack/RouteStack';

const SuggestionScreen: React.FC = (props: any) => {
  const routeData = props.route.params && props.route.params.routeData;
  const TaxiData: TaxiInfo = props.route.params && props.route.params.TaxiData;

  const navigation = useNavigation<NativeStackNavigationProp<RouteStackParamList>>();

  const { startQuery, endQuery } = useSelector((state: RootState) => state.query);
  // console.log('routedata', routeData);

  // console.log('taxidata', TaxiData);

  const optionsArray = routeData && Object.values(routeData);

  const newOptionsArray = optionsArray.map((option) => ({
    ...option,
    step0: {
      mode: 'TAXI',
      startName: startQuery,
      spendTime: TaxiData['spendTime(Sec)'],
      taxiFare: TaxiData['taxiFare(won)'],
      costPerDistance: TaxiData.costPerDistance,
      gpx: TaxiData.gpx,
    },

    step1: { ...option.step1, startName: `${option.step2.startName} 근처` },

    step3: {
      ...option.step3,
      endName: endQuery,
    },
  }));

  let newData = newOptionsArray.map((item) => {
    let steps = [];
    for (let i = 0; i < 4; i++) {
      let stepKey = `step${i}`;
      if (item[stepKey]) {
        steps.push(item[stepKey]);
      }
    }
    return { steps };
  });

  // console.log(
  //   'newData',
  //   newData.map((item) => item.steps.reduce((acc, cur) => acc + cur.spendTime, 0))
  // );

  const handlePress = (info: any) => {
    navigation.navigate('route', { info });
  };

  return (
    <BaseView>
      <SearchInput />
      <ScrollView style={styled.body}>
        {newData.map((info, idx) => (
          <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress(info)}>
            <Suggestion info={info} TaxiInfo={TaxiData} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseView>
  );
};

export default SuggestionScreen;
