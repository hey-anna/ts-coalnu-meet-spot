import React, { useEffect, useState } from 'react';
import { getStationSubwayCoords } from '../../domain/place/apis/stationSubwayApi';
import { getStationSubwayPathByID } from '../../domain/place/apis/stationSubwayApi';
import {
  Box,
  Container,
  Grid,
  Stack,
  Alert,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import MeetHeader from '../../domain/place/ui/MeetHeader';
import MeetPointCard from '../../domain/place/ui/layout/MeetPointCard';
import MeetFriendsTimeCard from '../../domain/place/ui/layout/MeetFriendsTimeCard';
import { getSatisfactionEmoji } from '@/domain/place/lib/utils/getSatisfactionEmoji';
import KakaoMap from '@/domain/place/ui/layout/KakaoMap';
import { useFriendColorMap } from '@/domain/place/lib/utils/useFriendColorMap';
import FriendMarkerLegend from '@/domain/place/ui/layout/FriendMarkerLegend';
import type { Friend } from '../../domain/user/models/model';
import { useUserStore } from '../../domain/user/store/userStore.ts'; // 실제 store import
import RecommendResultInfo from '@/domain/recommendation/ui/recommendResult/recommendResultInfo.tsx';
import { RecommendSideBar } from '../../domain/recommendation/store/store';

// 스타일 변수 - 모바일 최적화
const containerStyle = {
  py: { xs: 2, sm: 4 },
  px: { xs: 1, sm: 3 },
};
const alertStyle = {
  mb: { xs: 1.5, sm: 2 },
};
const alertTitleStyle = {
  fontWeight: 600,
  mb: { xs: 0.5, sm: 1 },
  fontSize: { xs: '1rem', sm: '1.125rem' },
};
const alertBodyStyle = {
  fontSize: { xs: '0.875rem', sm: '1rem' },
};
const loadingBoxStyle = {
  textAlign: 'center',
  py: { xs: 3, sm: 4 },
};
const mapPlaceholderStyle = {
  height: { xs: 300, sm: 400 },
  borderRadius: 2,
  backgroundColor: '#e9edf2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#999',
  fontSize: { xs: 14, sm: 16 },
  fontWeight: 500,
  mx: { xs: -1, sm: 0 },
};
const mapContainerStyle = {
  height: { xs: 300, sm: 400 },
  borderRadius: 2,
  overflow: 'hidden',
  mx: { xs: -1, sm: 0 },
};
const gridSpacing = { xs: 2, sm: 4 };
const stackSpacing = { xs: 0, sm: 3 };
const marginTop = { xs: 2, sm: 3 };
const marginBottom = { xs: 2, sm: 3 };
const successAlertStyle = {
  mb: { xs: 1.5, sm: 2 },
  mx: { xs: -0.5, sm: 0 },
};

type StationCoords = {
  name: string;
  x: number;
  y: number;
  stationID: number;
  laneID?: string;
};

// 참가자 타입 정의
type ParticipantInfo = {
  name: string;
  start_station: string;
};

type CalculationResult = {
  name: string;
  time: number | null;
  transfers: number;
  stationCount: number;
  station: string;
  transferCount: number; // 환승 횟수
  x: number;
  y: number;
};

const StationMeetResultPage = () => {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStationCoords, setSelectedStationCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [friendCoords, setFriendCoords] = useState<
    { name: string; x: number; y: number }[]
  >([]);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 모바일 체크

  // zustand store에서 내 정보 가져오기
  const { user } = useUserStore();
  const { setStationRecommend, clearStationRecommend } = RecommendSideBar();

  // 메인에서 받은 데이터
  const { selectedFriends, selectedStations } = location.state || {};

  // 내 정보를 포함한 전체 사용자 리스트 생성
  const allParticipants = React.useMemo(() => {
    const participants: ParticipantInfo[] = [...(selectedFriends || [])];

    // 로그인된 사용자 정보가 있고, 출발역 정보가 있으면 추가
    if (user?.user_name && user?.user_start_station) {
      participants.push({
        name: user.user_name,
        start_station: user.user_start_station,
      });
    }

    return participants;
  }, [selectedFriends, user]);

  console.log('받은 친구 데이터:', selectedFriends);
  console.log('받은 역 데이터:', selectedStations);
  console.log('내 정보:', user);
  console.log('전체 참가자:', allParticipants);

  // 데이터가 없을 때 메인으로 돌려보내기
  useEffect(() => {
    if (
      !selectedStations ||
      selectedStations.length === 0 ||
      allParticipants.length === 0
    ) {
      alert('참가자와 지하철역을 선택해주세요!');
      navigate('/');
    }
  }, [allParticipants, selectedStations, navigate]);

  // 모든 역에 대해 각 참가자의 이동 시간 계산
  useEffect(() => {
    if (
      !selectedStations ||
      selectedStations.length === 0 ||
      allParticipants.length === 0
    ) {
      return;
    }

    const calculateAllTimes = async () => {
      setIsLoading(true);
      try {
        const allResults: CalculationResult[] = [];
        const allParticipantCoords: { name: string; x: number; y: number }[] =
          [];

        // 각 역에 대해 계산
        for (const station of selectedStations) {
          try {
            const to: StationCoords = await getStationSubwayCoords(station);

            // 각 참가자의 이동 시간 계산
            const stationResults = await Promise.all(
              allParticipants.map(async (participant: ParticipantInfo) => {
                try {
                  const from = await getStationSubwayCoords(
                    participant.start_station,
                  );
                  console.log('from:', participant.name, from.stationID);
                  console.log('to:', station, to.stationID);

                  // 출발역과 목적지가 같은 경우 API 호출 없이 0으로 처리
                  if (participant.start_station === station) {
                    console.log(
                      `${participant.name} - 같은 역이므로 이동시간 0분`,
                    );

                    // 참가자 좌표 저장 (중복 방지)
                    if (
                      !allParticipantCoords.find(
                        (coord) => coord.name === participant.name,
                      )
                    ) {
                      allParticipantCoords.push({
                        name: participant.name,
                        x: from.x,
                        y: from.y,
                      });
                    }

                    return {
                      name: participant.name,
                      time: 0,
                      transfers: 0,
                      stationCount: 0,
                      station: station,
                      transferCount: 0,
                      x: from.x,
                      y: from.y,
                    };
                  }

                  const result = await getStationSubwayPathByID({
                    startID: from.stationID,
                    endID: to.stationID,
                  });
                  // 환승 횟수 계산
                  const transferCount = result.driveInfoSet?.driveInfo
                    ? result.driveInfoSet.driveInfo.length - 1
                    : -1;
                  console.log(`${participant.name} 경로 결과:`, result);
                  console.log(
                    `globalStationCount (${participant.name}):`,
                    result.globalStationCount,
                  );

                  // 참가자 좌표 저장 (중복 방지)
                  if (
                    !allParticipantCoords.find(
                      (coord) => coord.name === participant.name,
                    )
                  ) {
                    allParticipantCoords.push({
                      name: participant.name,
                      x: from.x,
                      y: from.y,
                    });
                  }

                  return {
                    name: participant.name,
                    time: result.globalTravelTime,
                    transfers: transferCount,
                    stationCount: result.globalStationCount,
                    station: station,
                    transferCount,
                    x: from.x,
                    y: from.y,
                  };
                } catch (participantError) {
                  console.error(
                    `${participant.name}의 ${station}역까지 경로 계산 오류:`,
                    participantError,
                  );
                  return {
                    name: participant.name,
                    time: null,
                    transfers: -1,
                    stationCount: -1,
                    station: station,
                    transferCount: -1,
                    x: 0,
                    y: 0,
                  };
                }
              }),
            );

            allResults.push(...stationResults);
          } catch (stationError) {
            console.error(`${station}역 좌표 조회 오류:`, stationError);
            allParticipants.forEach((participant: ParticipantInfo) => {
              allResults.push({
                name: participant.name,
                time: null,
                transfers: -1,
                stationCount: -1,
                station: station,
                transferCount: -1,
                x: 0,
                y: 0,
              });
            });
          }
        }

        setResults(allResults);
        setFriendCoords(allParticipantCoords);

        // 계산 완료 후 최적의 역 찾기
        let bestStation = null;
        let minMaxTime = Infinity;

        for (const station of selectedStations) {
          const stationResults = allResults.filter(
            (r) => r.station === station,
          );
          const validTimes = stationResults.filter((r) => r.time !== null);

          if (validTimes.length > 0) {
            const maxTime = Math.max(...validTimes.map((r) => r.time!));
            if (maxTime < minMaxTime) {
              minMaxTime = maxTime;
              bestStation = station;
            }
          }
        }

        // 최적의 역의 좌표를 지도에 표시
        if (bestStation) {
          try {
            const bestStationCoords = await getStationSubwayCoords(bestStation);
            setSelectedStationCoords({
              x: bestStationCoords.x,
              y: bestStationCoords.y,
            });
          } catch (error) {
            console.error('최적 역 좌표 조회 오류:', error);
            setSelectedStationCoords(null);
          }
        }
      } catch (err) {
        console.error('전체 계산 중 에러 발생:', err);
      } finally {
        setIsLoading(false);
      }
    };

    calculateAllTimes();
  }, [allParticipants, selectedStations]);

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

  // 역별 평균 환승 횟수 계산
  const getAverageTransferCountForStation = (station: string) => {
    const stationResults = getResultsByStation(station);
    const validTransfers = stationResults.filter((r) => r.transfers >= 0);

    if (validTransfers.length === 0) return null;

    return Math.round(
      validTransfers.reduce((sum, cur) => sum + cur.transfers, 0) / validTransfers.length
    );
  };

  // 각 역별로 가장 오래 걸리는 친구의 시간 계산
  const getMaxTimeForStation = (station: string) => {
    const stationResults = getResultsByStation(station);
    const validTimes = stationResults.filter((r) => r.time !== null);

    if (validTimes.length === 0) return null;

    return Math.max(...validTimes.map((r) => r.time!));
  };

  // 모든 역 중에서 최대 시간이 가장 짧은 역 찾기
  const getBestStation = () => {
    if (selectedStations.length === 0) return null;

    let bestStation = null;
    let minMaxTime = Infinity;

    for (const station of selectedStations) {
      const maxTime = getMaxTimeForStation(station);
      if (maxTime !== null && maxTime < minMaxTime) {
        minMaxTime = maxTime;
        bestStation = station;
      }
    }

    return bestStation;
  };

  // 최적의 역
  const bestStation = getBestStation();
  // bestStation이 결정되면 사이드바에 역 정보 설정
  useEffect(() => {
    if (bestStation) {
      setStationRecommend(bestStation, false); // 헤더 숨김
    }

    // 페이지를 벗어날 때 사이드바 데이터 초기화
    return () => {
      clearStationRecommend();
    };
  }, [bestStation, setStationRecommend, clearStationRecommend]);

  // 친구 색상 맵
  const friendsColorMap = useFriendColorMap(friendCoords);

  // 모든 마커 (친구들 위치 + 최적 역 위치)를 포함한 맵 범위 계산
  const getAllMarkersForMap = () => {
    const allMarkers = [...friendCoords];

    // 최적 역 위치도 마커에 추가
    if (selectedStationCoords && bestStation) {
      allMarkers.push({
        name: bestStation,
        x: selectedStationCoords.x,
        y: selectedStationCoords.y,
      });
    }

    return allMarkers.map((marker) => ({
      lat: marker.y,
      lng: marker.x,
      label: marker.name,
      color:
        marker.name === bestStation ? '#ff4444' : friendsColorMap[marker.name],
    }));
  };

  // 데이터가 없으면 로딩 또는 에러 표시
  if (!selectedStations || allParticipants.length === 0) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <Container sx={containerStyle}>
      <MeetHeader />

      {/* 선택된 정보 요약 */}
      {!isMobile && (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Alert severity="info" sx={alertStyle}>
            <Typography variant="body1" sx={alertTitleStyle}>
              선택된 정보
            </Typography>
            {user?.user_name && user?.user_start_station && (
              <Typography variant="body2" sx={alertBodyStyle}>
                <strong>내 정보:</strong> {user.user_name}(
                {user.user_start_station})
              </Typography>
            )}
            <Typography variant="body2" sx={alertBodyStyle}>
              <strong>친구들:</strong>{' '}
              {selectedFriends && selectedFriends.length > 0
                ? selectedFriends
                    .map((f: Friend) => `${f.name}(${f.start_station})`)
                    .join(', ')
                : '선택된 친구 없음'}
            </Typography>
            <Typography variant="body2" sx={alertBodyStyle}>
              <strong>후보 장소:</strong> {selectedStations.join(', ')}
            </Typography>
          </Alert>
        </Box>
      )}

      {isLoading ? (
        <Box sx={loadingBoxStyle}>
          <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            이동 시간을 계산하는 중입니다...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={gridSpacing} mt={marginTop} mb={marginBottom}>
          {bestStation ? (
            // 최적의 역만 표시
            <Grid key={bestStation} size={{ xs: 12 }}>
              <Stack spacing={stackSpacing}>
                {!isMobile && (
                  <Alert severity="success" sx={successAlertStyle}>
                    <Typography variant="body1" sx={alertTitleStyle}>
                      🎯 최적의 만남 장소
                    </Typography>
                    <Typography variant="body2" sx={alertBodyStyle}>
                      모든 친구가 가장 빠르게 모일 수 있는 장소입니다. (가장
                      오래 걸리는 친구 기준: {getMaxTimeForStation(bestStation)}
                      분)
                    </Typography>
                  </Alert>
                )}

                <MeetPointCard
                  selectedStationName={bestStation}
                  averageTime={getAverageTimeForStation(bestStation)}
                  averageTransferCount={getAverageTransferCountForStation(
                    bestStation,
                  )}
                  satisfactionRate={getSatisfactionEmoji(
                    getAverageTimeForStation(bestStation),
                    getAverageTransferCountForStation(bestStation),
                  )}
                />
                <MeetFriendsTimeCard
                  results={getResultsByStation(bestStation).map((r) => ({
                    name: r.name,
                    time: r.time,
                    transfers: r.stationCount,
                  }))}
                />
              </Stack>
            </Grid>
          ) : (
            // 데이터가 없는 경우
            <Grid size={{ xs: 12 }}>
              <Alert severity="warning" sx={alertStyle}>
                <Typography sx={alertBodyStyle}>
                  계산 결과를 찾을 수 없습니다.
                </Typography>
              </Alert>
            </Grid>
          )}
        </Grid>
      )}

      {/* 지도 표시 */}
      <Box sx={{ mt: { xs: 3, sm: 4 } }}>
        {selectedStationCoords && friendCoords.length > 0 ? (
          <Box sx={mapContainerStyle}>
            <KakaoMap
              latitude={selectedStationCoords.y}
              longitude={selectedStationCoords.x}
              markers={getAllMarkersForMap()}
              showAllMarkers={true} // 모든 마커가 보이도록 설정
            >
              <FriendMarkerLegend
                friends={friendCoords.map((f) => ({
                  name: f.name,
                  from:
                    allParticipants.find(
                      (participant: ParticipantInfo) =>
                        participant.name === f.name,
                    )?.start_station ?? '알 수 없음',
                  color: friendsColorMap[f.name],
                }))}
              />
            </KakaoMap>
          </Box>
        ) : (
          <Box sx={mapPlaceholderStyle}>
            📍 지도 데이터를 불러오는 중입니다...
          </Box>
        )}
      </Box>

      {/* 추천 정보 - 모바일에서만 표시 */}
      {isMobile && (
        <Box sx={{ mt: { xs: 3, sm: 4 } }}>
          <RecommendResultInfo location={bestStation} />
        </Box>
      )}
    </Container>
  );
};

export default StationMeetResultPage;
