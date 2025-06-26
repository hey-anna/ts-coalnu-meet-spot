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
  minHeight: '70vh'
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
  marginBottom: theme.spacing(3),
  borderRadius: '18px',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  padding:theme.spacing(2.5),
  '& .MuiTab-root': {
    fontSize: '0.95rem',
    fontWeight: 600,
    padding: theme.spacing(2, 3),
    minHeight: 56
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0'
  }
}));

const SelectedStationsBox = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
}));

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
      {/* 헤더 + 탭 + 카드가 모두 합쳐진 하나의 카드 */}
      <StyledPaper>
        {/* 헤더 부분 */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: 2.5,
          paddingBottom: 2
        }}>
          <HeaderIcon>
            <TrainIcon />
          </HeaderIcon>
          <Typography variant="h5" fontWeight={700} sx={{ fontSize: '1.4rem' }}>
            지하철역 선택
          </Typography>
        </Box>

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

        {/* 탭 내용 */}
        <Box sx={{ p: 2.5 }}>
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
        </Box>
      </StyledPaper>

      {/* 선택된 지하철역 */}
      {selectedStations.length > 0 && (
        <SelectedStationsBox>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
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
          <Box>
            {selectedStations.map((stationName) => (
              <SelectedChip
                key={stationName}
                label={`🚇 ${stationName}`}
                onDelete={() => handleRemoveStation(stationName)}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </Box>
        </SelectedStationsBox>
      )}
    </StyledContainer>
  );
};

export default RecommendStationBox;