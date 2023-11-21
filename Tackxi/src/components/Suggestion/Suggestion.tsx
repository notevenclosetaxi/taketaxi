import React from 'react';
import {Text, View} from 'react-native';
import {styled} from './styles';
import {DetailStep, SimpleStep} from './components';
import {Info} from '../../interface/route.interface';
import {TimeUtil} from '../../utils';

interface SuggestionProps {
  info: Info;
}

const Suggestion: React.FC<SuggestionProps> = ({info}) => {
  return (
    <View style={styled.container}>
      <View style={styled.body}>
        <View style={styled.simpleRoute}>
          <View style={styled.infoWrap}>
            <View style={styled.saveInfo}>
              <Text style={{fontSize: 12, color: 'red'}}>
                택시비 {info.summary.savedMoney}원을 절약하고
              </Text>
              <Text style={{fontSize: 12, color: 'red'}}>
                소요 시간 {TimeUtil.setSecondToMinute(info.summary.savedTime)}
                분을 절약했어요!
              </Text>
            </View>
            <View style={styled.routeInfo}>
              <Text style={{fontSize: 15}}>
                택시비 - {info.summary.taxiFare}원
              </Text>
              <View style={styled.rowDivider} />
              <Text style={{fontSize: 15}}>
                소요 시간 - {Math.floor(info.summary.wastedTime / 60)}분
              </Text>
            </View>
          </View>
          <View style={styled.simpleWrap}>
            {info.steps.map(step => (
              <SimpleStep
                key={step.sectionTime}
                step={step}
                wastedTime={info.summary.wastedTime}
              />
            ))}
          </View>
        </View>
        <View style={[styled.columnDivider, {height: 2}]} />
        <View style={styled.detailRoute}>
          {info.steps.map(step => (
            <DetailStep
              key={step.sectionTime}
              step={step}
              taxiFare={info.summary.taxiFare}
            />
          ))}
        </View>
      </View>
      <View style={styled.columnDivider} />
    </View>
  );
};

export default Suggestion;
