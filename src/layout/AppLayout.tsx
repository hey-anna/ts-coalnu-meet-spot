import { Outlet } from 'react-router';
import { Box, styled } from '@mui/material';
import Navbar from './components/navbar';
import MobileNavbar from './components/mobileNavbar';
import RecommandList from '../domain/recommandation/ui/todayRecommand/recommandList';

const Layout = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '8px',
  overflow: 'hidden', // 전체 레이아웃 스크롤 막기
});

const LeftSideBar = styled('div')(({ theme }) => ({
  width: '331px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  marginRight: '5px',
  paddingBottom: '8px',
  overflow: 'hidden', // 사이드바 스크롤 막기
}));

const RightSideBar = styled('div')(({ theme }) => ({
  width: '331px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  marginRight: '5px',
  paddingBottom: '8px',
  overflow: 'hidden', // 사이드바 스크롤 막기
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
}));

// 메인 콘텐츠 영역 (Navbar + Outlet)
const MainContentArea = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  height: '100%', // 전체 높이 사용
  padding: '8px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // 메인 영역 스크롤 막기
}));

// Navbar 영역 (고정)
const NavbarArea = styled(Box)({
  flexShrink: 0, // 크기 고정
});

// Outlet 영역 (스크롤 가능)
const OutletArea = styled(Box)({
  flex: 1, // 남은 공간 모두 차지
  overflow: 'auto', // 여기서만 스크롤!
  marginTop: '8px', // Navbar와 간격
  overflowX: 'hidden',
  // 커스텀 스크롤바 디자인
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    margin: '4px',
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.5)',
    },
    '&:active': {
      background: 'rgba(255, 255, 255, 0.7)',
    },
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },

  // Firefox 스크롤바 스타일
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
});

// const Navlist = styled("ul")(({theme})=>({
//     listStyle:"none",
//     padding:0,
//     margin:0
// }));

// const StyledNavLink = styled(NavLink)(({theme})=>({
//     textDecoration:"none",
//     display:"flex",
//     alignItems:"center",
//     gap:"20px",
//     margin:"20px",
//     color:theme.palette.text.secondary,
//     "&:hover":{
//         color:theme.palette.text.primary,
//     },
//     "&.active":{
//         color:theme.palette.text.primary,
//     },
// }));

const AppLayout = () => {
  return (
    <Layout>
      <LeftSideBar>
        <ContentBox>LeftSideBar</ContentBox>
      </LeftSideBar>

      <MainContentArea>
        <NavbarArea>
          <Navbar />
        </NavbarArea>
        <RecommandList />
        <OutletArea>
          <Outlet />
        </OutletArea>
        <NavbarArea>
          <MobileNavbar />
        </NavbarArea>
      </MainContentArea>
      <RightSideBar>
        <ContentBox>RightSideBar</ContentBox>
      </RightSideBar>
    </Layout>
  );
};

export default AppLayout;
