import React, { useState } from 'react';
import { Box, styled, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router'; // react-router로 변경
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RecommendStationBox from '../../domain/recommendation/ui/recommendStation/recommendStationBox';
import TodayFriendBox from '../../domain/user/ui/todayFriendMeet/todayFriendBox';
import type { Friend } from '../../domain/user/models/model'; // 실제 경로에 맞게 수정
import { useUserStore } from '@/domain/user/store/userStore';
import useGetUserFriendByGroupWithoutParams from '@/domain/user/hooks/useGetUserFriendByGroupWithoutParams';
import useGetUserFriendListWithoutParams from '@/domain/user/hooks/useGetUserFriendListWithoutParams';
const ResultSection = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  padding: theme.spacing(3),
  backgroundColor: '#f8f9fa',
  borderRadius: '20px',
  border: '1px solid rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(2.5),
    borderRadius: '16px',
    gap: theme.spacing(1.5),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    borderRadius: '14px',
    gap: theme.spacing(1.2),
  },
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  backgroundColor: 'white',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.04)',

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.2),
    padding: theme.spacing(1.5),
    borderRadius: '10px',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: theme.spacing(1),
    padding: theme.spacing(1.2),
    borderRadius: '8px',
  },
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  minWidth: '100px',
  display: 'flex',
  alignItems: 'center',

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    minWidth: 'auto',
    width: '100%',
    justifyContent: 'flex-start',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.8rem',
  },
}));

const InfoContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    gap: '6px',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: '4px',
  },
}));

const FriendChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'groupColor',
})<{ groupColor?: string }>(({ groupColor, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  backgroundColor: groupColor || '#6c757d',
  color: 'white',
  borderRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: 500,
  gap: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    opacity: 0.8,
    transform: 'scale(0.98)',
  },

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    fontSize: '0.75rem',
    borderRadius: '10px',
    gap: '3px',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: '4px 8px',
    fontSize: '0.7rem',
    borderRadius: '8px',
    gap: '2px',
  },
}));

const StationChip = styled(Box)<{ stationColor?: string }>(
  ({ stationColor, theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    backgroundColor: stationColor || '#6c757d',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 500,
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      opacity: 0.8,
      transform: 'scale(0.98)',
    },

    // 모바일 최적화
    [theme.breakpoints.down('sm')]: {
      padding: '5px 10px',
      fontSize: '0.75rem',
      borderRadius: '10px',
      gap: '3px',
    },

    // 아이폰 SE 대응
    '@media (max-width: 375px)': {
      padding: '4px 8px',
      fontSize: '0.7rem',
      borderRadius: '8px',
      gap: '2px',
    },
  }),
);

const ResultButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: '16px',
  fontSize: '1rem',
  fontWeight: 600,
  minHeight: '56px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
    transform: 'translateY(-2px)',
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
  },
  '&:disabled': {
    background: '#e0e0e0',
    color: '#9e9e9e',
    boxShadow: 'none',
    transform: 'none',
  },

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.8, 3),
    fontSize: '0.9rem',
    minHeight: '48px',
    borderRadius: '14px',
    '&:hover': {
      transform: 'translateY(-1px)', // 모바일에서는 더 적은 움직임
    },
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.5, 2.5),
    fontSize: '0.85rem',
    minHeight: '44px',
    borderRadius: '12px',
  },
}));

const EmptyState = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  fontSize: '0.85rem',

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.75rem',
  },
}));

const ClearAllButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(0.5, 1),
  fontSize: '0.7rem',
  height: 28,
  color: '#ef4444',
  borderColor: '#ef4444',
  marginLeft: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    marginTop: theme.spacing(0.5),
    fontSize: '0.65rem',
    height: 26,
    padding: theme.spacing(0.4, 0.8),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.6rem',
    height: 24,
    padding: theme.spacing(0.3, 0.6),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
  fontWeight: 600,

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    marginBottom: theme.spacing(0.8),
    gap: theme.spacing(0.8),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '1rem',
    marginBottom: theme.spacing(0.6),
    gap: theme.spacing(0.6),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1.5),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    marginTop: theme.spacing(1.2),
  },
}));

