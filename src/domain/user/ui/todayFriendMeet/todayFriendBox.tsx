import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Tab,
  Tabs,
  Chip,
  Button,
  Paper
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

// 분리된 컴포넌트들 import
import TodayFriendCard from './todayFriendCard';
import TodayFriendSearch from './todayFriendSearch';
import { useNavigate } from 'react-router';

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '800px', // 전체 컨테이너 크기 증가
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flex: 1,
  
  // 모바일에서는 세로 배치로 변경
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5), // 모바일에서 간격 조정
  },
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: theme.palette.custom.secondary,
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '18px',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  
  // 3:1 비율로 크기 조정
  flex: 3,
  height: '500px', // 고정 높이
  
  [theme.breakpoints.down('md')]: {
    height: '400px', // 모바일에서 높이 조정
    flex: 'none', // 모바일에서는 flex 해제
  },
  [theme.breakpoints.down('sm')]: {
    height: '350px',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  padding: theme.spacing(2.5),
  flexShrink: 0,
  '& .MuiTab-root': {
    fontSize: '0.95rem',
    fontWeight: 600,
    padding: theme.spacing(2, 3),
    minHeight: 56,
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      padding: theme.spacing(1.5, 2),
      minHeight: 48,
    },
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
  flexShrink: 0,
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(0,0,0,0.3)',
    },
  },
});

// 선택된 친구들 박스 - 사이드바 스타일로 변경
const SelectedFriendsBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  
  // 1:3 비율로 크기 조정
  flex: 1,
  height: '500px', // 메인 박스와 같은 높이
  
  [theme.breakpoints.down('md')]: {
    height: '180px', // 모바일에서는 아래 배치로 높이 감소
    flex: 'none',
    order: 2, // 모바일에서 아래로 배치
  },
  [theme.breakpoints.down('sm')]: {
    height: '150px',
    padding: theme.spacing(2), // 모바일에서 패딩 조정
  },
}));

const SelectedChipsContainer = styled(Box)({
  overflowY: 'auto',
  overflowX: 'hidden',
  flex: 1,
  marginTop: '16px',
  
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '2px',
  },
});

const SelectedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.custom.secondary,
  color: 'white',
  margin: theme.spacing(0.4),
  borderRadius: '12px',
  height: 32,
  fontSize: '0.85rem',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '18px',
    '&:hover': {
      color: 'white'
    }
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  color: theme.palette.custom.secondary,
  borderColor: theme.palette.custom.secondary,
  borderRadius: '14px',
  padding: theme.spacing(1.5, 3),
  fontSize: '0.95rem',
  fontWeight: 600,
  minWidth: 110,
  height: 48
}));

// 선택된 친구가 없을 때 보여줄 플레이스홀더
const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const todayFriendBox: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900); // 반응형 기준점 조정
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFriendSelect = (friendName: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendName)
        ? prev.filter(name => name !== friendName)
        : [...prev, friendName]
    );
  };

  const handleRemoveFriend = (friendName: string) => {
    setSelectedFriends(prev => prev.filter(name => name !== friendName));
  };

  const handleClearAll = () => {
    setSelectedFriends([]);
  };

  // 그룹 설정 페이지로 이동하는 함수
  const handleGroupSettings = () => {
    navigate('/friend/group-management');
  };

  return (
    <StyledContainer>
      {/* 헤더 */}
      <HeaderSection>
        <HeaderIcon>
          <Diversity3Icon />
        </HeaderIcon>
        <Typography variant="h5" fontWeight={700} sx={{ 
          fontSize: { xs: '1.2rem', sm: '1.4rem' }, flex: 1
        }} >
          오늘 만날 친구
        </Typography>
          <ActionButton variant="outlined" size="small" onClick={handleGroupSettings}
          startIcon={<SettingsIcon />} sx={{
            minWidth: 'auto',
            px: 2,
            py: 1,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            '& .MuiButton-startIcon': {
              marginRight: '6px',
              marginLeft: 0,
              '& > *:nth-of-type(1)': {
                fontSize: '18px',
              }
            },
            [theme.breakpoints.down('sm')]: {
              px: 1.5,
              fontSize: '0.8rem',
              '& .MuiButton-startIcon > *:nth-of-type(1)': {
                fontSize: '16px',
              }
            }
          }}>
            그룹 설정
          </ActionButton>
      </HeaderSection>

      {/* 메인 콘텐츠 - 가로 배치 */}
      <MainContentWrapper>
        {/* 왼쪽: 친구 선택 부분 (3/4) */}
        <StyledPaper sx={{ 
          [theme.breakpoints.down('md')]: { order: 1 } // 모바일에서 위쪽 배치
        }}>
          {/* 탭 */}
          <StyledTabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="내 그룹" />
            <Tab label="등록 친구 검색" />
          </StyledTabs>

          {/* 콘텐츠 영역 */}
          <ContentSection>
            <ScrollableContent>
              {/* 인기 지역 탭 */}
              {tabValue === 0 && (
                1 ? (
                <TodayFriendCard
                  friendGroups={["친구그룹1", "친구 그룹2"]}
                  selectedFriends={selectedFriends}
                  onFriendSelect={handleFriendSelect}
                />
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      친구 그룹 데이터를 불러오는 중입니다...
                    </Typography>
                  </Box>
                )
              )}

              {/* 검색 탭 */}
              {tabValue === 1 && (
                1 ? (
                  <TodayFriendSearch
                    onFriendSelect={handleFriendSelect}
                    placeholder="친구 이름을 검색해보세요"
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      내 친구 데이터를 불러오는 중입니다...
                    </Typography>
                  </Box>
                )
              )}
            </ScrollableContent>
          </ContentSection>
        </StyledPaper>

        {/* 오른쪽: 선택된 친구들 (1/4) */}
        <SelectedFriendsBox>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
              선택된 친구
            </Typography>
            {selectedFriends.length > 0 && (
              <ActionButton 
                variant="outlined" 
                size="small"
                onClick={handleClearAll}
                sx={{ 
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem'
                }}
              >
                전체 삭제
              </ActionButton>
            )}
          </Box>
          
          {selectedFriends.length > 0 ? (
            <SelectedChipsContainer>
              {selectedFriends.map((friendName) => (
                <SelectedChip
                  key={friendName}
                  label={`${friendName}`}
                  onDelete={() => handleRemoveFriend(friendName)}
                  deleteIcon={<CloseIcon />}
                />
              ))}
            </SelectedChipsContainer>
          ) : (
            <EmptyStateBox>
              <Diversity3Icon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                친구를 선택해주세요
              </Typography>
            </EmptyStateBox>
          )}
        </SelectedFriendsBox>
      </MainContentWrapper>
    </StyledContainer>
  );
};

export default todayFriendBox;