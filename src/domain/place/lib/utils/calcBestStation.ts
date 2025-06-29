import {
  getStationSubwayCoords,
  getStationSubwayPathByID,
} from '../../apis/stationSubwayApi';
import type { Friend } from '@/domain/user/models/model';
import { calcSatisfactionScore } from './calcSatisfactionScore';

export type FriendWithFrom = Friend & { from: string };

export const getSafeStationName = (name: string) => {
  const trimmed = name?.trim();
  if (!trimmed) {
    console.warn('getSafeStationName - 빈 문자열 감지:', name);
    throw new Error('유효하지 않은 역 이름입니다!');
  }

  return trimmed
    .replace(/\(.*\)/g, '')
    .replace(/역$/, '')
    .replace(/\s+/g, '');
};

export const calcBestStation = async (
  selectedStations: string[],
  selectedFriends: FriendWithFrom[],
): Promise<string | null> => {
  // 후보 리스트 출력
  const filteredStations = selectedStations.filter(Boolean);
  const filteredFriends = selectedFriends.filter((f) => Boolean(f.from));

  if (
    !Array.isArray(selectedStations) ||
    typeof selectedStations[0] !== 'string'
  ) {
    console.warn('selectedStations가 string[]가 아닙니다:', selectedStations);
    return null;
  }

  const candidates = await Promise.all(
    selectedStations.map(async (stationName) => {
      try {
        // const to = await getStationSubwayCoords(stationName);
        const to = await getStationSubwayCoords(
          getSafeStationName(stationName),
        );
        const resultList = await Promise.all(
          filteredFriends.map(async (friend) => {
            const from = await getStationSubwayCoords(
              getSafeStationName(friend.from),
            );
            const result = await getStationSubwayPathByID({
              startID: from.stationID,
              endID: to.stationID,
            });

            const time = result.globalTravelTime ?? Infinity;
            const transferCount = result.driveInfoSet?.driveInfo
              ? result.driveInfoSet.driveInfo.length - 1
              : -1;

            const score = calcSatisfactionScore(time, transferCount);

            return {
              time: result.globalTravelTime ?? Infinity,
              transfers: transferCount,
            };
          }),
        );

        // const averageTime =
        //   resultList.reduce((sum, r) => sum + (r.time ?? 0), 0) /
        //   resultList.length;

        const averageScore =
          resultList.reduce((sum, r) => {
            const score = calcSatisfactionScore(r.time, r.transfers);
            return sum + score;
          }, 0) / resultList.length;
        return { stationName, averageScore };
      } catch (err) {
        console.warn(`역 ${stationName} 처리 중 오류`, err);
        return null;
      }
    }),
  );

  //   const validResults = candidates.filter(Boolean) as {
  //     stationName: string;
  //     averageTime: number;
  //   }[];
  const validResults = candidates.filter(Boolean) as {
    stationName: string;
    averageScore: number;
  }[];

  if (validResults.length === 0) {
    return null;
  }

  //   const best = validResults.reduce((a, b) =>
  //     a.averageTime < b.averageTime ? a : b,
  //   );

  const best = validResults.reduce(
    (a, b) => (a.averageScore > b.averageScore ? a : b), // 높은 점수가 더 좋은 것
  );

  return best.stationName;
};
