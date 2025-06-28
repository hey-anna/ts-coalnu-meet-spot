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
  console.log('selectedStations:', selectedStations);
  const filteredStations = selectedStations.filter(Boolean);
  const filteredFriends = selectedFriends.filter((f) => Boolean(f.from));

  console.log('필터링된 selectedStations:', filteredStations);
  console.log('필터링된 selectedFriends:', filteredFriends);

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
            // console.log(`[${friend}] 처리 중인 역 이름:`, stationName);
            console.log(
              `친구 이름: ${friend.name}, 출발역: ${friend.from}, 도착역: ${stationName}`,
            );

            // const from = await getStationSubwayCoords(friend.from);
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

            // console.log(`역 "${stationName}" 평균 계산 중...`);
            console.log(
              `[${stationName}] ${friend.name} 경로`,
              `출발: ${friend.from}, 도착: ${stationName},`,
              `시간: ${time}분,
                환승: ${transferCount}회, 점수: ${score.toFixed(2)}`,
            );
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
        console.log(
          `[${stationName}] 평균 만족도 점수: ${averageScore.toFixed(2)}`,
        );
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
    console.log('유효한 후보 결과 없음');
    return null;
  }

  //   const best = validResults.reduce((a, b) =>
  //     a.averageTime < b.averageTime ? a : b,
  //   );

  const best = validResults.reduce(
    (a, b) => (a.averageScore > b.averageScore ? a : b), // 높은 점수가 더 좋은 것
  );

  console.log('추천된 역 계산 완료:', best);
  return best.stationName;
};
