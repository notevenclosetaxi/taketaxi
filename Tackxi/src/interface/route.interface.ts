export interface RouteQuery {
  startQuery: string;
  endQuery: string;
}

export interface RouteQueryRes {
  data?: any;
  searchData: object;
  centerPoint: {
    latitude: number;
    longitude: number;
  };
}

export interface LatLongType {
  latitude: number;
  longitude: number;
}
