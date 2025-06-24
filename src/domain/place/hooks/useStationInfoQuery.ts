import { useQuery } from '@tanstack/react-query';
import { getStationInfoByName } from '../apis/stationApi';
// import { getDistanceInMeters } from '../lib/geo';

export const useStationInfoQuery = (stationName: string) => {
  return useQuery({
    queryKey: ['stationInfo', stationName],
    queryFn: () => getStationInfoByName(stationName),
    enabled: !!stationName, // 빈값이면 실행 안 함
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
