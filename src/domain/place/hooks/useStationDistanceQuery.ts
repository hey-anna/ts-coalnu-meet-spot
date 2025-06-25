import { useQuery } from '@tanstack/react-query';
import { getStationDistanceInfo } from '../apis/stationApi';

export const useStationDistanceQuery = (line: string, station: string) => {
  return useQuery({
    queryKey: ['stationDistance', line, station],
    queryFn: () => getStationDistanceInfo(line, station),
    enabled: !!line && !!station,
    staleTime: 1000 * 60 * 5,
  });
};
