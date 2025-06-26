import { useQuery } from '@tanstack/react-query';
import type { StationSubwayPathParams } from '../models/stationSubwayPath.request';
import type { StationSubwayPathResult } from '../models/stationSubwayPath.response';
import { getStationSubwayPath } from '../apis/stationSubwayApi';

export const useStationSubwayPathQuery = (params?: StationSubwayPathParams) => {
  return useQuery<StationSubwayPathResult>({
    queryKey: ['station-subway-path', params],
    queryFn: () => {
      if (!params) throw new Error('params is required');
      return getStationSubwayPath(params);
    },
    enabled: !!params, // 파라미터 있을 때만 요청
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
