import { useQuery } from '@tanstack/react-query';
import { getStationSubwayPathByID } from '../../apis/stationSubwayApi';
import type { StationSubwayPathResult } from '../../models/stationSubwayPath.response';

interface SubwayPathByIDParams {
  startID: number;
  endID: number;
}

export const useStationSubwayPathByIDQuery = (
  params?: SubwayPathByIDParams,
) => {
  return useQuery<StationSubwayPathResult>({
    queryKey: ['subway-path-by-ID', params],
    queryFn: () => {
      if (!params) throw new Error('파라미터가 필요합니다.');
      return getStationSubwayPathByID(params);
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });
};
