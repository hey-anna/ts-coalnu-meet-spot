import { Outlet } from 'react-router';
import { Box, styled } from '@mui/material';
import Navbar from './components/navbar';
import MobileNavbar from './components/mobileNavbar';
import TodayRecommend from '../domain/recommendation/ui/todayRecommend/todayRecommend';


const Layout = styled("div")(({theme})=>({
    display:"flex",
    flexDirection: "column",
    height:"100vh",
    padding:"8px",
    backgroundColor: theme.palette.background.default,
    overflow: "hidden", // 전체 레이아웃 스크롤 막기
}));

const MainLayout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 70px)", // Navbar 높이만큼 빼기
  padding: "8px",
  overflow: "hidden",
}));

const RightSideBar = styled("div")(({theme})=>({
    width:"30%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    [theme.breakpoints.down("sm")]:{
        display:"none",
    },
    marginRight:"5px",
    paddingBottom:"8px",
    overflowY: "auto", // Y축 스크롤만 허용
    overflowX: "hidden", // X축 스크롤 차단
    
    // 세련된 스크롤바 디자인
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(108, 92, 231, 0.3)',
        borderRadius: '2px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            background: 'rgba(108, 92, 231, 0.6)',
            width: '6px',
        },
    },
    '&:hover::-webkit-scrollbar-thumb': {
        background: 'rgba(108, 92, 231, 0.5)',
    },
    '&::-webkit-scrollbar-corner': {
        background: 'transparent',
    },
    
    // Firefox - 미니멀한 스타일
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(108, 92, 231, 0.3) transparent',
    
    // 스크롤 영역에 패딩 추가 (스크롤바 공간 확보)
    paddingRight: '2px',
}));

const ContentBox = styled(Box)(({theme})=>({
    borderRadius:"8px",
    backgroundColor:theme.palette.background.default,
    color:theme.palette.text.primary,
    width:"100%",
    padding:"8px",
    boxSizing: "border-box",
    // 스크롤을 위한 최소 높이 설정
    minHeight: "100%",
}));

// 메인 콘텐츠 영역 (Navbar + Outlet)
const MainContentArea = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
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
const NavbarArea = styled(Box)(({theme})=>({
  width: "100%",
  flexShrink: 0, // 크기 고정
  zIndex: 1000, // 다른 요소들 위에 표시
  backgroundColor: theme.palette.background.paper,
}));

// Outlet 영역 (스크롤 가능)
const OutletArea = styled(Box)(({theme})=>({
    flex: 1, // 남은 공간 모두 차지
    overflowY: "auto", // Y축 스크롤만 허용
    overflowX: "hidden", // X축 스크롤 차단
    marginTop: "8px", // Navbar와 간격
    
    // 세련된 스크롤바 디자인
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(108, 92, 231, 0.3)',
        borderRadius: '2px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            background: 'rgba(108, 92, 231, 0.6)',
        },
    },
    '&:hover::-webkit-scrollbar-thumb': {
        background: 'rgba(108, 92, 231, 0.5)',
    },
    '&::-webkit-scrollbar-corner': {
        background: 'transparent',
    },
    
    // Firefox - 미니멀한 스타일
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(108, 92, 231, 0.3) transparent',
    
    // 스크롤 영역에 패딩 추가
    paddingRight: '2px',
}));

const AppLayout = () => {
  return (

        <Layout>
            <NavbarArea>
                <Navbar/>
            </NavbarArea>
            <MainLayout>
                <MainContentArea>
                    <OutletArea>
                        <Outlet />
                    </OutletArea>
                    <NavbarArea>
                        <MobileNavbar/>
                    </NavbarArea>
                </MainContentArea>
                <RightSideBar>
                    <ContentBox>
                        <TodayRecommend/>
                    </ContentBox>
                </RightSideBar>
            </MainLayout>
        </Layout>
  )
}

export default AppLayout;
