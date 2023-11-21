import React from 'react';
import { Text, View } from 'react-native';
import { styled } from './styles';
import { DetailStep, SimpleStep } from './components';
import { Info, Option, TaxiInfo } from '../../../../interface/route.interface';
import { TimeUtil } from '../../../../utils';
import { IconTableExport } from 'tabler-icons-react-native';

interface SuggestionProps {
  info: Option;
  TaxiInfo: TaxiInfo;
}

const Suggestion: React.FC<SuggestionProps> = ({ info, TaxiInfo }) => {
  return (
    <View style={styled.container}>
      <View style={styled.body}>
        <View style={styled.simpleRoute}>
          <View style={styled.infoWrap}>
            <View style={styled.saveInfo}>
              <Text style={{ fontSize: 12, color: 'red' }}>
                M당 택시비가 {Math.round(TaxiInfo.costPerDistance * 100) / 100}원으로 가장
                저렴해요
              </Text>
              <Text style={{ fontSize: 12, color: 'red' }}>
                소요 시간 {TimeUtil.setSecondToMinute(TaxiInfo['spendTime(Sec)'] * 0.8)}
                분을 절약했어요!
              </Text>
            </View>
            <View style={styled.routeInfo}>
              <Text style={{ fontSize: 15 }}>택시비 - {TaxiInfo['taxiFare(won)']}원</Text>
              <View style={styled.rowDivider} />
              <Text style={{ fontSize: 15 }}>
                소요 시간 -{' '}
                {TimeUtil.setSecondToMinute(
                  info.steps.reduce((acc, cur) => acc + cur.spendTime, 0)
                )}
                분
              </Text>
            </View>
          </View>
          <View style={styled.simpleWrap}>
            {info.steps.map((step) => (
              <SimpleStep
                key={`step0-${step.spendTime}`}
                step={step}
                wastedTime={step.spendTime}
              />
            ))}
          </View>
        </View>
        <View style={[styled.columnDivider, { height: 2 }]} />

        <View style={styled.detailRoute}>
          {info.steps.map((step) => (
            <DetailStep
              key={`step0-${step.spendTime}`}
              step={step}
              taxiFare={TaxiInfo['taxiFare(won)']}
            />
          ))}
        </View>
      </View>
      <View style={styled.columnDivider} />
    </View>
  );
};
export default Suggestion;
