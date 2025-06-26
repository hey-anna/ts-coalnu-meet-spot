import axios from 'axios';
import type { StationSubwayPathParams } from '../models/stationSubwayPath.request';
import type { StationSubwaySearchResult } from '../models/stationSubwayPath.response';

const API_KEY = import.meta.env.VITE_PUBLIC_TRANSPORT_API_KEY;

// 소요 시간 조회
export const getStationSubwayPath = async ({
  startX,
  startY,
  endX,
  endY,
}: StationSubwayPathParams) => {
  const url = 'https://api.odsay.com/v1/api/subwayPath';

  const { data } = await axios.get(url, {
    params: {
      apiKey: API_KEY,
      SX: startX,
      SY: startY,
      EX: endX,
      EY: endY,
      output: 'json',
    },
  });

  if (!data.result) {
    console.warn('Odsay API 응답에 result 없음:', data);
    throw new Error('경로 정보를 가져오지 못했습니다.');
  }

  return data.result;
};

// 역 이름 - 좌표 변환
export const getStationSubwayCoords = async (stationName: string) => {
  const cleanName = stationName.replace(/역$/, '');

  const url = 'https://api.odsay.com/v1/api/searchStation';

  const { data } = await axios.get(url, {
    params: {
      apiKey: API_KEY,
      stationName: cleanName,
      stationClass: 2, // 지하철만
      CID: 1000,
      output: 'json',
    },
  });

  const stations = data.result?.station;
  if (!stations || stations.length === 0) {
    throw new Error(`"${cleanName}"에 해당하는 역을 찾을 수 없습니다.`);
  }

  const exactMatch =
    stations.find(
      (s: StationSubwaySearchResult) => s.stationName === cleanName,
    ) ?? stations[0];

  return {
    name: exactMatch.stationName,
    x: parseFloat(exactMatch.x),
    y: parseFloat(exactMatch.y),
    stationID: Number(exactMatch.stationID),
  };
};

// stationID 기반 경로 조회용 함수
export const getStationSubwayPathByID = async ({
  startID,
  endID,
}: {
  startID: number;
  endID: number;
}) => {
  const url = 'https://api.odsay.com/v1/api/subwayPath';

  const { data } = await axios.get(url, {
    params: {
      apiKey: API_KEY,
      CID: 1000, // 수도권
      SID: startID,
      EID: endID,
      output: 'json',
    },
  });

  if (!data.result) {
    console.warn('Odsay API 응답에 result 없음:', data);
    throw new Error('경로 정보를 가져오지 못했습니다.');
  }

  return data.result;
};

export const searchSubwayStationByKeyword = async (
  keyword: string,
): Promise<StationSubwaySearchResult[]> => {
  const url = 'https://api.odsay.com/v1/api/searchStation';

  const { data } = await axios.get(url, {
    params: {
      apiKey: API_KEY,
      stationName: keyword,
      stationClass: 2, // 지하철역만 검색
      CID: 1000,
      output: 'json',
    },
  });

  console.log('Odsay 응답 데이터:', data);

  if (!data.result?.station) {
    throw new Error(`"${keyword}"에 대한 역 목록을 불러오지 못했습니다.`);
  }

  return data.result.station;
};
