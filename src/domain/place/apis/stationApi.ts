import axios from 'axios';

const apiKey = import.meta.env.VITE_STATION_SEOUL_API_KEY;

export const getStationInfoByName = async (stationName: string) => {
  if (!stationName) throw new Error('역 이름이 필요합니다.');

  const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SearchInfoBySubwayNameService/1/5/${stationName}`;

  const response = await axios.get(url);
  return response.data;
};
