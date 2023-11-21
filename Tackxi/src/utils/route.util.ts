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

export const convertData = (infodata) => {
  const result = {};

  infodata.forEach((item) => {
    const { mode, gpx } = item;
    result[mode] = gpx.map((cood) => ({
      latitude: Number(cood[1]),
      longitude: Number(cood[0]),
    }));
  });

  return result;
};
