import React from 'react';
import { Text, View } from 'react-native';
import { styled } from './styles';
import { DetailStep, SimpleStep } from './components';
import { Info, Option, TaxiInfo } from '../../../../interface/route.interface';
import { TimeUtil } from '../../../../utils';
import { IconTableExport } from 'tabler-icons-react-native';

interface SuggestionProps {
  info: Option[];
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
                소요 시간 {TimeUtil.setSecondToMinute(TaxiInfo['spendTime(Sec)'] * 2)}
                분을 절약했어요!
              </Text>
            </View>
            <View style={styled.routeInfo}>
              <Text style={{ fontSize: 15 }}>택시비 - {TaxiInfo['taxiFare(won)']}원</Text>
              <View style={styled.rowDivider} />
              <Text style={{ fontSize: 15 }}>
                소요 시간 - {TimeUtil.setSecondToMinute(TaxiInfo['spendTime(Sec)'])}분
              </Text>
            </View>
          </View>
          <View style={styled.simpleWrap}>
            {info.map((option, idx) => (
              <View key={idx}>
                <SimpleStep
                  key={`step0-${option}`}
                  step={option.step0}
                  wastedTime={option.step0.spendTime}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={[styled.columnDivider, { height: 2 }]} />

        <View style={styled.detailRoute}>
          {info.map((option, idx) => (
            <View key={idx}>
              <DetailStep
                key={`step0-${option.step0.spendTime}`}
                step={option.step0}
                taxiFare={TaxiInfo['taxiFare(won)']}
              />
              <DetailStep
                key={`step1-${option.step1.spendTime}`}
                step={option.step1}
                taxiFare={TaxiInfo['taxiFare(won)']}
              />
              <DetailStep
                key={`step2-${option.step2.spendTime}`}
                step={option.step2}
                taxiFare={TaxiInfo['taxiFare(won)']}
              />
              <DetailStep
                key={`step3-${option.step3.spendTime}`}
                step={option.step3}
                taxiFare={TaxiInfo['taxiFare(won)']}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styled.columnDivider} />
    </View>
  );
};
//택시의 경우에는 스텝 안에 TAXI가 없으므로 모드가 존재하지 않음. 택시가 안 나오는 원인임
//택시의 경우 step0로 데이터를 추가하면 어떨까 싶음
export default Suggestion;
