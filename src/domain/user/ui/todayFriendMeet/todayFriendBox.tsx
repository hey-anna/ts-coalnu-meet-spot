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
import type { Friend, GetUserFriendByGroupResponse } from '../../models/model';

// Props 타입 정의
interface TodayFriendBoxProps {
  onFriendsChange?: (friends: Friend[]) => void; // 선택된 친구들을 부모로 전달하는 함수
  selectedFriends?: Friend[];
}

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '800px',
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
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
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
  flex: 3,
  height: '500px',
  
  [theme.breakpoints.down('md')]: {
    height: '400px',
    flex: 'none',
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


const todayFriendBox: React.FC<TodayFriendBoxProps> = ({ onFriendsChange, 
  selectedFriends = []}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // 임시 그룹 데이터 (GetUserFriendByGroupResponse 타입에 맞게)
  const mockFriendGroups: GetUserFriendByGroupResponse[] = [
    {
      id: 1,
      group_name: "대학친구들",
      group_color: "#1976d2",
      created_at: "2024-01-01T00:00:00Z",
      friend_link_group: [
        {
          friend: {
            id: 1,
            name: "지민",
            start_station: "강남"
          }
        },
        {
          friend: {
            id: 2,
            name: "수아",
            start_station: "잠실"
          }
        },
        {
          friend: {
            id: 3,
            name: "도윤",
            start_station: "종각"
          }
        }
      ]
    },
    {
      id: 2,
      group_name: "회사동료들",
      group_color: "#ff9800",
      created_at: "2024-01-02T00:00:00Z",
      friend_link_group: [
        {
          friend: {
            id: 4,
            name: "민지",
            start_station: "홍대입구"
          }
        },
        {
          friend: {
            id: 5,
            name: "현우",
            start_station: "신촌"
          }
        }
      ]
    },
    {
      id: 3,
      group_name: "동네친구들",
      group_color: "#4caf50",
      created_at: "2024-01-03T00:00:00Z",
      friend_link_group: [
        {
          friend: {
            id: 6,
            name: "서연",
            start_station: "건대입구"
          }
        },
        {
          friend: {
            id: 7,
            name: "태민",
            start_station: "신림"
          }
        },
        {
          friend: {
            id: 8,
            name: "하은",
            start_station: "사당"
          }
        }
      ]
    }
  ];

  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

   const handleFriendSelect = (friend: Friend) => {
    if (onFriendsChange && selectedFriends) { // selectedFriends 체크 추가
      const isAlreadySelected = selectedFriends.some(f => f.id === friend.id);
      if (isAlreadySelected) {
        onFriendsChange(selectedFriends.filter(f => f.id !== friend.id));
      } else {
        onFriendsChange([...selectedFriends, friend]);
      }
    }
  };

  const handleGroupSelect = (newFriendsList: Friend[]) => {
    // 그룹 선택 (전체 친구 배열 받음)
    if (onFriendsChange) {
      onFriendsChange(newFriendsList);
    }
  };

  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
        }}>
          오늘 만날 친구
        </Typography>
        <ActionButton 
          variant="outlined" 
          size="small" 
          onClick={handleGroupSettings}
          startIcon={<SettingsIcon />} 
          sx={{
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
          }}
        >
          그룹 설정
        </ActionButton>
      </HeaderSection>

      {/* 메인 콘텐츠 - 가로 배치 */}
      <MainContentWrapper>
        {/* 왼쪽: 친구 선택 부분 (3/4) */}
        <StyledPaper sx={{ 
          [theme.breakpoints.down('md')]: { order: 1 }
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
              {/* 내 그룹 탭 */}
              {tabValue === 0 && (
                mockFriendGroups.length > 0 ? (
                  <TodayFriendCard
                    friendGroups={mockFriendGroups}  // 올바른 타입의 임시 데이터 전달
                    selectedFriends={selectedFriends || []}
                    onFriendSelect={handleFriendSelect}
                    onGroupSelect={handleGroupSelect}
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
      </MainContentWrapper>
    </StyledContainer>
  );
};

export default todayFriendBox;