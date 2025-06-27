import {
  Button,
  styled,
  AppBar,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../domain/user/store/userStore';
import useGetUserApi from '../../domain/user/hooks/useGetUserApi';
import useLogout from '../../domain/auth/hooks/useLogout';
import { useNavigate } from 'react-router';

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
  cursor: 'pointer',
  gap: '12px',
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

const navbar = () => {
  const { user: loginUser, setUser } = useUserStore();
  const { data: fetchedUser, isLoading, isError } = useGetUserApi();
  const { mutate: logout } = useLogout();

  const navigate = useNavigate();

  const isLogin = !!loginUser?.email && !!loginUser?.id;

  useEffect(() => {
    if (fetchedUser?.user?.email && fetchedUser.user.id) {
      setUser({
        email: fetchedUser.user.email,
        id: fetchedUser.user.id,
      });
    }
  }, [fetchedUser]);

  const handleLogin = () => {
    if (isLogin) {
      logout();
    } else {
      console.log('클릭');
      navigate('/login');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* 로고 영역 */}
        <LogoContainer onClick={handleLogoClick}>
          <LogoImage src="/meetspot_logo_font.png" alt="MeetSpot Logo" />
          <LogoText>어디서 만날까?</LogoText>
        </LogoContainer>

        {/* 로그인/로그아웃 버튼 영역 */}
        <Box>
          {isLogin ? (
            <LogoutButton onClick={handleLogin}>로그아웃</LogoutButton>
          ) : (
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default navbar;
