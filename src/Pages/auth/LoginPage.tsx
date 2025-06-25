import { Box } from '@mui/material';
import React from 'react';
import LoginForm from '../../domain/auth/ui/LoginForm';

const LoginPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
