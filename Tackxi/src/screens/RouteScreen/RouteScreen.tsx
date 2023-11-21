import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { useEffect, useMemo, useState } from 'react';
import { RouteStackParamList } from '../../navigator/Stacks/RouteStack/RouteStack';
import { LatLongType, RouteQuery, RouteQueryRes } from '../../interface';
import { getGeoCode, getRouteList, getRoutePath } from '../../service/route.service';
import { SelectQueryEnum } from '../../enums';
import { convertData, getCoordinates } from '../../utils/route.util';
import { SearchInput } from './SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { handleChangQuery } from '../../redux/features/map/querySlice';
import { Suggestion } from './components';
import { wait } from '../../utils/time.util';
import Animated from 'react-native-reanimated';
import { IconChevronDown, IconChevronUp } from 'tabler-icons-react-native';
import { delay } from '@reduxjs/toolkit/dist/utils';

export const RouteScreen: React.FC = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteStackParamList>>();
  const dispatch = useDispatch();

  const info = props.route.params && props.route.params.info;

  const gpxInfo = props.route.params && convertData(info.steps);

  const [centerPoint, setCenterPoint] = useState<LatLongType>({
    latitude: 37.5537438,
    longitude: 126.9697745,
  });

  const { startQuery, endQuery, selectQueryType } = useSelector(
    (state: RootState) => state.query
  );

  //검색 관련

  const [searchData, setSearchData] = useState<object>([]);

  const [Querydata, setQueryData] = useState<RouteQuery>({
    startQuery: '',
    endQuery: '',
  });

  const [PathData, setPathData] = useState<any>();

  const [TaxiData, setTaxiData] = useState<any>();

  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    info && setIsOpen(true);
  }, []);

  const handleIsOpen = () => {
    setIsOpen(!IsOpen);
  };

  const handleGetRoutePath = async () => {
    try {
      if (startPoint && endPoint) {
        const res = await getRoutePath(startPoint, endPoint);
        setPathData(res?.busRoutes);
        setTaxiData(res?.taxiData);
        console.log('suc');

        await wait(300);

        navigation.navigate('suggestion', {
          routeData: res?.busRoutes,
          TaxiData: res?.taxiData,
        });
      } else console.log('no data');
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetGeoCode = async () => {
    try {
      if (selectQueryType === 'startQuery') {
        const response = await getGeoCode(startQuery, selectQueryType);

        if (response && response.searchData && response.centerPoint) {
          setSearchData(response.searchData);
          setSelectPointType(selectQueryType);
          setCenterPoint(response.centerPoint);
        }
      }

      if (selectQueryType === 'endQuery') {
        const response = await getGeoCode(endQuery, selectQueryType);

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

  // const [selectQueryType, setSelectQueryType] = useState<SelectQueryEnum>(
  //   SelectQueryEnum.START
  // );

  const [selectPointType, setSelectPointType] = useState<SelectQueryEnum>(
    SelectQueryEnum.START
  );

  console.log(startQuery, endQuery);

  console.log('좌표', startPoint, endPoint);

  const handleMarkerClick = (item) => {
    item.title = item.title.replace(/<\/?[^>]+(>|$)/g, '');
    setSelectedMarker(item);
    setModalVisible(true);
  };

  const handlePointClick = () => {
    if (selectedMarker) {
      if (selectPointType === 'startQuery') {
        dispatch(handleChangQuery({ type: 'startQuery', text: selectedMarker.title }));

        setStartPoint({
          latitude: Number(selectedMarker.mapy) / Math.pow(10, 7),
          longitude: Number(selectedMarker.mapx) / Math.pow(10, 7),
        });
      }
      if (selectPointType === 'endQuery') {
        dispatch(handleChangQuery({ type: 'endQuery', text: selectedMarker.title }));

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
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <Text>이 위치로 설정 하시겠습니까?</Text>
            <Button title="네" onPress={handlePointClick} />
            <Button title="아니오" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <SearchInput />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Button title="검색" onPress={() => handleGetGeoCode()} />
        <Button
          title="경로 탐색"
          onPress={() => {
            handleGetRoutePath();
          }}
        />
      </View>
      <View style={styled(IsOpen).container}>
        <NaverMapView
          style={styled(IsOpen).map}
          showsMyLocationButton={true}
          center={{ ...centerPoint, zoom: 16 }}
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

          {gpxInfo && <Path coordinates={gpxInfo.BUS} color="#34447F" />}
          {gpxInfo && <Path coordinates={gpxInfo.WALK} color="#777" />}
          {gpxInfo && <Path coordinates={gpxInfo.SUBWAY} color="green" />}
          {gpxInfo && <Path coordinates={gpxInfo.TAXI} color="#f57c2c" />}
        </NaverMapView>

        <TouchableOpacity
          activeOpacity={1}
          onPress={handleIsOpen}
          style={styled(IsOpen).body}
        >
          <Animated.View>
            <View style={styled(IsOpen).bodyHeader}>
              {IsOpen ? <IconChevronDown /> : <IconChevronUp />}
            </View>
            {info && <Suggestion info={info} TaxiInfo={TaxiData} />}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styled = (isOpen: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '85%',
    },
    body: {
      position: 'absolute',
      width: '100%',
      height: isOpen ? 410 : 160,
      bottom: -20,
      transition: 'all 0.4s ease-out',
    },
    bodyHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 20,
      width: '100%',
      backgroundColor: 'white',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
    },
    icon: {
      position: 'absolute',
      top: 50,
      right: 20,
      zIndex: 9999,
    },
  });
