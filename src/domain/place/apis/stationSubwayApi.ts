import axios from 'axios';
import type { StationSubwayPathParams } from '../models/stationSubwayPath.request';
import type { StationSubwaySearchResult } from '../models/stationSubwayPath.response';

const API_KEY = import.meta.env.VITE_PUBLIC_TRANSPORT_API_KEY;

// 소요 시간 조회
// 지하철 경로 조회 (좌표 기반)
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

// stationID 기반 경로 조회용 함수
// 지하철 경로 조회 (역 ID 기반)
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

// 역 이름 - 좌표 변환
// 지하철역 이름 → 좌표 및 ID 변환
export const getStationSubwayCoords = async (stationName: string) => {
  // if (!stationName) {
  //   throw new Error('역 이름이 없습니다!');
  // }
  if (!stationName) {
    // 추가된 방어 처리
    console.warn('getStationSubwayCoords: stationName이 비어 있습니다.');
    throw new Error('역 이름이 없습니다!');
  }

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

  // 추가된 방어 처리
  if (
    !data?.result ||
    data.result.totalCount === 0 ||
    !Array.isArray(data.result.station) ||
    data.result.station.length === 0
  ) {
    console.warn(
      `getStationSubwayCoords: "${cleanName}" 에 대한 유효한 역 데이터가 없습니다.`,
      data.result,
    );
    throw new Error(`"${cleanName}"에 해당하는 역을 찾을 수 없습니다.`);
  }

  //
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

// 지하철역 키워드 검색
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

  // if (!data.result?.station) {
  //   throw new Error(`"${keyword}"에 대한 역 목록을 불러오지 못했습니다.`);
  // }

  if (!data.result || data.result.station.length === 0) {
    throw new Error('역 이름이 없습니다!');
  }

  return data.result.station;
};
