import React, { useEffect, useState } from 'react';
import { getStationSubwayCoords } from '../../domain/place/apis/stationSubwayApi';
import { getStationSubwayPathByID } from '../../domain/place/apis/stationSubwayApi';
import { Container, Grid, Stack, Alert, Typography, Box } from '@mui/material';
import MeetHeader from '../../domain/place/ui/MeetHeader';
import MeetPointCard from '../../domain/place/ui/layout/MeetPointCard';
import MeetFriendsTimeCard from '../../domain/place/ui/layout/MeetFriendsTimeCard';
import { useLocation, useNavigate } from 'react-router';
import type { Friend } from '../../domain/user/models/model';

type StationCoords = {
  name: string;
  x: number;
  y: number;
  stationID: number;
  laneID?: string;
};

const StationMeetResultPage = () => {
  const [results, setResults] = useState(
    [] as { name: string; time: number | null; station: string }[],
  );
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 메인에서 받은 데이터
  const { selectedFriends, selectedStations } = location.state || {};

  console.log('받은 친구 데이터:', selectedFriends);
  console.log('받은 역 데이터:', selectedStations);

  // 데이터가 없을 때 메인으로 돌려보내기
  useEffect(() => {
    if (
      !selectedFriends ||
      !selectedStations ||
      selectedFriends.length === 0 ||
      selectedStations.length === 0
    ) {
      alert('친구와 지하철역을 선택해주세요!');
      navigate('/'); // 메인 페이지로 돌아가기
    }
  }, [selectedFriends, selectedStations, navigate]);

  // 모든 역에 대해 각 친구의 이동 시간 계산
  useEffect(() => {
    if (
      !selectedFriends ||
      !selectedStations ||
      selectedFriends.length === 0 ||
      selectedStations.length === 0
    ) {
      return;
    }

    const calculateAllTimes = async () => {
      setIsLoading(true);
      try {
        const allResults: {
          name: string;
          time: number | null;
          station: string;
        }[] = [];

        // 각 역에 대해 계산
        for (const station of selectedStations) {
          try {
            const to: StationCoords = await getStationSubwayCoords(station);

            // 각 친구의 이동 시간 계산
            const stationResults = await Promise.all(
              selectedFriends.map(async (friend: Friend) => {
                try {
                  const from = await getStationSubwayCoords(
                    friend.start_station,
                  );
                  console.log('from:', friend.name, from.stationID);
                  console.log('to:', station, to.stationID);

                  const result = await getStationSubwayPathByID({
                    startID: from.stationID,
                    endID: to.stationID,
                  });

                  return {
                    name: friend.name,
                    time: result.globalTravelTime,
                    station: station,
                  };
                } catch (friendError) {
                  console.error(
                    `${friend.name}의 ${station}역까지 경로 계산 오류:`,
                    friendError,
                  );
                  return {
                    name: friend.name,
                    time: null,
                    station: station,
                  };
                }
              }),
            );

            allResults.push(...stationResults);
          } catch (stationError) {
            console.error(`${station}역 좌표 조회 오류:`, stationError);
            // 해당 역에 대해 모든 친구의 시간을 null로 설정
            selectedFriends.forEach((friend: Friend) => {
              allResults.push({
                name: friend.name,
                time: null,
                station: station,
              });
            });
          }
        }

        setResults(allResults);
      } catch (err) {
        console.error('전체 계산 중 에러 발생:', err);
      } finally {
        setIsLoading(false);
      }
    };

    calculateAllTimes();
  }, [selectedFriends, selectedStations]);

  // 역별로 결과 그룹화
  const getResultsByStation = (station: string) => {
    return results.filter((result) => result.station === station);
  };

  // 역별 평균 시간 계산
  const getAverageTimeForStation = (station: string) => {
    const stationResults = getResultsByStation(station);
    const validTimes = stationResults.filter((r) => r.time !== null);

    if (validTimes.length === 0) return null;

    return Math.round(
      validTimes.reduce((sum, cur) => sum + (cur.time ?? 0), 0) /
        validTimes.length,
    );
  };

  // 데이터가 없으면 로딩 또는 에러 표시
  if (!selectedFriends || !selectedStations) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <MeetHeader />

      {/* 선택된 정보 요약 */}
      <Box sx={{ mb: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            선택된 정보
          </Typography>
          <Typography variant="body2">
            <strong>친구들:</strong>{' '}
            {selectedFriends
              .map((f: Friend) => `${f.name}(${f.start_station})`)
              .join(', ')}
          </Typography>
          <Typography variant="body2">
            <strong>후보 장소:</strong> {selectedStations.join(', ')}
          </Typography>
        </Alert>
      </Box>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>이동 시간을 계산하는 중입니다...</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {selectedStations.map((station: string) => (
            <Grid key={station} size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <MeetPointCard
                  selectedStationName={station}
                  averageTime={getAverageTimeForStation(station)}
                />
                {/* <MeetFriendsTimeCard 
                  results={getResultsByStation(station).map(r => ({
                    name: r.name,
                    time: r.time
                  }))}
                /> */}
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default StationMeetResultPage;
