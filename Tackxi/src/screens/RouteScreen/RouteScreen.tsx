import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
  Align,
} from 'react-native-nmap';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { RouteStackParamList } from '../../navigator/Stacks/RouteStack/RouteStack';
import { LatLongType, RouteQuery, RouteQueryRes } from '../../interface';
import { getGeoCode, getRouteList, getRoutePath } from '../../service/route.service';
import { SelectQueryEnum } from '../../enum';
import { getCoordinates } from '../../utils/route.util';
import { SearchInput } from './SearchInput';

export const RouteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteStackParamList>>();

  const [centerPoint, setCenterPoint] = useState<LatLongType>({
    latitude: 37.5537438,
    longitude: 126.9697745,
  });

  //지도에 경로 표시

  const stationInfo = useMemo(() => {
    return getRouteList().station;
  }, []);

  const testRoute1 = useMemo(() => {
    return getRouteList().item[0];
  }, []);

  const coordinates = useMemo(() => {
    return getCoordinates(testRoute1, stationInfo);
  }, [testRoute1, stationInfo]);

  //검색 관련

  const [searchData, setSearchData] = useState<object>([]);

  const [Querydata, setQueryData] = useState<RouteQuery>({
    startQuery: '',
    endQuery: '',
  });

  const [PathData, setPathData] = useState<any>();

  const [TaxiPathData, setTaxiPathData] = useState<any>();

  const [RouteGPX, setRouteGpx] = useState<any>();

  const [RouteTaxiGpx, setRouteTaxiGpx] = useState<any>();

  const handleChangQuery = (name: 'startQuery' | 'endQuery', text: string): void => {
    setQueryData({
      ...Querydata,
      [name]: text,
    });
  };

  console.log('taxi', TaxiPathData);

  const handleGetRoutePath = async () => {
    try {
      if (startPoint && endPoint) {
        const res = await getRoutePath(startPoint, endPoint);
        setPathData(res?.busRoutes);
        setTaxiPathData(res?.taxiRoutes);
      } else console.log('no data');
    } catch (err) {
      console.log(err);
    }
  };

  const getCood = (option) => {
    let coordinates = {};

    Object.keys(option).forEach((key) => {
      const step = option[key];
      coordinates[step.mode] = step.gpx.map((cood) => {
        return {
          latitude: Number(cood[1]),
          longitude: Number(cood[0]),
        };
      });
    });
    setRouteGpx(coordinates);
    setRouteTaxiGpx(TaxiPathData);
  };

  const handleGetGeoCode = async () => {
    try {
      if (selectQueryType === 'start') {
        const response = await getGeoCode(Querydata.startQuery, selectQueryType);

        if (response && response.searchData && response.centerPoint) {
          setSearchData(response.searchData);
          setSelectPointType(selectQueryType);
          setCenterPoint(response.centerPoint);
        }
      }

      if (selectQueryType === 'end') {
        const response = await getGeoCode(Querydata.endQuery, selectQueryType);

        if (response && response.searchData && response.centerPoint) {
          setSearchData(response.searchData);
          setSelectPointType(selectQueryType);
          setCenterPoint(response.centerPoint);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [startPoint, setStartPoint] = useState<LatLongType>();

  const [endPoint, setEndPoint] = useState<LatLongType>();

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [selectQueryType, setSelectQueryType] = useState<SelectQueryEnum>(
    SelectQueryEnum.START
  );

  const [selectPointType, setSelectPointType] = useState<SelectQueryEnum>(
    SelectQueryEnum.START
  );

  console.log(Querydata.startQuery, Querydata.endQuery);

  console.log('좌표', startPoint, endPoint);

  const handleMarkerClick = (item) => {
    item.title = item.title.replace(/<\/?[^>]+(>|$)/g, '');
    setSelectedMarker(item);
    setModalVisible(true);
  };

  const handlePointClick = () => {
    if (selectedMarker) {
      if (selectPointType === 'start') {
        setQueryData({
          ...Querydata,
          startQuery: selectedMarker.title,
        });
        setStartPoint({
          latitude: Number(selectedMarker.mapy) / Math.pow(10, 7),
          longitude: Number(selectedMarker.mapx) / Math.pow(10, 7),
        });
      }
      if (selectPointType === 'end') {
        setQueryData({
          ...Querydata,
          endQuery: selectedMarker.title,
        });
        setEndPoint({
          latitude: Number(selectedMarker.mapy) / Math.pow(10, 7),
          longitude: Number(selectedMarker.mapx) / Math.pow(10, 7),
        });
      }
    }
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView>
        {/* <View>
          <SearchInput queryData={Querydata} setQueryData={setQueryData} />
        </View> */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="출발지"
            value={Querydata.startQuery}
            onChangeText={(text) => handleChangQuery('startQuery', text)}
            onPressOut={() => setSelectQueryType(SelectQueryEnum.START)}
          />
          <TextInput
            style={styles.input}
            placeholder="목적지"
            value={Querydata.endQuery}
            onChangeText={(text) => handleChangQuery('endQuery', text)}
            onPressOut={() => setSelectQueryType(SelectQueryEnum.END)}
          />
        </View>
        <NaverMapView
          style={{ width: '100%', height: '60%' }}
          showsMyLocationButton={true}
          center={{ ...centerPoint, zoom: 14 }}
          //  onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
          //  onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
          onMapClick={(e) => console.log('onMapClick', JSON.stringify(e))}
        >
          {searchData.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(item.mapy) / Math.pow(10, 7),
                longitude: Number(item.mapx) / Math.pow(10, 7),
              }}
              pinColor="red"
              onClick={() => handleMarkerClick(item)}
              caption={{
                text: item.title.replace(/<\/?[^>]+(>|$)/g, ''),
                align: Align.Top,
              }}
            />
          ))}

          {RouteGPX && <Path coordinates={RouteGPX.BUS} color="#34447F" />}
          {RouteGPX && <Path coordinates={RouteGPX.WALK} color="#777" />}
          {RouteGPX && <Path coordinates={RouteGPX.SUBWAY} color="green" />}
          {RouteTaxiGpx && <Path coordinates={RouteTaxiGpx} color="#f57c2c" />}
        </NaverMapView>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', padding: 20 }}>
              <Text>이 위치로 설정 하시겠습니까?</Text>
              <Button title="네" onPress={handlePointClick} />
              <Button title="아니오" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <Button title="출발지 검색" onPress={() => handleGetGeoCode()} />

        <Button title="목적지 검색" onPress={() => handleGetGeoCode()} />

        <Button
          title="경로 탐색"
          onPress={() => {
            handleGetRoutePath();
          }}
        />

        <Button title="리스트" onPress={() => navigation.navigate('routeInfo')} />

        <Button title="경로테스트" onPress={() => getCood(PathData.option1)} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '75%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});
