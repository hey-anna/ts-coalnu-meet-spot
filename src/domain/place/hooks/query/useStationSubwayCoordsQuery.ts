import { useQuery } from '@tanstack/react-query';
import { getStationSubwayCoords } from '../../apis/stationSubwayApi';

export const useStationSubwayCoordsQuery = (stationName?: string) => {
  return useQuery({
    queryKey: ['station-subway-coords', stationName],
    queryFn: () => {
      if (!stationName) throw new Error('역 이름이 필요합니다.');
      return getStationSubwayCoords(stationName);
    },
    enabled: !!stationName, // stationName 있을 때만 호출
    staleTime: 1000 * 60 * 5,
  });
};
