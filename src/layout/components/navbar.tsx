import {
  Button,
  styled,
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  getLineColor,
  STATION_CONFIG,
} from '../../shared/config/stationConfig';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../domain/user/store/userStore';
import useGetUserApi from '../../domain/user/hooks/useGetUserApi';
import useLogout from '../../domain/auth/hooks/useLogout';
import { useNavigate } from 'react-router';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UserInfoUpdateForm from '@/domain/auth/ui/UserInfoUpdateForm';
import type { StationData } from '@/shared/models/station';
import useUpdateUserInfo from '@/domain/auth/hooks/useUpdateUserInfo';
import { BorderColor } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  border: 'none',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  minHeight: '70px',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end', // 하단 정렬
  gap: '12px',

  width: '100%',
  justifyContent: 'space-between',
});

const LogoImage = styled('img')({
  height: '40px',
  width: 'auto',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '20px',
  padding: '8px 24px',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(108, 92, 231, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(108, 92, 231, 0.4)',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: '20px',
  padding: '8px 24px',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '16px', // 크기 조금 줄임
  fontWeight: 600,
  color: theme.palette.primary.main,
  letterSpacing: '-0.3px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  transition: 'all 0.3s ease-in-out',
  textAlign: 'center',
  whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

const SubMenu = styled(Menu)(({ theme }) => ({
  borderRadius: '8px',

  '& ul': {
    display: 'flex',
    padding: '10px',
    gap: '5px',

    '& li': {
      border: 'solid 2px',
      borderColor: '#6c5ce7',
      borderRadius: '15px',
      color: '#6c5ce7',

      '&:hover': {
        backgroundColor: '#6c5ce7',
        color: 'white',
      },
    },
  },

  [theme.breakpoints.down('sm')]: {
    '& ul': {
      display: 'flex',
      padding: '10px',
      gap: '5px',

      '& li': {
        padding: '0px 10px',
        fontSize: '12px',

        '&:hover': {
          backgroundColor: '#6c5ce7',
          color: 'white',
        },
      },
    },
  },
}));

const SubMenuItem = styled(MenuItem)(({ theme }) => ({
  '& li': {},
}));

const navbar = () => {
  const { user: loginUser, setUser } = useUserStore();
  const { data: fetchedUser, isLoading, isError } = useGetUserApi();
  const { mutate: logout } = useLogout();
  const [isUserInfoUpdateModalOpen, setIsUserInfoUpdateModalOpen] =
    useState(false);
  const [userUpdateInfo, setUserUpdateInfo] = useState({
    name: '',
    station: '',
  });
  // 지하철역 검색 상태
  const [inputValue, setInputValue] = useState(''); // 입력 값을 별도로 관리
  const [searchResults, setSearchResults] = useState<StationData[]>([]);
  const maxResults = 50; // 결과 개수 제한

  const [selectedStation, setSelectedStation] = useState<StationData | null>(
    null,
  );

  const [isMobile, setIsMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const subMenuOpen = Boolean(anchorEl);

  const { mutate: updateUserInfo } = useUpdateUserInfo();

  const navigate = useNavigate();

  const isLogin = !!loginUser?.email && !!loginUser?.id;

  // 모바일인지 체크
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900); // todayFriendBox와 동일한 기준
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (fetchedUser?.email && fetchedUser.id) {
      setUser({
        email: fetchedUser.email,
        id: fetchedUser.id,
        user_name: fetchedUser.user_name,
        user_start_station: fetchedUser.user_start_station,
      });
    }
  }, [fetchedUser]);

  useEffect(() => {
    console.log('loginUser 데이터 : ', loginUser);
  }, [loginUser]);

  const handleLogin = () => {
    if (isLogin) {
      setUser({
        id: '',
        email: '',
        user_name: '',
        user_start_station: '',
      });
      logout();
    } else {
      navigate('/login');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  // 검색 기능
  const handleStationSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // stationConfig의 DATA에서 검색
    const filtered = STATION_CONFIG.DATA.filter(
      (station: StationData) =>
        station.station_nm.includes(query) ||
        station.line_num.includes(query) ||
        station.fr_code.includes(query),
    ).slice(0, maxResults); // 결과 개수 제한

    setSearchResults(filtered);
  };

  // 다이얼로그 닫을 때 검색 상태 초기화
  const handleCloseUserInfoDialog = () => {
    setIsUserInfoUpdateModalOpen(false);
    setUserUpdateInfo({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue('');
    setSearchResults([]);
  };

  // 친구 추가
  const handleUpdateUserInfo = () => {
    console.log('역 데이터 : ', selectedStation);
    if (!userUpdateInfo.name.trim() || !selectedStation) return;

    console.log('userUpdateInfo : ', userUpdateInfo);

    updateUserInfo({
      user_id: loginUser.id,
      user_name: userUpdateInfo.name,
      user_start_station: selectedStation.station_nm,
    });
    setIsUserInfoUpdateModalOpen(false);
    setUserUpdateInfo({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue(''); // 입력값 초기화
    setSearchResults([]);
  };

  const handleSubMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSubMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* 로고 영역 */}
        <LogoContainer onClick={handleLogoClick}>
          <Box
            display="flex"
            alignItems="flex-end"
            gap="12px"
            sx={{ cursor: 'pointer' }}
          >
            <LogoImage src="/meetspot_logo_font.png" alt="MeetSpot Logo" />
            <LogoText>어디서 만날까?</LogoText>
          </Box>

          {/* 로그인/로그아웃 버튼 영역 */}
          <Box sx={{ justifySelf: 'end' }}>
            {isLogin ? (
              !isMobile ? (
                <Box
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  sx={{ color: 'black' }}
                >
                  <Typography>
                    {loginUser?.user_name} / {loginUser?.user_start_station}역
                  </Typography>

                  <IconButton
                    onClick={() => setIsUserInfoUpdateModalOpen(true)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <LogoutButton onClick={handleLogin}>로그아웃</LogoutButton>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="flex-end"
                  gap="10px"
                  sx={{
                    color: 'black',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <Button
                    sx={{ color: 'black', padding: '0' }}
                    onClick={handleSubMenuClick}
                  >
                    {loginUser?.user_name} / {loginUser?.user_start_station}역
                  </Button>

                  <SubMenu
                    anchorEl={anchorEl}
                    open={subMenuOpen}
                    onClose={handleSubMenuClose}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleSubMenuClose();
                        setIsUserInfoUpdateModalOpen(true);
                      }}
                    >
                      정보변경
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleSubMenuClose();
                        handleLogin();
                      }}
                    >
                      로그아웃
                    </MenuItem>
                  </SubMenu>
                </Box>
              )
            ) : (
              <LoginButton onClick={handleLogin}>로그인</LoginButton>
            )}
          </Box>
        </LogoContainer>

        <UserInfoUpdateForm
          isUserInfoUpdateModalOpen={isUserInfoUpdateModalOpen}
          handleCloseUserInfoDialog={handleCloseUserInfoDialog}
          userUpdateInfo={userUpdateInfo}
          setUserUpdateInfo={setUserUpdateInfo}
          searchResults={searchResults}
          selectedStation={selectedStation}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleStationSearch={handleStationSearch}
          setSelectedStation={setSelectedStation}
          getLineColor={getLineColor}
          handleUpdateUserInfo={handleUpdateUserInfo}
        />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default navbar;
