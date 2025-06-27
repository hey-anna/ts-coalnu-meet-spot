import React, { useEffect, useState } from 'react';
import { getStationSubwayCoords } from '../../domain/place/apis/stationSubwayApi';
import { getStationSubwayPathByID } from '../../domain/place/apis/stationSubwayApi';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useStationSubwaySearchQuery } from '@/domain/place/hooks/useStationSubwaySearchQuery';
import MeetHeader from '../../domain/place/ui/MeetHeader';
import MeetPointCard from '../../domain/place/ui/layout/MeetPointCard';
import MeetFriendsTimeCard from '../../domain/place/ui/layout/MeetFriendsTimeCard';
import MeetSearchForm from '../../domain/place/ui/layout/MeetSearchForm';
import { getSatisfactionEmoji } from '@/domain/place/lib/utils/getSatisfactionEmoji';
import KakaoMap from '@/domain/place/ui/layout/KakaoMap';
import { useFriendColorMap } from '@/domain/place/lib/utils/useFriendColorMap';
import FriendMarkerLegend from '@/domain/place/ui/layout/FriendMarkerLegend';

type StationCoords = {
  name: string;
  x: number;
  y: number;
  stationID: number;
  laneID?: string;
};

const StationMeetResultPage = () => {
  const friends = [
    { name: '지민', from: '강남' },
    { name: '수아', from: '잠실' },
    { name: '도윤', from: '종각' },
  ];

  const [keyword, setKeyword] = useState<string>(''); // 초기 검색어 없음
  const [selectedStationName, setSelectedStationName] = useState(''); // 초기 선택 없음
  const [results, setResults] = useState<
    { name: string; time: number | null; transfers: number }[]
  >([]);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null); // 역위치 좌표
  const [friendCoords, setFriendCoords] = useState<
    { name: string; x: number; y: number }[]
  >([]); // 친구들 위치 좌표

  // const [error, setError] = useState<string | null>(null);

  const { data: stationList = [] } = useStationSubwaySearchQuery(keyword);
  console.log('stationList', stationList);
  useEffect(() => {
    if (!selectedStationName) return;

    const fetchTimes = async () => {
      try {
        // setError(null);

        const to: StationCoords =
          await getStationSubwayCoords(selectedStationName);

        const resultList = await Promise.all(
          friends.map(async (friend) => {
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
        console.error('에러 발생:', err);
        // setError('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchTimes();
  }, [selectedStationName]);

  useEffect(() => {
    // 검색결과에서 현재 선택한 값이 없으면 선택값 초기화
    if (!stationList.find((s) => s.stationName === selectedStationName)) {
      setSelectedStationName('');
    }
    console.log('불러온 역 리스트:', stationList);
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

  const averageTime =
    results.length > 0
      ? Math.round(
          results.reduce((sum, cur) => sum + (cur.time ?? 0), 0) /
            results.length,
        )
      : null;

  const averageTransferCount =
    results.length > 0
      ? Math.round(
          results.reduce((sum, cur) => sum + (cur.transfers ?? 0), 0) /
            results.length,
        )
      : null;

  const satisfactionRate = getSatisfactionEmoji(
    averageTime,
    averageTransferCount,
  );

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
                friends.find((fr) => fr.name === f.name)?.from ?? '알 수 없음',
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
