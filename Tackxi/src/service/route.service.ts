import axios from 'axios';
import {
  RouteInfoListRes,
  RouteQuerySearchRes,
} from '../interface/http/response/route.response';
import { X_Naver_Client_Id } from '@env';
import { X_Naver_Client_Secret } from '@env';
import { SelectQueryEnum } from '../enum';
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
