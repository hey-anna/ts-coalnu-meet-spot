import { useEffect, useState } from 'react';
import { getStationSubwayCoords } from '../../domain/place/apis/stationSubwayApi';
import { getStationSubwayPathByID } from '../../domain/place/apis/stationSubwayApi';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useStationSubwaySearchQuery } from '@/domain/place/hooks/query/useStationSubwaySearchQuery';
import MeetHeader from '../../domain/place/ui/MeetHeader';
import MeetPointCard from '../../domain/place/ui/layout/MeetPointCard';
import MeetFriendsTimeCard from '../../domain/place/ui/layout/MeetFriendsTimeCard';
import MeetSearchForm from '../../domain/place/ui/layout/MeetSearchForm';
import { getSatisfactionEmoji } from '@/domain/place/lib/utils/getSatisfactionEmoji';
import KakaoMap from '@/domain/place/ui/layout/KakaoMap';
import { useFriendColorMap } from '@/domain/place/lib/utils/useFriendColorMap';
import FriendMarkerLegend from '@/domain/place/ui/layout/FriendMarkerLegend';
import type { Friend } from '@/domain/user/models/model';
import { useInitMeetupStateFromRoute } from '@/domain/place/hooks/route/useInitMeetupStateFromRoute';
import { calcBestStation } from '@/domain/place/lib/utils/calcBestStation';

type StationCoords = {
  name: string;
  x: number;
  y: number;
  stationID: number;
  laneID?: string;
};

