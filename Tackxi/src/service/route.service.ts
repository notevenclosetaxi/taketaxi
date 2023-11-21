import axios from 'axios';
import {
  RouteInfoListRes,
  RouteQuerySearchRes,
} from '../interface/http/response/route.response';
import { X_Naver_Client_Id } from '@env';
import { X_Naver_Client_Secret } from '@env';
import { SelectQueryEnum } from '../enums';
import { mock } from '../../mock';
import { LatLongType, Route, StationInfo } from '../interface';
const QuerySearchURL: string = 'https://openapi.naver.com/v1/search/local.json';

export const getGeoCode = async (
  query: string,
  selectQueryType: SelectQueryEnum
): Promise<RouteQuerySearchRes> => {
  const headers = {
    'X-Naver-Client-Id': `${X_Naver_Client_Id}`,
    'X-Naver-Client-Secret': `${X_Naver_Client_Secret}`,
  };

  try {
    const res: RouteQuerySearchRes = await axios.get(
      `${QuerySearchURL}?query=${query}&display=5&sort=random`,
      { headers }
    );

    return {
      searchData: res.data.items,
      centerPoint: {
        latitude: Number(res.data.items[0].mapy) / Math.pow(10, 7),
        longitude: Number(res.data.items[0].mapx) / Math.pow(10, 7),
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRouteList = () => {
  try {
    const res = mock;

    return {
      item: res.infoList.map((item, idx) => item),
      station: res.stationInfo,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRoutePath = async (startPoint: LatLongType, endPoint: LatLongType) => {
  const url = 'http://diligentp.com:8080/search';

  try {
    const res = await axios.get(
      `${url}/${startPoint?.latitude}/${startPoint?.longitude}/${endPoint?.latitude}/${endPoint?.longitude}`
    );

    return {
      data: res.data,
      busRoutes: res.data.busRoutes.bus,
      taxiRoutes: res.data.taxiRoutes.gpx.map((item, idx) => {
        return {
          latitude: Number(item[1]),
          longitude: Number(item[0]),
        };
      }),
      taxiData: res.data.taxiRoutes,
    };
  } catch (err) {
    if (axios.isAxiosError<any>(err)) {
      console.log('axios err', err.response);
    } else {
      console.log('err', err);
    }
  }
};
