import { Outlet, useLocation } from 'react-router';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './components/navbar';
import TodayRecommend from '../domain/recommendation/ui/todayRecommend/todayRecommend';
import {RecommendSideBar} from '../domain/recommendation/store/store'

const Layout = styled("div")(({theme})=>({
    display:"flex",
    flexDirection: "column",
    height:"100vh",
    padding:"8px",
    backgroundColor: theme.palette.background.default,
    overflow: "hidden", // 전체 레이아웃 스크롤 막기
    
    // 모바일 최적화
    [theme.breakpoints.down("sm")]: {
        height: "auto",
        minHeight: "100vh",
        overflow: "visible", // 모바일에서는 자연스러운 스크롤
        padding: "4px",
    },
}));

const MainLayout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 70px)", // Navbar 높이만큼 빼기
  padding: "8px",
  overflow: "hidden",
  
  // 모바일 최적화
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    flexDirection: "column", // 모바일에서는 세로 배치
    overflow: "visible",
    padding: "4px",
  },
}));

const RightSideBar = styled("div")(({theme})=>({
    width:"30%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    [theme.breakpoints.down("sm")]:{
        display:"none", // 모바일에서는 사이드바 숨김
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
    
    // 모바일 최적화
    [theme.breakpoints.down("sm")]: {
        padding: "4px",
        borderRadius: "4px",
    },
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
  
  // 모바일 최적화
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    overflow: "visible", // 모바일에서는 자연스러운 흐름
    padding: "4px",
    borderRadius: "4px",
  },
}));

// Navbar 영역 (고정)
const NavbarArea = styled(Box)(({theme})=>({
  width: "100%",
  flexShrink: 0, // 크기 고정
  zIndex: 1000, // 다른 요소들 위에 표시
  backgroundColor: theme.palette.background.paper,
  
  // 모바일 최적화
  [theme.breakpoints.down("sm")]: {
    position: "sticky",
    top: 0,
    zIndex: 1100, // 모바일에서 더 높은 z-index
  },
}));

// Outlet 영역 (데스크톱에서만 스크롤, 모바일에서는 자연스러운 흐름)
const OutletArea = styled(Box)(({theme})=>({
    flex: 1, // 남은 공간 모두 차지
    overflowY: "auto", // Y축 스크롤만 허용
    overflowX: "hidden", // X축 스크롤 차단
    marginTop: "8px", // Navbar와 간격
    
    // 세련된 스크롤바 디자인 (데스크톱만)
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
    
    // Firefox - 미니멀한 스타일 (데스크톱만)
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(108, 92, 231, 0.3) transparent',
    
    // 스크롤 영역에 패딩 추가
    paddingRight: '2px',
    
    // 모바일 최적화 - 스크롤 제거하고 자연스러운 흐름
    [theme.breakpoints.down("sm")]: {
        flex: "none", // flex 해제
        height: "auto", // 자동 높이
        overflowY: "visible", // 스크롤 제거
        overflowX: "visible",
        marginTop: "4px",
        paddingRight: 0,
        
        // 모바일에서 스크롤바 숨김
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
    },
}));

const AppLayout = () => {
    const { sidebarContent } = RecommendSideBar();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // 사이드바 콘텐츠 결정
    const getSidebarContent = () => {
        // store에 커스텀 사이드바가 있으면 그것을 사용
        if (sidebarContent) {
        return sidebarContent;
        }
        
        // 없으면 기본 TodayRecommend
        return <TodayRecommend />;
    };

    // 동적 스타일 생성
    const getDynamicLayoutStyle = () => ({
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "auto" : "100vh",
        minHeight: "100vh",
        padding: isMobile ? "4px" : "8px",
        backgroundColor: theme.palette.background.default,
        overflow: isMobile ? "visible" : "hidden",
    });

    const getDynamicMainLayoutStyle = () => ({
        display: "flex",
        height: isMobile ? "auto" : "calc(100vh - 70px)",
        padding: isMobile ? "4px" : "8px",
        overflow: "visible",
        flexDirection: isMobile ? "column" : "row",
    });

    const getDynamicMainContentStyle = () => ({
        borderRadius: isMobile ? '4px' : '8px',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        width: '100%',
        height: isMobile ? "auto" : '100%',
        padding: isMobile ? "4px" : '8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: "visible",
    });

    const getDynamicOutletStyle = () => ({
        flex: isMobile ? "none" : 1,
        height: "auto",
        overflow: isMobile ? "visible" : "auto",
        marginTop: isMobile ? "4px" : "8px",
        paddingRight: isMobile ? 0 : '2px',
        
        // 데스크톱에서만 커스텀 스크롤바
        ...(isMobile ? {} : {
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
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(108, 92, 231, 0.3) transparent',
        }),
    });

    const getDynamicNavbarStyle = () => ({
        width: "100%",
        flexShrink: 0,
        zIndex: isMobile ? 1100 : 1000,
        backgroundColor: theme.palette.background.paper,
        // 모바일에서는 sticky 제거하여 브라우저 스크롤 사용
        position: "static",
    });

  return (
        <Box sx={getDynamicLayoutStyle()}>
            <Box sx={getDynamicNavbarStyle()}>
                <Navbar/>
            </Box>
            <Box sx={getDynamicMainLayoutStyle()}>
                <Box sx={getDynamicMainContentStyle()}>
                    <Box sx={getDynamicOutletStyle()}>
                        <Outlet />
                    </Box>
                </Box>
                {!isMobile && (
                    <RightSideBar>
                        <ContentBox>
                            {getSidebarContent()}
                        </ContentBox>
                    </RightSideBar>
                )}
            </Box>
        </Box>
  )
}

export default AppLayout;