type FriendWithFrom = Friend & { from: string };
const StationMeetResultPage = () => {
  // const friends = [
  //   { name: '지민', from: '강남' },
  //   { name: '수아', from: '잠실' },
  //   { name: '도윤', from: '종각' },
  // ];

  const [keyword, setKeyword] = useState<string>(''); // 초기 검색어 없음
  const [selectedStationName, setSelectedStationName] = useState(''); // 초기 선택 없음
  const [results, setResults] = useState<
    { name: string; time: number | null; transfers: number }[]
  >([]);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null); // 역위치 좌표
  const [friendCoords, setFriendCoords] = useState<
    { name: string; x: number; y: number }[]
  >([]); // 친구들 위치 좌표

  const [selectedStations, setSelectedStations] = useState<string[]>([]); // 후보군 리스트 (지도 확장 대비, 현재는 미사용) - 예) 3개의 후보군 위치 상태 저장
  const [selectedFriends, setSelectedFriends] = useState<FriendWithFrom[]>([]);
  useInitMeetupStateFromRoute(setSelectedStations, setSelectedFriends);
  // const [error, setError] = useState<string | null>(null);

  const { data: stationList = [] } = useStationSubwaySearchQuery(
    keyword || ' ',
  );
  console.log('stationList', stationList);

  useEffect(() => {
    if (!selectedStationName || selectedFriends.length === 0) return;

    // stationList를 사용하는 부분에서만 아래처럼 방어처리
    if (stationList.length === 0) {
      console.warn('stationList가 비어 있어 추천역 매칭을 건너뜁니다.');
      return;
    }

    const fetchDetailedResults = async () => {
      try {
        // setError(null);
        const matchedStation = stationList.find(
          (s) => s.stationName === selectedStationName,
        );

        if (!matchedStation) {
          console.warn(
            'stationList에서 추천된 역 이름을 찾지 못했습니다:',
            selectedStationName,
          );
          return;
        }

        const to: StationCoords = await getStationSubwayCoords(
          matchedStation.stationName,
        ); // or matchedStation.name;

        // const to: StationCoords =
        //   await getStationSubwayCoords(selectedStationName);

        const resultList = await Promise.all(
          selectedFriends.map(async (friend) => {
            const from = await getStationSubwayCoords(friend.from);
            console.log('from:', friend.name, from.stationID);
            console.log('to:', to.stationID);
            const result = await getStationSubwayPathByID({
              startID: from.stationID,
              endID: to.stationID,
            });

            // 환승 결과
            console.log(`${friend.name} 경로 결과:`, result);
            console.log(`driveInfoSet (${friend.name}):`, result.driveInfoSet);

            const transferCount = result.driveInfoSet?.driveInfo
              ? result.driveInfoSet.driveInfo.length - 1
              : -1;

            return {
              name: friend.name,
              time: result.globalTravelTime,
              transfers: transferCount, // 환승 카운트
              x: from.x,
              y: from.y,
            };
          }),
        );

        // setResults(resultList);
        setResults(
          resultList.map(({ name, time, transfers }) => ({
            name,
            time,
            transfers,
          })),
        );

        // 친구들 좌표 저장
        setFriendCoords(
          resultList.map(({ name, x, y }) => ({
            name,
            x,
            y,
          })),
        );
      } catch (err) {
        console.error('추천역 기준 결과 계산 실패:', err);
      }
    };

    // fetchTimes();
    fetchDetailedResults();
  }, [selectedStationName, selectedFriends]);

  // 기존 코드 주석처리
  // useEffect(() => {
  //   // 검색결과에서 현재 선택한 값이 없으면 선택값 초기화
  //   if (!stationList.find((s) => s.stationName === selectedStationName)) {
  //     setSelectedStationName('');
  //   }
  //   console.log('불러온 역 리스트:', stationList);
  // }, [stationList, selectedStationName]);

  useEffect(() => {
    if (!selectedStationName) return;

    // stationList가 아직 도착 안한 상태면 selectedStationName 유지
    const matched = stationList.find(
      (s) => s.stationName === selectedStationName,
    );

    if (!matched && stationList.length > 0) {
      console.log('stationList에 추천역 없음 (아직 로딩 중이거나 누락)');
      // setSelectedStationName('');  // 이 줄 주석처리 또는 제거!
    }
  }, [stationList, selectedStationName]);

  // 지도용 좌표 요청
  useEffect(() => {
    if (!selectedStationName) {
      setCoords(null);
      return;
    }

    const fetchCoords = async () => {
      try {
        const result = await getStationSubwayCoords(selectedStationName);
        setCoords({ x: result.x, y: result.y });
      } catch (err) {
        console.error('지도 좌표 가져오기 실패:', err);
        setCoords(null);
      }
    };

    fetchCoords();
  }, [selectedStationName]);

  // 자동 추천역 선정용 추가
  useEffect(() => {
    console.log('추천 계산 진입 selectedFriends:', selectedFriends);
    console.log('추천 계산 진입 selectedStations:', selectedStations);
    // if (selectedStations.length === 0 || selectedFriends.length === 0) return;
    if (selectedStations.length === 0 || selectedFriends.length === 0) {
      console.log('조건 부족 - 추천 계산 보류');
      return;
    }

    // 🔍 로그 추가
    console.log('selectedStations raw:', selectedStations);
    console.log('typeof:', typeof selectedStations[0]);
    console.log('JSON:', JSON.stringify(selectedStations[0]));

    type StationItem =
      | string
      | { stationName?: string; name?: string }
      | string[];

    const stationNames: string[] = selectedStations.flatMap(
      (s: StationItem, i) => {
        if (typeof s === 'string') return [s.trim()];
        if (Array.isArray(s)) {
          return s.map((item) =>
            typeof item === 'string' ? item.trim() : JSON.stringify(item),
          );
        }
        const name = s?.stationName || s?.name;
        if (!name) {
          console.warn(`[${i}] 역 이름 없음:`, JSON.stringify(s));
          return [];
        }
        return [name.trim()];
      },
    );

    console.log('최종 처리할 stationNames:', stationNames); // 문자열 배열인지 확인

    const run = async () => {
      // const best = await calcBestStation(selectedStations, selectedFriends);
      const best = await calcBestStation(stationNames, selectedFriends);
      if (best) {
        console.log('추천된 역 계산 완료:', best);
        setSelectedStationName(best);
      } else {
        console.log('추천 실패 or 빈값 반환');
      }
    };

    // 마운트 이후 약간 지연시켜도 안정성 ↑
    setTimeout(run, 100); // or requestIdleCallback(run);
  }, [
    selectedStations,
    selectedFriends,
    //  selectedStationName,
    stationList,
  ]);

  // 평균 시간
  const averageTime =
    results.length > 0
      ? Math.round(
          results.reduce((sum, cur) => sum + (cur.time ?? 0), 0) /
            results.length,
        )
      : null;

  // 평균 환승 횟수
  const averageTransferCount =
    results.length > 0
      ? Math.round(
          results.reduce((sum, cur) => sum + (cur.transfers ?? 0), 0) /
            results.length,
        )
      : null;

  // 이모지 표시
  const satisfactionRate = getSatisfactionEmoji(
    averageTime,
    averageTransferCount,
  );

  // 지도 위 컬러 표시
  const friendsColorMap = useFriendColorMap(friendCoords);

  return (
    <Container sx={{ py: 4 }}>
      <MeetHeader />
      <MeetSearchForm
        keyword={keyword}
        onKeywordChange={(e) => setKeyword(e.target.value)}
        selectedStationName={selectedStationName}
        onStationSelect={(e) => setSelectedStationName(e.target.value)}
        stationList={stationList}
      />
      <Grid container spacing={4} mt={3} mb={3}>
        {/* 왼쪽: 장소 정보 + 친구 이동 시간 */}
        <Grid
          size={{
            xs: 12,
            //  md: 8
          }}
        >
          <Stack spacing={3}>
            <MeetPointCard
              selectedStationName={selectedStationName}
              averageTime={averageTime}
              averageTransferCount={averageTransferCount}
              satisfactionRate={satisfactionRate}
            />
            <MeetFriendsTimeCard results={results} />
          </Stack>
        </Grid>
        {/* 오른쪽: 추천 리스트 */}
        {/* <Grid size={{ xs: 12, md: 4 }}></Grid> */}
      </Grid>
      {coords ? (
        <KakaoMap
          latitude={coords.y}
          longitude={coords.x}
          markers={friendCoords.map((f) => ({
            lat: f.y,
            lng: f.x,
            label: f.name,
            color: friendsColorMap[f.name],
          }))}
        >
          <FriendMarkerLegend
            friends={friendCoords.map((f) => ({
              name: f.name,
              from:
                selectedFriends.find((fr) => fr.name === f.name)?.from ??
                '알 수 없음',
              color: friendsColorMap[f.name],
            }))}
          />
        </KakaoMap>
      ) : (
        <Box
          sx={{
            height: 400,
            borderRadius: 2,
            backgroundColor: '#e9edf2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          📍 목적지를 먼저 선택해주세요
        </Box>
      )}
    </Container>
  );
};

export default StationMeetResultPage;
