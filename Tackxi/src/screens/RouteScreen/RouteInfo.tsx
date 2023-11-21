import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getRouteList } from '../../service/route.service';
import { useState } from 'react';
import { routedata } from '../../../routedate';
import { mock } from '../../../mock';
import { SearchInput } from './SearchInput';
import { styled } from './styles';

export const RouteInfo: React.FC = (props: any) => {
  // const [routeListData, setRouteListData] = useState([]);
  // const getRouteInfoList = async () => {
  //   try {
  //     const res = await getRouteList();
  //     await setRouteListData(res.InfoList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log('res', routeListData);

  const routeData = props.route.params.routeData;
  const TaxiData = props.route.params.TaxiData;
  console.log('routedata', routeData);

  console.log('taxidata', TaxiData);

  return (
    <SafeAreaView>
      <SearchInput />
      <ScrollView style={styled.body}>
        <View>
          <View style={styled.body}>
            <View>
              <View style={styled.infoWrap}>
                <View style={styled.saveInfo}>
                  <Text style={{ fontSize: 12, color: 'red' }}>
                    이동 거리 : {Math.round((TaxiData['distance(m)'] / 1000) * 100) / 100}{' '}
                    KM
                  </Text>
                </View>
                <View style={styled.routeInfo}>
                  <Text style={{ fontSize: 15 }}>
                    택시비 - {TaxiData['taxiFare(won)']}원
                  </Text>
                  <View style={styled.rowDivider} />
                  <Text style={{ fontSize: 15 }}>
                    소모 시간 : {Math.round(TaxiData['spendTime(Sec)'] / 60)}분
                  </Text>
                </View>
              </View>
              <View>
                {Object.keys(routeData).map((option, index) => (
                  <View key={index}>
                    <Text>옵션 {option}:</Text>
                    {Object.keys(routeData[option]).map((step) => (
                      <View style={styled.simpleRoute} key={step}>
                        <Text>- Step {step}:</Text>
                        <Text> - 모드: {routeData[option][step].mode}</Text>
                        <Text> - 방법: {routeData[option][step].route}</Text>
                        <Text>
                          {' '}
                          - 소요시간: 약{' '}
                          {Math.trunc(routeData[option][step].spendTime / 60)}분{' '}
                          {Math.round(routeData[option][step].spendTime) % 60}초
                        </Text>
                        <Text> - 출발지: {routeData[option][step].startName}</Text>
                        <Text> - 도착지: {routeData[option][step].endName}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
