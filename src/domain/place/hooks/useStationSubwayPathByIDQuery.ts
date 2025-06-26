import { useQuery } from '@tanstack/react-query';
import { getStationSubwayPathByID } from '../apis/stationSubwayApi';
import type { SubwayPathResult } from '../models/stationSubwayPath.response';

interface SubwayPathByIDParams {
  startID: number;
  endID: number;
}

export const useSubwayPathByIDQuery = (params?: SubwayPathByIDParams) => {
  return useQuery<SubwayPathResult>({
    queryKey: ['subway-path-by-ID', params],
    queryFn: () => {
      if (!params) throw new Error('파라미터가 필요합니다.');
      return getStationSubwayPathByID(params);
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });
};
