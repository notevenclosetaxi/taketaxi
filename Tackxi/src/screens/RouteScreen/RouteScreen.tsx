import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from 'react-native-nmap';
import axios from 'axios';
import { useState } from 'react';
import { RouteStackParamList } from '../../navigator/Stacks/RouteStack/RouteStack';

export const RouteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteStackParamList>>();

  const P0 = { latitude: 37.564362, longitude: 126.977011 };

  const [searchData, setSearchData] = useState([]);

  const [Querydata, setQueryData] = useState<{ startQuery: string; endQuery: string }>({
    startQuery: '',
    endQuery: '',
  });

  const handleChangQuery = (name: 'startQuery' | 'endQuery', text: string): void => {
    setQueryData({
      ...Querydata,
      [name]: text,
    });
  };

  const getGeoCode = async () => {
    const headers = {
      'X-Naver-Client-Id': 'O5tSyx_ROEO1JjJ3zK6Z',
      'X-Naver-Client-Secret': 'oWD2npmwvX',
    };
    const url: string = 'https://openapi.naver.com/v1/search/local.json';

    if (selecQueryType === 'start') {
      try {
        const res: any = await axios.get(
          `${url}?query=${Querydata.startQuery}&display=5&sort=random`,
          { headers }
        );
        setSearchData(res.data.items);
        setSelecPointType('start');
      } catch (err) {
        console.log(err);
      }
    }
    if (selecQueryType === 'end') {
      try {
        const res: any = await axios.get(
          `${url}?query=${Querydata.endQuery}&display=5&sort=random`,
          { headers }
        );
        setSearchData(res.data.items);
        setSelecPointType('end');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [startPoint, setStartPoint] = useState({});

  const [endPoint, setEndPoint] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [selecQueryType, setSelecQueryType] = useState<'start' | 'end'>('start');

  const [selecPointType, setSelecPointType] = useState<'start' | 'end'>('start');

  console.log(Querydata.startQuery, Querydata.endQuery);

  console.log(startPoint, endPoint);

  const handleMarkerClick = (item) => {
    item.title = item.title.replace(/<\/?[^>]+(>|$)/g, '');
    setSelectedMarker(item);
    setModalVisible(true);
  };

  const handlePointClick = () => {
    if (selectedMarker) {
      if (selecPointType === 'start') {
        setQueryData({
          ...Querydata,
          startQuery: selectedMarker.title,
        });
        setStartPoint({
          latitude: Number(selectedMarker.mapy) / Math.pow(10, 7),
          longitude: Number(selectedMarker.mapx) / Math.pow(10, 7),
        });
      }
      if (selecPointType === 'end') {
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
        <View>
          <TextInput
            style={styles.input}
            placeholder="출발지"
            value={Querydata.startQuery}
            onChangeText={(text) => handleChangQuery('startQuery', text)}
            onPressOut={() => setSelecQueryType('start')}
          />
          <TextInput
            style={styles.input}
            placeholder="목적지"
            value={Querydata.endQuery}
            onChangeText={(text) => handleChangQuery('endQuery', text)}
            onPressOut={() => setSelecQueryType('end')}
          />
        </View>
        <NaverMapView
          style={{ width: '100%', height: '60%' }}
          showsMyLocationButton={true}
          center={{ ...P0, zoom: 16 }}
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
            />
          ))}
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

        <Button title="출발지 검색" onPress={() => getGeoCode()} />

        <Button title="목적지 검색" onPress={() => getGeoCode()} />

        <Button title="경로 탐색" />
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
