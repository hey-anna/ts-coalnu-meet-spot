import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Tab,
  Tabs,
  Chip,
  Button,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import TrainIcon from '@mui/icons-material/Train';

// 분리된 컴포넌트들 import
import TodayFriendCard from './todayFriendCard';
import TodayFriendSearch from './todayFriendSearch';
import { useNavigate } from 'react-router';
import type {
  Friend,
  FriendWithGroup,
  GetUserFriendByGroupResponse,
} from '../../models/model';
import { getLineColor, STATION_CONFIG } from '@/shared/config/stationConfig';
import type { StationData } from '@/shared/models/station';

// Props 타입 정의
interface TodayFriendBoxProps {
  onFriendsChange?: (friends: Friend[]) => void;
  selectedFriends?: Friend[];
  isLoggedIn?: boolean; // 로그인 상태를 받는 prop 추가
  mockFriendGroups: GetUserFriendByGroupResponse[];
  friends: FriendWithGroup[];
}

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '800px',
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    maxWidth: '100%',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
  },
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
  color: 'white',

  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    width: 32,
    height: 32,
  },
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
    height: '70vh',
    minHeight: '300px',
    borderRadius: '16px',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    height: '58vh',
    minHeight: '150px',
    borderRadius: '12px',
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
      fontSize: '0.75rem',
      padding: theme.spacing(1.5, 2),
      minHeight: 40,
      minWidth: '80px',
    },

    // 아이폰 SE 대응
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
      padding: theme.spacing(1, 1.5),
      minHeight: 36,
      minWidth: '70px',
    },
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0',
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
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

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
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
  height: 48,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.8rem',
    minWidth: '90px',
    height: 40,
    borderRadius: '12px',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(0.8, 1.5),
    fontSize: '0.75rem',
    minWidth: '80px',
    height: 36,
    borderRadius: '10px',
  },
}));

// 친구 추가 폼 스타일
const AddFriendForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: theme.spacing(1.2),
    marginBottom: theme.spacing(1.5),
  },
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-end',

  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    alignItems: 'stretch',
  },
}));

// 지하철역 검색 관련 스타일
const StationSearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  flex: 1,
  minWidth: '200px',

  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

const StationSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    backgroundColor: 'white',
    '& fieldset': {
      border: '1px solid rgba(0,0,0,0.23)',
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },

  // 모바일 대응
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputLabel-root': {
      fontSize: '0.875rem',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '0.875rem',
      padding: '12px 14px',
    },
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    '& .MuiInputLabel-root': {
      fontSize: '0.8rem',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '0.8rem',
      padding: '10px 12px',
    },
  },
}));

const StationDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  borderRadius: '0 0 8px 8px',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 1300,
  boxShadow: theme.shadows[8],
  border: '1px solid rgba(0,0,0,0.12)',
  borderTop: 'none',

  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '3px',
  },
}));

const StationOption = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: '#f5f5f5',
  },

  '&:last-child': {
    borderBottom: 'none',
  },

  // 모바일 대응
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 1.5),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1, 1.2),
  },
}));

const LineChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: 22,
  borderRadius: '11px',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500,
  },
}));

// 친구 칩 스타일 (모바일용)
const FriendChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(108, 92, 231, 0.08)',
  color: theme.palette.custom.secondary,
  border: '1px solid rgba(108, 92, 231, 0.12)',
  borderRadius: '20px',
  height: '32px',
  fontSize: '0.8rem',
  fontWeight: 500,
  margin: theme.spacing(0.5),

  '& .MuiChip-label': {
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },

  '& .MuiChip-deleteIcon': {
    color: 'rgba(108, 92, 231, 0.7)',
    fontSize: '18px',
    '&:hover': {
      color: theme.palette.error.main,
    },
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    height: '28px',
    fontSize: '0.75rem',
    margin: theme.spacing(0.3),
    '& .MuiChip-label': {
      padding: '0 10px',
    },
    '& .MuiChip-deleteIcon': {
      fontSize: '16px',
    },
  },
}));

const ChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.3),
  },
}));

const FriendCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),

  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    '&:last-child': {
      paddingBottom: theme.spacing(1.5),
    },
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.2),
    '&:last-child': {
      paddingBottom: theme.spacing(1.2),
    },
  },
}));

