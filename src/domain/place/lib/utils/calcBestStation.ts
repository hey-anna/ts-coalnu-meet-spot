import {
  getStationSubwayCoords,
  getStationSubwayPathByID,
} from '../../apis/stationSubwayApi';
import type { Friend } from '@/domain/user/models/model';

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

            const transferCount = result.driveInfoSet?.driveInfo
              ? result.driveInfoSet.driveInfo.length - 1
              : -1;
            // console.log('처리 중인 역 이름:', stationName);
            console.log(`역 "${stationName}" 평균 계산 중...`);
            return {
              time: result.globalTravelTime ?? Infinity,
              transfers: transferCount,
            };
          }),
        );

        const averageTime =
          resultList.reduce((sum, r) => sum + (r.time ?? 0), 0) /
          resultList.length;

        return { stationName, averageTime };
      } catch (err) {
        console.warn(`역 ${stationName} 처리 중 오류`, err);
        return null;
      }
    }),
  );

  const validResults = candidates.filter(Boolean) as {
    stationName: string;
    averageTime: number;
  }[];

  if (validResults.length === 0) {
    console.log('유효한 후보 결과 없음');
    return null;
  }

  const best = validResults.reduce((a, b) =>
    a.averageTime < b.averageTime ? a : b,
  );

  console.log('추천된 역 계산 완료:', best);
  return best.stationName;
};
