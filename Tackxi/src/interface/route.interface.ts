export interface RouteQuery {
  startQuery: string;
  endQuery: string;
}

export interface RouteQueryRes {
  data?: any;
  searchData?: object;
  centerPoint?: object;
  latitude?: number;
  longitude?: number;
}
