import { Box, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router';

const LinkBtn = styled(Box)({
  padding: '8px',
  border: 'solid 1px red',
  color: 'black',
});

const MainPage = () => {
  return (
    <div>
      <Typography sx={{ color: 'primary.main' }}>테스트</Typography>

      <Box display="flex" gap="10px">
        <LinkBtn>
          <NavLink to={'/join'} style={{ textDecoration: 'none' }}>
            회원가입
          </NavLink>
        </LinkBtn>

        <LinkBtn>
          <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
            로그인
          </NavLink>
        </LinkBtn>
      </Box>
    </div>
  );
};

export default MainPage;
