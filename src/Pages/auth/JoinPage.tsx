import { Box } from '@mui/material';
import React from 'react';
import SignUpForm from '../../domain/auth/ui/SignUpForm';

const JoinPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <SignUpForm />
    </Box>
  );
};

export default JoinPage;
