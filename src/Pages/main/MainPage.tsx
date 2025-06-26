import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router';
import RecommendStationBox from '../../domain/recommendation/ui/recommendStation/recommendStationBox';
import TodayFriendBox from '../../domain/user/ui/todayFriendMeet/todayFriendBox';


const LinkBtn = styled(Box)({
  padding: '8px',
  border: 'solid 1px red',
  color: 'black',
});

const MainPage: React.FC = () => {
  return (
    <div>
      <Typography sx={{ color: 'primary.main' }}>테스트</Typography>
      <TodayFriendBox/>
      <RecommendStationBox />
    </div>
  );
};

export default MainPage;
