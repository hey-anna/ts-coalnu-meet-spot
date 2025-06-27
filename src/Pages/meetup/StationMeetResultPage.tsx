import { useEffect, useState } from 'react';
import { getStationSubwayCoords } from '../../domain/place/apis/stationSubwayApi';
import { getStationSubwayPathByID } from '../../domain/place/apis/stationSubwayApi';
import { Container, Grid, Stack } from '@mui/material';
import { useStationSubwaySearchQuery } from '@/domain/place/hooks/useStationSubwaySearchQuery';
import MeetHeader from '../../domain/place/ui/MeetHeader';
import MeetPointCard from '../../domain/place/ui/layout/MeetPointCard';
import MeetFriendsTimeCard from '../../domain/place/ui/layout/MeetFriendsTimeCard';
import MeetSearchForm from '../../domain/place/ui/layout/MeetSearchForm';
import { getSatisfactionEmoji } from '@/domain/place/lib/utils/getSatisfactionEmoji';

type StationCoords = {
  name: string;
  x: number;
  y: number;
  stationID: number;
  laneID?: string;
};

const StationTestPage = () => {
  const [keyword, setKeyword] = useState<string>(''); // 초기 검색어 없음
  const [selectedStationName, setSelectedStationName] = useState(''); // 초기 선택 없음
  const [results, setResults] = useState<
    { name: string; time: number | null; transfers: number }[]
  >([]);
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

        const friends = [
          { name: '지민', from: '강남' },
          { name: '수아', from: '잠실' },
          { name: '도윤', from: '종각' },
        ];

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
              transfers: transferCount, // 환슨 카운트
            };
          }),
        );

        setResults(resultList);
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
      <Grid container spacing={4} mt={3}>
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
    </Container>
  );
};

export default StationTestPage;
