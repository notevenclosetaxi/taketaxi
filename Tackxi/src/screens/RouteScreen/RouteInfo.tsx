import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getRouteList } from '../../service/route.service';
import { useState } from 'react';
import { routedata } from '../../../routedate';

export const RouteInfo: React.FC = () => {
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

  const [routeList, setRouteList] = useState(routedata.InfoList);

  const sortByDuration = () => {
    const sortedTimeList = [...routeList].sort(
      (a, b) => b.summary.savedTime - a.summary.savedTime
    );
    setRouteList(sortedTimeList);
    // console.log(sortedTimeList);
  };

  const sortByPrice = () => {
    const sortedMoneyList = [...routeList].sort(
      (a, b) => a.summary.taxiFare - b.summary.taxiFare
    );
    setRouteList(sortedMoneyList);
    // console.log(sortedMoneyList);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Button title="최단 시간이 좋아요" onPress={() => sortByDuration()}></Button>
        <Button title="경제적으로 타고 싶어요" onPress={() => sortByPrice()}></Button>
        {routeList.map((item, idx) => (
          <View key={idx} style={styles.MainBox}>
            <Text style={styles.MainText}>택시 요금 : {item.summary.taxiFare}원</Text>
            <Text style={styles.MainText}>
              절약 시간 : {Math.round(item.summary.savedTime / 60)}분
            </Text>
            <Text style={styles.MainText}>
              절약한 택시 요금 : {item.summary.savedMoney}원
            </Text>
            {item.steps.map((step, stepIdx) => (
              <View key={stepIdx} style={styles.InBox}>
                <Text>교통수단 : {step.mode}</Text>
                {step.mode === 'BUS' && step.route !== null && (
                  <Text>버스 번호 : {step.route}</Text>
                )}
                <Text>출발지 : {step.stationList[0]}</Text>
                <Text>도착지 : {step.stationList[step.stationList.length - 1]}</Text>
                <Text>소요시간 : {Math.round(step.sectionTime / 60)}분</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainText: {
    fontSize: 20,
  },
  InBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  MainBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});