const AdditionalInfo = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.8),
    lineHeight: 1.4,
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.7rem',
    marginTop: theme.spacing(0.6),
  },
}));

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { user: loginUser } = useUserStore();
  const { data: mockFriendGroups } = useGetUserFriendByGroupWithoutParams();
  const { data: friends } = useGetUserFriendListWithoutParams();
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  const isLogin = !!loginUser?.email && !!loginUser?.id;

  // TodayFriendBox에서 선택된 친구들을 받는 함수
  const handleFriendsChange = (friends: Friend[]) => {
    const maxFriends = isLogin ? 3 : 4;

    if (friends.length > maxFriends) {
      alert(
        `${isLogin ? '로그인' : '비로그인'} 상태에서는 최대 ${maxFriends}명까지만 선택할 수 있습니다.`,
      );
      return;
    }

    setSelectedFriends(friends);
  };

  // RecommendStationBox에서 선택된 지하철역들을 받는 함수
  const handleStationsChange = (stations: string[]) => {
    const maxStations = 4;

    if (stations.length > maxStations) {
      alert(`최대 ${maxStations}개 역까지만 선택할 수 있습니다.`);
      return;
    }

    setSelectedStations(stations);
  };

  // 결과 페이지로 이동하는 함수
  const handleGoToResult = () => {
    if (selectedFriends.length === 0) {
      alert('먼저 친구를 선택해주세요!');
      return;
    }

    if (selectedStations.length === 0) {
      alert('지하철역을 선택해주세요!');
      return;
    }

    // 결과 페이지로 이동하면서 데이터 전달
    navigate('/meetup/result', {
      state: {
        selectedFriends,
        selectedStations,
      },
    });
  };

  // 친구 개별 삭제 함수
  const handleRemoveFriend = (friendId: string | number) => {
    setSelectedFriends((prev) =>
      prev.filter((friend) => friend.id !== friendId),
    );
  };

  // 친구 전체 삭제 함수
  const handleClearAllFriends = () => {
    setSelectedFriends([]);
  };

  // 지하철역 개별 삭제 함수
  const handleRemoveStation = (stationName: string) => {
    setSelectedStations((prev) =>
      prev.filter((station) => station !== stationName),
    );
  };

  // 지하철역 전체 삭제 함수
  const handleClearAllStations = () => {
    setSelectedStations([]);
  };

  // 역의 색상을 결정하는 함수 (인기 지역 카드에 있는 역인지 확인)
  const getStationChipColor = (station: string) => {
    // SUBWAY_STATIONS의 인기 지역 8개 (실제 데이터에 맞게 수정 필요)
    const popularStations = [
      '강남',
      '홍대입구',
      '신촌',
      '명동',
      '이태원',
      '건대입구',
      '신림',
      '종로3가',
    ];

    // 인기 지역 카드에 있는 역이면 메인 컬러, 아니면 회색
    return popularStations.includes(station) ? '#6c5ce7' : '#6c757d';
  };

  // 친구의 그룹 색상을 가져오는 함수 (TodayFriendBox와 동일한 로직)
  const getFriendGroupColor = (friendId: string | number): string => {
    // TodayFriendBox의 mockFriendGroups와 동일한 데이터 구조 참조
    if (mockFriendGroups) {
      for (const group of mockFriendGroups) {
        const foundFriend = group.friend_link_group.find(
          (linkGroup) => linkGroup.friend.id === Number(friendId),
        );
        if (foundFriend) {
          return group.group_color;
        }
      }
    }

    return '#6c757d'; // 기본 색상 (그룹에 속하지 않은 친구)
  };

  const canProceed = selectedFriends.length > 0 && selectedStations.length > 0;

  return (
    <div>
      <TodayFriendBox
        isLoggedIn={isLogin}
        onFriendsChange={handleFriendsChange}
        selectedFriends={selectedFriends} // 선택된 친구 정보 전달
        mockFriendGroups={mockFriendGroups}
        friends={friends}
      />
      <RecommendStationBox
        onStationsChange={handleStationsChange}
        selectedStations={selectedStations}
      />

      {/* 선택된 정보 표시 및 결과 버튼 */}
      <ResultSection>
        <SectionTitle>
          <LocationOnIcon
            color="primary"
            sx={{ fontSize: { xs: 20, sm: 24 } }}
          />
          만남 계획 확인
        </SectionTitle>

        {/* 선택된 친구들 */}
        <InfoRow>
          <InfoLabel>
            <PeopleIcon sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
            함께할 친구 ({selectedFriends.length}/{isLogin ? 3 : 4}명)
          </InfoLabel>
          <InfoContent>
            {selectedFriends.length > 0 ? (
              <>
                {selectedFriends.map((friend) => (
                  <FriendChip
                    key={friend.id}
                    groupColor={getFriendGroupColor(friend.id)}
                    onClick={() => handleRemoveFriend(friend.id)}
                  >
                    {friend.name} ({friend.start_station}) ✕
                  </FriendChip>
                ))}
                {selectedFriends.length > 1 && (
                  <ClearAllButton
                    variant="outlined"
                    size="small"
                    onClick={handleClearAllFriends}
                  >
                    전체 삭제
                  </ClearAllButton>
                )}
              </>
            ) : (
              <EmptyState>
                친구를 선택해주세요 (최대 {isLogin ? 3 : 4}명)
              </EmptyState>
            )}
          </InfoContent>
        </InfoRow>

        {/* 선택된 지하철역들 */}
        <InfoRow>
          <InfoLabel>
            <LocationOnIcon sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
            후보 장소 ({selectedStations.length}/{isLogin ? 3 : 4}개)
          </InfoLabel>
          <InfoContent>
            {selectedStations.length > 0 ? (
              <>
                {selectedStations.map((station, index) => (
                  <StationChip
                    key={index}
                    stationColor={getStationChipColor(station)}
                    onClick={() => handleRemoveStation(station)}
                  >
                    <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                    {station}역 ✕
                  </StationChip>
                ))}
                {selectedStations.length > 1 && (
                  <ClearAllButton
                    variant="outlined"
                    size="small"
                    onClick={handleClearAllStations}
                  >
                    전체 삭제
                  </ClearAllButton>
                )}
              </>
            ) : (
              <EmptyState>
                지하철역을 선택해주세요 (최대 {isLogin ? 3 : 4}개)
              </EmptyState>
            )}
          </InfoContent>
        </InfoRow>

        {/* 결과 페이지로 이동 버튼 */}
        <ButtonContainer>
          <ResultButton
            onClick={handleGoToResult}
            disabled={!canProceed}
            endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
            fullWidth
            sx={{ maxWidth: { xs: '100%', sm: 400 } }}
          >
            {canProceed
              ? `${selectedFriends.length}명과 ${selectedStations.length}개 역 중 최적 장소 찾기`
              : '친구와 장소를 선택해주세요'}
          </ResultButton>
        </ButtonContainer>

        {/* 추가 정보 */}
        {canProceed && (
          <AdditionalInfo variant="caption">
            각 친구의 이동 시간과 최적 경로를 확인할 수 있습니다
          </AdditionalInfo>
        )}
      </ResultSection>
    </div>
  );
};

export default MainPage;
