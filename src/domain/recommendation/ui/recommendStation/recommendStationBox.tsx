import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Tab,
  Tabs,
  Chip,
  Button,
  Paper
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import TrainIcon from '@mui/icons-material/Train';
import CloseIcon from '@mui/icons-material/Close';
import { SUBWAY_STATIONS } from '../../../../shared/config/config';

// 분리된 컴포넌트들 import
import StationCardGrid from './recommendStationCard';
import StationSearch from './recommendStationSearch';

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '600px',
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  height: '100%', // 전체 높이 사용
  display: 'flex',
  flexDirection: 'column',
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '18px',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  
  // 반응형 높이 설정
  height: '600px', // 데스크톱
  [theme.breakpoints.down('md')]: {
    height: '470px', // 태블릿
  },
  [theme.breakpoints.down('sm')]: {
    height: '430px', // 모바일
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  padding: theme.spacing(2.5),
  flexShrink: 0, // 크기 고정
  '& .MuiTab-root': {
    fontSize: '0.95rem',
    fontWeight: 600,
    padding: theme.spacing(2, 3),
    minHeight: 56,
    
    // 모바일에서 탭 크기 조정
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      padding: theme.spacing(1.5, 2),
      minHeight: 48,
    },
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0'
  },
  
  // 모바일에서 패딩 조정
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
  flexShrink: 0, // 크기 고정
  
  // 모바일에서 패딩 조정
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  flex: 1, // 남은 공간 모두 차지
  overflow: 'hidden', // 넘치는 내용 숨김
  display: 'flex',
  flexDirection: 'column',
  
  // 모바일에서 패딩 조정
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: 'auto', // 세로 스크롤만 허용
  overflowX: 'hidden',
  
  // 커스텀 스크롤바
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(0,0,0,0.3)',
    },
  },
});

const SelectedStationsBox = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  
  // 반응형 최대 높이 설정
  maxHeight: '200px', // 데스크톱
  [theme.breakpoints.down('md')]: {
    maxHeight: '180px', // 태블릿
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '150px', // 모바일
  },
  [theme.breakpoints.down(400)]: {
    maxHeight: '120px', // 작은 모바일
  },
}));

const SelectedChipsContainer = styled(Box)({
  overflowY: 'auto',
  overflowX: 'hidden',
  flex: 1,
  
  // 커스텀 스크롤바
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '2px',
  },
});

const SelectedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  margin: theme.spacing(0.4),
  borderRadius: '12px',
  height: 32,
  fontSize: '0.85rem',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '18px',
    '&:hover': {
      color: 'white'
    }
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '14px',
  padding: theme.spacing(1.5, 3),
  fontSize: '0.95rem',
  fontWeight: 600,
  minWidth: 110,
  height: 48
}));

const RecommendStationBox: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  // SUBWAY_STATIONS이 존재하는지 확인하고 안전하게 처리
  const allStations = SUBWAY_STATIONS || [];
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 600); // 600px 미만을 모바일로 판단
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const popularStations = allStations.slice(0, isMobile ? 4 : 8);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStationSelect = (stationName: string) => {
    setSelectedStations(prev => 
      prev.includes(stationName)
        ? prev.filter(name => name !== stationName)
        : [...prev, stationName]
    );
  };

  const handleRemoveStation = (stationName: string) => {
    setSelectedStations(prev => prev.filter(name => name !== stationName));
  };

  const handleClearAll = () => {
    setSelectedStations([]);
  };

  return (
    <StyledContainer>
      {/* 메인 카드 - 고정 높이 */}
      <StyledPaper>
        {/* 헤더 부분 - 고정 */}
        <HeaderSection>
          <HeaderIcon>
            <TrainIcon />
          </HeaderIcon>
          <Typography variant="h5" fontWeight={700} sx={{ 
            fontSize: { xs: '1.2rem', sm: '1.4rem' } // 모바일에서 폰트 크기 조정
          }}>
            지하철역 선택
          </Typography>
        </HeaderSection>

        {/* 탭 - 고정 */}
        <StyledTabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="인기 지역" />
          <Tab label="검색" />
        </StyledTabs>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <ContentSection>
          <ScrollableContent>
            {/* 인기 지역 탭 */}
            {tabValue === 0 && (
              popularStations.length > 0 ? (
                <StationCardGrid
                  stations={popularStations}
                  selectedStations={selectedStations}
                  onStationSelect={handleStationSelect}
                />
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    지하철역 데이터를 불러오는 중입니다...
                  </Typography>
                </Box>
              )
            )}

            {/* 검색 탭 */}
            {tabValue === 1 && (
              allStations.length > 0 ? (
                <StationSearch
                  onStationSelect={handleStationSelect}
                  placeholder="지하철역 이름을 검색해보세요"
                />
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    지하철역 데이터를 불러오는 중입니다...
                  </Typography>
                </Box>
              )
            )}
          </ScrollableContent>
        </ContentSection>
      </StyledPaper>

      {/* 선택된 지하철역 - 높이 제한 */}
      {selectedStations.length > 0 && (
        <SelectedStationsBox>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2,
              flexShrink: 0
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
              선택된 지하철역
            </Typography>
            <ActionButton 
              variant="outlined" 
              size="small"
              onClick={handleClearAll}
              sx={{ 
                minWidth: 'auto',
                px: 2,
                py: 0.5,
                fontSize: '0.875rem'
              }}
            >
              전체 삭제
            </ActionButton>
          </Box>
          <SelectedChipsContainer>
            {selectedStations.map((stationName) => (
              <SelectedChip
                key={stationName}
                label={`🚇 ${stationName}`}
                onDelete={() => handleRemoveStation(stationName)}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </SelectedChipsContainer>
        </SelectedStationsBox>
      )}
    </StyledContainer>
  );
};

export default RecommendStationBox;