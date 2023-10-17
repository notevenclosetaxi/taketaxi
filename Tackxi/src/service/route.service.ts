// service.ts

import axios from 'axios';
import { ApiResponse } from '../interface';
import { RouteQuerySearch } from '../interface/http/request/route.request';
import { RouteQuerySearchRes } from '../interface/http/response/route.respons';

const QuerySearchURL: string = 'https://openapi.naver.com/v1/search/local.json';

export const getGeoCode = async (
  query: string,
  selecQueryType: 'start' | 'end'
): Promise<RouteQuerySearchRes> => {
  const headers = {
    'X-Naver-Client-Id': 'O5tSyx_ROEO1JjJ3zK6Z',
    'X-Naver-Client-Secret': 'oWD2npmwvX',
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
