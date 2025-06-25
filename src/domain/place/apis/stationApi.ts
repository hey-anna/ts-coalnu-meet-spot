import axios from 'axios';

const apiKey = import.meta.env.VITE_STATION_SEOUL_API_KEY;

export const getStationInfo = async (stationName: string) => {
  if (!stationName) throw new Error('역 이름이 필요합니다.');

  const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SearchInfoBySubwayNameService/1/5/${stationName}`;

  const response = await axios.get(url);
  return response.data;
};

export const getStationDistanceInfo = async (line: string, station: string) => {
  if (!line || !station) throw new Error('노선명과 역 이름이 필요합니다.');

  const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/StationDstncReqreTimeHm/1/100?SBW_ROUT_LN=${line}&SBW_STNS_NM=${station}`;
  const response = await axios.get(url);
  return response.data;
};