const TodayFriendBox: React.FC<TodayFriendBoxProps> = ({
  onFriendsChange,
  selectedFriends = [],
  isLoggedIn = false, // 기본값은 비로그인
  mockFriendGroups,
  friends,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // 비회원 친구 추가 관련 상태
  const [friendName, setFriendName] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [stationSearchQuery, setStationSearchQuery] = useState('');
  const [showStationDropdown, setShowStationDropdown] = useState(false);
  const [guestFriends, setGuestFriends] = useState<Friend[]>([]);

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
    if (onFriendsChange && selectedFriends) {
      const isAlreadySelected = selectedFriends.some((f) => f.id === friend.id);

      if (isAlreadySelected) {
        // 이미 선택된 친구는 제거
        onFriendsChange(selectedFriends.filter((f) => f.id !== friend.id));
      } else {
        // 새로 추가하려는 경우 개수 제한 확인
        const maxFriends = isLoggedIn ? 3 : 4;

        if (selectedFriends.length >= maxFriends) {
          alert(
            `${isLoggedIn ? '로그인' : '비로그인'} 상태에서는 최대 ${maxFriends}명까지만 선택할 수 있습니다.`,
          );
          return; // 추가하지 않음
        }

        onFriendsChange([...selectedFriends, friend]);
      }
    }
  };

  const handleGroupSelect = (newFriendsList: Friend[]) => {
    if (onFriendsChange) {
      const maxFriends = isLoggedIn ? 3 : 4;

      // 그룹 선택 시에도 개수 제한 확인
      if (newFriendsList.length > maxFriends) {
        alert(
          `${isLoggedIn ? '로그인' : '비로그인'} 상태에서는 최대 ${maxFriends}명까지만 선택할 수 있습니다.`,
        );
        return; // 변경하지 않음
      }

      onFriendsChange(newFriendsList);
    }
  };

  // 비회원 친구 추가 기능
  const handleAddGuestFriend = () => {
    const isExist = selectedFriends.some(
      (friend) =>
        friend.name === friendName.trim() &&
        friend.start_station === selectedStation,
    );

    if (isExist) {
      alert('이미 추가한 친구 입니다.');
      return;
    }

    if (friendName.trim() && selectedStation) {
      const maxFriends = isLoggedIn ? 3 : 4;

      // 현재 선택된 친구 수가 최대치에 도달했는지 확인
      if (selectedFriends.length >= maxFriends) {
        alert(
          `${isLoggedIn ? '로그인' : '비로그인'} 상태에서는 최대 ${maxFriends}명까지만 선택할 수 있습니다.`,
        );
        return; // 추가하지 않음
      }

      const newFriend: Friend = {
        id: Date.now(), // 임시 ID
        user_id: '', // 비회원용 임시 user_id
        name: friendName.trim(),
        start_station: selectedStation,
      };

      const updatedGuestFriends = [...guestFriends, newFriend];
      setGuestFriends(updatedGuestFriends);

      // 선택된 친구 목록에도 추가
      const updatedSelectedFriends = [...selectedFriends, newFriend];
      if (onFriendsChange) {
        onFriendsChange(updatedSelectedFriends);
      }

      // 폼 초기화
      console.log('setSelectedStation');
      setFriendName('');
      setSelectedStation('');
      setStationSearchQuery('');
    }
  };

  // 지하철역 검색 기능
  const handleStationSearch = (query: string) => {
    console.log('선택됨?');
    setStationSearchQuery(query);
    setShowStationDropdown(query.length > 0);

    // 검색어가 있으면 선택된 역 초기화 (새로 입력하는 경우)
    if (query !== selectedStation) {
      console.log('setSelectedStation');
      setSelectedStation('');
    }
  };

  const handleStationSelect = (station: StationData) => {
    const displayText = `${station.station_nm} (${station.line_num})`;
    console.log('setSelectedStation');
    setSelectedStation(station.station_nm);
    setStationSearchQuery(displayText);
    setShowStationDropdown(false);
  };

  // 지하철역 필터링
  const filteredStations =
    stationSearchQuery.length > 0
      ? STATION_CONFIG.DATA.filter(
          (station: StationData) =>
            station.station_nm
              .toLowerCase()
              .includes(stationSearchQuery.toLowerCase()) ||
            station.line_num.includes(stationSearchQuery),
        ).slice(0, 8) // 최대 8개 결과만 표시
      : [];

  // 비회원 친구 삭제 기능
  const handleRemoveGuestFriend = (friendId: number) => {
    const updatedGuestFriends = guestFriends.filter((f) => f.id !== friendId);
    setGuestFriends(updatedGuestFriends);

    // 선택된 친구 목록에서도 제거
    const updatedSelectedFriends = selectedFriends.filter(
      (f) => f.id !== friendId,
    );
    if (onFriendsChange) {
      onFriendsChange(updatedSelectedFriends);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGroupSettings = () => {
    navigate('/friend/group-management');
  };

  // 탭 구성 결정
  const getTabs = () => {
    if (isLoggedIn) {
      return [
        { label: '친구 추가', value: 0 },
        { label: '내 그룹', value: 1 },
        { label: '등록 친구 검색', value: 2 },
      ];
    } else {
      return [{ label: '친구 추가', value: 0 }];
    }
  };

  const tabs = getTabs();

  return (
    <StyledContainer>
      {/* 헤더 */}
      <HeaderSection>
        <HeaderIcon>
          <Diversity3Icon />
        </HeaderIcon>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.4rem' },
            flex: 1,
            // 아이폰 SE 대응
            '@media (max-width: 375px)': {
              fontSize: '1rem',
            },
          }}
        >
          오늘 만날 친구
        </Typography>
        {isLoggedIn && (
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
                },
              },
              [theme.breakpoints.down('sm')]: {
                px: 1.5,
                fontSize: '0.8rem',
                '& .MuiButton-startIcon > *:nth-of-type(1)': {
                  fontSize: '16px',
                },
              },
            }}
          >
            그룹 설정
          </ActionButton>
        )}
      </HeaderSection>

      {/* 메인 콘텐츠 */}
      <MainContentWrapper>
        <StyledPaper
          sx={{
            [theme.breakpoints.down('md')]: { order: 1 },
          }}
        >
          {/* 탭 */}
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </StyledTabs>

          {/* 콘텐츠 영역 */}
          <ContentSection>
            <ScrollableContent>
              {/* 친구 추가 탭 (기본 탭) */}
              {tabValue === 0 && (
                <Box>
                  <AddFriendForm>
                    <FormRow>
                      <TextField
                        label="친구 이름"
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                          flex: 1,
                          minWidth: { xs: '100%', sm: '200px' },
                          // 모바일에서 텍스트 필드 크기 조정
                          '& .MuiInputLabel-root': {
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                          },
                          '& .MuiOutlinedInput-input': {
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                          },
                          // 아이폰 SE 대응
                          '@media (max-width: 375px)': {
                            '& .MuiInputLabel-root': {
                              fontSize: '0.8rem',
                            },
                            '& .MuiOutlinedInput-input': {
                              fontSize: '0.8rem',
                              padding: '10px 12px',
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <PersonIcon
                              sx={{
                                color: 'text.secondary',
                                mr: 1,
                                fontSize: '20px',
                              }}
                            />
                          ),
                        }}
                      />
                      <StationSearchContainer>
                        <StationSearchField
                          label="출발역"
                          value={stationSearchQuery}
                          onChange={(e) => handleStationSearch(e.target.value)}
                          onFocus={() => {
                            if (stationSearchQuery.length > 0) {
                              setShowStationDropdown(true);
                            }
                          }}
                          onBlur={() => {
                            // 약간의 지연을 두어 클릭 이벤트가 처리되도록 함
                            setTimeout(
                              () => setShowStationDropdown(false),
                              200,
                            );
                          }}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <TrainIcon
                                sx={{
                                  color: 'text.secondary',
                                  mr: 1,
                                  fontSize: '20px',
                                }}
                              />
                            ),
                          }}
                        />
                        {showStationDropdown && filteredStations.length > 0 && (
                          <StationDropdown>
                            {filteredStations.map((station) => (
                              <StationOption
                                key={`${station.station_cd}-${station.line_num}`}
                                onClick={() => handleStationSelect(station)}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}
                                >
                                  <TrainIcon
                                    sx={{
                                      fontSize: '16px',
                                      color: 'text.secondary',
                                    }}
                                  />
                                  <Typography variant="body2" fontWeight={500}>
                                    {station.station_nm}
                                  </Typography>
                                </Box>
                                <LineChip
                                  label={station.line_num}
                                  size="small"
                                  sx={{
                                    backgroundColor: `${getLineColor(station.line_num)}15`,
                                    color: getLineColor(station.line_num),
                                    border: `1px solid ${getLineColor(station.line_num)}30`,
                                  }}
                                />
                              </StationOption>
                            ))}
                          </StationDropdown>
                        )}
                      </StationSearchContainer>
                      <Button
                        variant="contained"
                        onClick={() => handleAddGuestFriend()}
                        disabled={!friendName.trim() || !selectedStation}
                        startIcon={<AddIcon />}
                        sx={{
                          backgroundColor: theme.palette.custom.secondary,
                          borderRadius: '8px',
                          px: { xs: 2, sm: 3 },
                          py: { xs: 1.2, sm: 1.5 },
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          minWidth: { xs: '100%', sm: 'auto' },
                          height: { xs: '40px', sm: '48px' },
                          '&:hover': {
                            backgroundColor: theme.palette.custom.secondary,
                            filter: 'brightness(0.9)',
                          },
                          // 아이폰 SE 대응
                          '@media (max-width: 375px)': {
                            fontSize: '0.75rem',
                            height: '36px',
                            px: 1.5,
                            py: 1,
                          },
                        }}
                      >
                        추가
                      </Button>
                    </FormRow>
                  </AddFriendForm>

                  {/* 추가된 친구들 목록 */}
                  {guestFriends.length > 0 && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          color: 'text.secondary',
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          // 아이폰 SE 대응
                          '@media (max-width: 375px)': {
                            fontSize: '0.75rem',
                            mb: 1.5,
                          },
                        }}
                      >
                        추가된 친구들 ({guestFriends.length}명)
                      </Typography>

                      {/* 모바일: 칩 형태로 표시 */}
                      {isMobile ? (
                        <ChipsContainer>
                          {guestFriends.map((friend) => (
                            <FriendChip
                              key={friend.id}
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                  }}
                                >
                                  <PersonIcon sx={{ fontSize: '14px' }} />
                                  <span>{friend.name}</span>
                                  <TrainIcon
                                    sx={{ fontSize: '12px', opacity: 0.7 }}
                                  />
                                  <span
                                    style={{ fontSize: '0.75em', opacity: 0.8 }}
                                  >
                                    {friend.start_station}
                                  </span>
                                </Box>
                              }
                              onDelete={() =>
                                handleRemoveGuestFriend(friend.id)
                              }
                              deleteIcon={<CloseIcon />}
                            />
                          ))}
                        </ChipsContainer>
                      ) : (
                        /* 데스크톱: 카드 형태로 표시 */
                        guestFriends.map((friend) => (
                          <Card
                            key={friend.id}
                            sx={{
                              marginBottom: 1.5,
                              borderRadius: '12px',
                              border: '1px solid rgba(0,0,0,0.06)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                transform: 'translateY(-1px)',
                              },
                            }}
                          >
                            <CardContent
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 2,
                                '&:last-child': {
                                  paddingBottom: 2,
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5,
                                }}
                              >
                                <PersonIcon
                                  sx={{
                                    color: 'text.secondary',
                                    fontSize: '20px',
                                  }}
                                />
                                <Box>
                                  <Typography variant="body1" fontWeight={600}>
                                    {friend.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.5,
                                    }}
                                  >
                                    <TrainIcon sx={{ fontSize: '16px' }} />
                                    {friend.start_station}
                                  </Typography>
                                </Box>
                              </Box>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleRemoveGuestFriend(friend.id)
                                }
                                sx={{
                                  color: 'text.secondary',
                                  '&:hover': {
                                    color: 'error.main',
                                    backgroundColor: 'error.light',
                                  },
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </Box>
                  )}
                </Box>
              )}

              {/* 내 그룹 탭 (로그인 시에만) */}
              {isLoggedIn &&
                tabValue === 1 &&
                (mockFriendGroups.length > 0 ? (
                  <TodayFriendCard
                    friendGroups={mockFriendGroups}
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
                ))}

              {/* 검색 탭 (로그인 시에만) */}
              {isLoggedIn && tabValue === 2 && (
                <TodayFriendSearch
                  selectedFriends={selectedFriends}
                  friends={friends}
                  onFriendSelect={handleFriendSelect}
                  placeholder="친구 이름을 검색해보세요"
                />
              )}
            </ScrollableContent>
          </ContentSection>
        </StyledPaper>
      </MainContentWrapper>
    </StyledContainer>
  );
};

export default TodayFriendBox;
