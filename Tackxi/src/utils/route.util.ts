import { LatLongType, Route, StationInfo } from '../interface';

export const getCoordinates = (testRoute1: Route, stationInfo: StationInfo) => {
  {
    let coordinates: Record<string, LatLongType[]> = { TAXI: [], BUS: [], WALK: [] };

    testRoute1.steps.forEach((step) => {
      step.stationList.map((station) => {
        if (stationInfo[station]) {
          coordinates[step.mode].push({
            latitude: Number(stationInfo[station].lat),
            longitude: Number(stationInfo[station].lon),
          });
        }
      });
    });
    return coordinates;
  }
};
