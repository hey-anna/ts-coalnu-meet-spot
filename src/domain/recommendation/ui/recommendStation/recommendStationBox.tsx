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
  maxWidth: '800px', // todayFriendBox와 동일하게 변경
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    maxWidth: '100%',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
  },
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flex: 1,
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    width: 32,
    height: 32,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '18px',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  flex: 3, // todayFriendBox와 동일
  height: '500px', // todayFriendBox와 동일
  
  [theme.breakpoints.down('md')]: {
    height: '400px',
    flex: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    height: '70vh',
    minHeight: '400px',
    borderRadius: '16px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    height: '75vh',
    minHeight: '350px',
    borderRadius: '12px',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  padding: theme.spacing(2.5),
  flexShrink: 0,
  '& .MuiTab-root': {
    fontSize: '0.95rem',
    fontWeight: 600,
    padding: theme.spacing(2, 3),
    minHeight: 56,
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      padding: theme.spacing(1.5, 2),
      minHeight: 40,
      minWidth: '80px',
    },
    
    // 아이폰 SE 대응
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
      padding: theme.spacing(1, 1.5),
      minHeight: 36,
      minWidth: '70px',
    },
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
  flexShrink: 0,
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
  },
}));

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  
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

interface RecommendStationBoxProps {
  onStationsChange?: (stations: string[]) => void;
  selectedStations?: string[]; 
}

const RecommendStationBox: React.FC<RecommendStationBoxProps> = ({ 
  onStationsChange, 
  selectedStations = [] 
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  React.useEffect(() => {
    if (onStationsChange) {
      onStationsChange(selectedStations);
    }
  }, [selectedStations, onStationsChange]);

  // SUBWAY_STATIONS이 존재하는지 확인하고 안전하게 처리
  const allStations = SUBWAY_STATIONS || [];
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900); // todayFriendBox와 동일한 기준
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
    if (onStationsChange && selectedStations) {
      const isAlreadySelected = selectedStations.includes(stationName);
      if (isAlreadySelected) {
        onStationsChange(selectedStations.filter(name => name !== stationName));
      } else {
        onStationsChange([...selectedStations, stationName]);
      }
    }
  };

  return (
    <StyledContainer>
      {/* 헤더 - todayFriendBox와 동일한 구조 */}
      <HeaderSection>
        <HeaderIcon>
          <TrainIcon />
        </HeaderIcon>
        <Typography variant="h5" fontWeight={700} sx={{ 
          fontSize: { xs: '1.1rem', sm: '1.4rem' }, 
          flex: 1,
          // 아이폰 SE 대응
          '@media (max-width: 375px)': {
            fontSize: '1rem',
          },
        }}>
          만남 장소 후보 선택
        </Typography>
      </HeaderSection>

      {/* 메인 콘텐츠 - todayFriendBox와 동일한 구조 */}
      <MainContentWrapper>
        <StyledPaper sx={{ 
          [theme.breakpoints.down('md')]: { order: 1 }
        }}>
          {/* 탭 */}
          <StyledTabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="인기 지역" />
            <Tab label="검색" />
          </StyledTabs>

          {/* 콘텐츠 영역 */}
          <ContentSection>
            <ScrollableContent>
              {/* 인기 지역 탭 */}
              {tabValue === 0 && (
                popularStations.length > 0 ? (
                  <StationCardGrid
                    stations={popularStations}
                    selectedStations={selectedStations || []}
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
      </MainContentWrapper>
    </StyledContainer>
  );
};

export default RecommendStationBox;