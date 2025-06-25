import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router';
import RecommendStationBox from '../../domain/recommendation/ui/recommendStation/recommendStationBox';

const LinkBtn = styled(Box)({
  padding: '8px',
  border: 'solid 1px red',
  color: 'black',
});

const MainPage: React.FC = () => {
  return (
    <div>
      <Typography sx={{ color: 'primary.main' }}>테스트</Typography>

      <RecommendStationBox />
    </div>
  );
};

export default MainPage;
