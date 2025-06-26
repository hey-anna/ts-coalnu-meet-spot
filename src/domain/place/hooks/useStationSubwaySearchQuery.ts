import { useQuery } from '@tanstack/react-query';
import { searchSubwayStationByKeyword } from '../apis/stationSubwayApi';
import type { StationSubwaySearchResult } from '../models/stationSubwayPath.response';

export const useStationSubwaySearchQuery = (keyword?: string) => {
  return useQuery<StationSubwaySearchResult[]>({
    queryKey: ['search-subway-station', keyword],
    queryFn: () => {
      if (!keyword) throw new Error('검색 키워드가 필요합니다.');
      return searchSubwayStationByKeyword(keyword);
    },
    enabled: !!keyword,
    staleTime: 0,
  });
};
