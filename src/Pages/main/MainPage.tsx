import React, { useState } from 'react';
import { Box, styled, Typography, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router'; // react-router로 변경
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RecommendStationBox from '../../domain/recommendation/ui/recommendStation/recommendStationBox';
import TodayFriendBox from '../../domain/user/ui/todayFriendMeet/todayFriendBox';
import type { Friend } from '../../domain/user/models/model'; // 실제 경로에 맞게 수정

const LinkBtn = styled(Box)({
  padding: '8px',
  border: 'solid 1px red',
  color: 'black',
});

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
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  backgroundColor: 'white',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.04)',
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  minWidth: '100px',
}));

const InfoContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
});

const FriendChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'groupColor',
})<{ groupColor?: string }>(({ groupColor }) => ({
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
}));

const StationChip = styled(Box)<{ stationColor?: string }>(({ stationColor }) => ({
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
}));

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
  }
}));

const EmptyState = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  fontSize: '0.85rem',
}));

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  // TodayFriendBox에서 선택된 친구들을 받는 함수
  const handleFriendsChange = (friends: Friend[]) => {
    setSelectedFriends(friends);
  };

  // RecommendStationBox에서 선택된 지하철역들을 받는 함수
  const handleStationsChange = (stations: string[]) => {
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
        selectedStations
      }
    });
  };

  // 친구 개별 삭제 함수
  const handleRemoveFriend = (friendId: string | number) => {
    setSelectedFriends(prev => prev.filter(friend => friend.id !== friendId));
  };

  // 친구 전체 삭제 함수
  const handleClearAllFriends = () => {
    setSelectedFriends([]);
  };

  // 지하철역 개별 삭제 함수
  const handleRemoveStation = (stationName: string) => {
    setSelectedStations(prev => prev.filter(station => station !== stationName));
  };

  // 지하철역 전체 삭제 함수
  const handleClearAllStations = () => {
    setSelectedStations([]);
  };

  // 역의 색상을 결정하는 함수 (인기 지역 카드에 있는 역인지 확인)
  const getStationChipColor = (station: string) => {
    // SUBWAY_STATIONS의 인기 지역 8개 (실제 데이터에 맞게 수정 필요)
    const popularStations = ['강남', '홍대입구', '신촌', '명동', '이태원', '건대입구', '신림', '종로3가'];
    
    // 인기 지역 카드에 있는 역이면 메인 컬러, 아니면 회색
    return popularStations.includes(station) ? '#6c5ce7' : '#6c757d';
  };

  // 친구의 그룹 색상을 가져오는 함수 (TodayFriendBox와 동일한 로직)
  const getFriendGroupColor = (friendId: string | number): string => {
    // TodayFriendBox의 mockFriendGroups와 동일한 데이터 구조 참조
    const mockFriendGroups = [
      {
        id: 1,
        group_name: "대학친구들",
        group_color: "#1976d2",
        friend_link_group: [
          { friend: { id: 1, name: "지민", start_station: "강남" } },
          { friend: { id: 2, name: "수아", start_station: "잠실" } },
          { friend: { id: 3, name: "도윤", start_station: "종각" } }
        ]
      },
      {
        id: 2,
        group_name: "회사동료들",
        group_color: "#ff9800",
        friend_link_group: [
          { friend: { id: 4, name: "민지", start_station: "홍대입구" } },
          { friend: { id: 5, name: "현우", start_station: "신촌" } }
        ]
      },
      {
        id: 3,
        group_name: "동네친구들",
        group_color: "#4caf50",
        friend_link_group: [
          { friend: { id: 6, name: "서연", start_station: "건대입구" } },
          { friend: { id: 7, name: "태민", start_station: "신림" } },
          { friend: { id: 8, name: "하은", start_station: "사당" } }
        ]
      }
    ];

    for (const group of mockFriendGroups) {
      const foundFriend = group.friend_link_group.find(
        linkGroup => linkGroup.friend.id === Number(friendId)
      );
      if (foundFriend) {
        return group.group_color;
      }
    }
    return '#6c757d'; // 기본 색상 (그룹에 속하지 않은 친구)
  };

  const canProceed = selectedFriends.length > 0 && selectedStations.length > 0;

  return (
    <div>
      <TodayFriendBox 
        onFriendsChange={handleFriendsChange}
        selectedFriends={selectedFriends} // 선택된 친구 정보 전달
      />
      <RecommendStationBox 
        onStationsChange={handleStationsChange}
        selectedStations={selectedStations}
      />
      
      {/* 선택된 정보 표시 및 결과 버튼 */}
      <ResultSection>
        <Typography variant="h6" fontWeight={600} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontSize: '1.2rem',
          mb: 1
        }}>
          <LocationOnIcon color="primary" />
          만남 계획 확인
        </Typography>

        {/* 선택된 친구들 */}
        <InfoRow>
          <InfoLabel>
            <PeopleIcon sx={{ fontSize: 18, mr: 0.5 }} />
            함께할 친구 ({selectedFriends.length}명)
          </InfoLabel>
          <InfoContent>
            {selectedFriends.length > 0 ? (
              selectedFriends.map((friend) => (
                <FriendChip 
                  key={friend.id}
                  groupColor={getFriendGroupColor(friend.id)}
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  {friend.name} ({friend.start_station}) ✕
                </FriendChip>
              ))
            ) : (
              <EmptyState>친구를 선택해주세요</EmptyState>
            )}
            {selectedFriends.length > 1 && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearAllFriends}
                sx={{ 
                  ml: 1, 
                  minWidth: 'auto', 
                  px: 1,
                  fontSize: '0.7rem',
                  height: 28,
                  color: '#ef4444',
                  borderColor: '#ef4444',
                  '&:hover': {
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  }
                }}
              >
                전체 삭제
              </Button>
            )}
          </InfoContent>
        </InfoRow>

        {/* 선택된 지하철역들 */}
        <InfoRow>
          <InfoLabel>
            <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
            후보 장소 ({selectedStations.length}개)
          </InfoLabel>
          <InfoContent>
            {selectedStations.length > 0 ? (
              selectedStations.map((station, index) => (
                <StationChip 
                  key={index}
                  stationColor={getStationChipColor(station)}
                  onClick={() => handleRemoveStation(station)}
                >
                  <LocationOnIcon sx={{ fontSize: 16 }} />
                  {station}역 ✕
                </StationChip>
              ))
            ) : (
              <EmptyState>지하철역을 선택해주세요</EmptyState>
            )}
            {selectedStations.length > 1 && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearAllStations}
                sx={{ 
                  ml: 1, 
                  minWidth: 'auto', 
                  px: 1,
                  fontSize: '0.7rem',
                  height: 28,
                  color: '#ef4444',
                  borderColor: '#ef4444',
                  '&:hover': {
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  }
                }}
              >
                전체 삭제
              </Button>
            )}
          </InfoContent>
        </InfoRow>

        {/* 결과 페이지로 이동 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <ResultButton
            onClick={handleGoToResult}
            disabled={!canProceed}
            endIcon={<ArrowForwardIcon />}
            fullWidth
            sx={{ maxWidth: 400 }}
          >
            {canProceed 
              ? `${selectedFriends.length}명과 ${selectedStations.length}개 역 중 최적 장소 찾기` 
              : '친구와 장소를 선택해주세요'
            }
          </ResultButton>
        </Box>

        {/* 추가 정보 */}
        {canProceed && (
          <Typography variant="caption" sx={{ 
            textAlign: 'center', 
            color: 'text.secondary',
            mt: 1
          }}>
            각 친구의 이동 시간과 최적 경로를 확인할 수 있습니다
          </Typography>
        )}
      </ResultSection>
    </div>
  );
};

export default MainPage;