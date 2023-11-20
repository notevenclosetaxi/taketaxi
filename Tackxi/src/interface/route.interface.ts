import { ModeEnum } from '../enums';

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

export interface Route {
  steps: Step[];
}

export interface SuggestResponse {
  location: Location;
  stationInfo: StationInfo;
  infoList: Info[];
}

export interface Location {
  start: string;
  end: string;
}

export interface StationInfo {
  [property: string]: {
    lon: string;
    lat: string;
    stationId: string | null;
  };
}

export interface Info {
  summary: {
    taxiFare: number;
    wastedTime: number;
    savedTime: number;
    savedMoney: number;
  };
  steps: Step[];
}

// export interface Step {
//   mode: ModeEnum;
//   sectionTime: number;
//   route: null | string;
//   routeId: null | string;
//   stationList: string[];
// }

export interface Step {
  mode: string;
  route: string;
  startName: string;
  endName: string;
  spendTime: number;
  gpx: string[][];
}

export interface Option {
  step0: Step;
  step1: Step;
  step2: Step;
  step3: Step;
}

export interface SuggestionProps {
  info: Option[];
}

export interface TaxiInfo {
  ['taxiFare(won)']: number;
  ['spendTime(Sec)']: number;
  ['distance(m)']: number;
  gpx: string[][];
  costPerDistance: number;
}
