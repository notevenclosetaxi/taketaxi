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

export interface RouteInfoRes {
  data?: any;
  InfoList: object;
}

export interface Step {
  stationList: string[];
  mode: string;
}

export interface Route {
  steps: Step[];
}

export interface StationInfo {
  [key: string]: {
    lat: string;
    lon: string;
  };
}
