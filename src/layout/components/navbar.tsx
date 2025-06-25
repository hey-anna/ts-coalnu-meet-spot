import { Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../domain/user/store/userStore';
import useGetUserApi from '../../domain/user/hooks/useGetUserApi';
import useLogout from '../../domain/auth/hooks/useLogout';
import { useNavigate } from 'react-router';

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
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

  return (
    <>
      <div>navbar</div>
      <LoginButton onClick={handleLogin}>
        {isLogin ? '로그아웃' : '로그인'}
      </LoginButton>
    </>
  );
};

export default navbar;
