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

const SuggestionScreen: React.FC = (props: any) => {
  const routeData = props.route.params.routeData;
  const TaxiData: TaxiInfo = props.route.params.TaxiData;

  const { startQuery, endQuery } = useSelector((state: RootState) => state.query);
  // console.log('routedata', routeData);

  // console.log('taxidata', TaxiData);

  const optionsArray = routeData && Object.values(routeData);

  // console.log('optionsArray', optionsArray);

  const newOptionsArray = optionsArray.map((option) => ({
    ...option,
    step0: {
      mode: 'TAXI',
      startName: startQuery,
      spendTime: TaxiData['spendTime(Sec)'],
    },

    step1: { ...option.step1, startName: `${option.step2.startName} 근처` },

    step3: {
      ...option.step3,
      endName: endQuery,
    },
  }));

  console.log('newOpa', newOptionsArray[0]);

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

  return (
    <BaseView>
      <SearchInput />
      <ScrollView style={styled.body}>
        <TouchableOpacity activeOpacity={1}>
          <Suggestion info={newData} TaxiInfo={TaxiData} />
        </TouchableOpacity>
      </ScrollView>
    </BaseView>
  );
};

export default SuggestionScreen;
