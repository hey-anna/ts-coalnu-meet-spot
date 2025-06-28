import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Paper,
  Container,
  type Theme
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import places from '../../apis/api';
import type { PlaceData } from '../../models/model';
import RecommendPlaceCard from './recommendPlaceCard';

interface RecommendResultInfoProps {
  location: string;
}

// 스타일 변수들을 컴포넌트 외부에서 선언 - 이미지 참고한 깔끔한 디자인
const createContainerStyles = (theme: Theme, isMobile: boolean) => ({
  backgroundColor: '#fafafa',
  py: isMobile ? 2 : 3
});

const createInnerContainerStyles = (isMobile: boolean) => ({
  maxWidth: '600px',
  mx: 'auto',
  px: isMobile ? 1.5 : 2
});

const createHeaderContainerStyles = (isMobile: boolean) => ({
  mb: isMobile ? 2 : 3,
  textAlign: 'center'
});

const createTitleStyles = (theme: Theme, isMobile: boolean) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  mb: 1,
  fontSize: isMobile ? '1.3rem' : '1.5rem'
});

const createSubtitleStyles = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem'
});

const createTabContainerStyles = (theme: Theme, isMobile: boolean) => ({
  mb: isMobile ? 2 : 3,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 3,
  border: `1px solid ${theme.palette.divider}`,
  p: 0.5,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
});

const createButtonGroupStyles = (isMobile: boolean) => ({
  '& .MuiButton-root': {
    borderRadius: 2.5,
    py: isMobile ? 1 : 1.4,
    px: isMobile ? 1.5 : 3,
    fontWeight: 600,
    fontSize: isMobile ? '0.85rem' : '1rem',
    textTransform: 'none',
    border: 'none',
    '&:not(:last-child)': {
      borderRight: 'none'
    }
  }
});

const createTabButtonStyles = (
  theme: Theme, 
  tab: '맛집' | '카페', 
  activeTab: '맛집' | '카페'
) => ({
  backgroundColor: activeTab === tab ? 
    theme.palette.background.default : 
    'transparent',
  color: activeTab === tab ? 
    (tab === '맛집' ? theme.palette.custom.restaurant : theme.palette.custom.cafe) : 
    theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: activeTab !== tab ? 
      (tab === '맛집' ? theme.palette.custom.restaurantLight : theme.palette.custom.cafeLight) : 
      theme.palette.background.default,
    border: 'none'
  }
});

const createContentContainerStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 3,
  border: `1px solid ${theme.palette.divider}`,
  minHeight: '300px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
});

const createContentHeaderStyles = (theme: Theme, isMobile: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  gap: isMobile ? 1 : 1.5,
  p: isMobile ? 1.5 : 2.5,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#fafafa'
});

const createContentIconStyles = (theme: Theme, activeTab: '맛집' | '카페', isMobile: boolean) => ({
  fontSize: isMobile ? 20 : 28,
  color: activeTab === '맛집' ? theme.palette.custom.restaurant : theme.palette.custom.cafe
});

const createContentTitleStyles = (theme: Theme, isMobile: boolean) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontSize: isMobile ? '1rem' : '1.1rem'
});

const createContentBodyStyles = (isMobile: boolean) => ({
  p: isMobile ? 1.5 : 2
});

const loadingContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '300px',
  flexDirection: 'column',
  gap: 2
};

const createLoadingSpinnerStyles = (theme: Theme, activeTab: '맛집' | '카페') => ({
  color: activeTab === '맛집' ? theme.palette.custom.restaurant : theme.palette.custom.cafe
});

const createLoadingTextStyles = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem'
});

const createEmptyStateStyles = (isMobile: boolean) => ({
  textAlign: 'center',
  py: isMobile ? 6 : 8,
  px: 3
});

const createEmptyTextStyles = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem'
});

// 위치 정보 없음 스타일
const createNoLocationContainerStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 3,
  border: `1px solid ${theme.palette.divider}`,
  minHeight: '400px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const createNoLocationContentStyles = (isMobile: boolean) => ({
  textAlign: 'center',
  py: isMobile ? 4 : 6,
  px: 3
});

const createNoLocationIconStyles = (theme: Theme, isMobile: boolean) => ({
  fontSize: isMobile ? 48 : 64,
  color: theme.palette.text.secondary,
  mb: 2,
  opacity: 0.6
});

const createNoLocationTextStyles = (theme: Theme, isMobile: boolean) => ({
  color: theme.palette.text.secondary,
  fontSize: isMobile ? '1rem' : '1.1rem',
  fontWeight: 500,
  mb: 1
});

const createNoLocationSubTextStyles = (theme: Theme, isMobile: boolean) => ({
  color: theme.palette.text.secondary,
  fontSize: isMobile ? '0.8rem' : '0.9rem',
  opacity: 0.8
});

const RecommendResultInfo: React.FC<RecommendResultInfoProps> = ({ location }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState<'맛집' | '카페'>('맛집');
  const [restaurants, setRestaurants] = useState<PlaceData[]>([]);
  const [cafes, setCafes] = useState<PlaceData[]>([]);
  const [loading, setLoading] = useState(false);

  // location 유효성 검사 함수
  const isValidLocation = (loc: string): boolean => {
    return loc && typeof loc === 'string' && loc.trim().length > 0;
  };

  // 스타일 변수들 적용
  const containerStyles = createContainerStyles(theme, isMobile);
  const innerContainerStyles = createInnerContainerStyles(isMobile);
  const headerContainerStyles = createHeaderContainerStyles(isMobile);
  const titleStyles = createTitleStyles(theme, isMobile);
  const subtitleStyles = createSubtitleStyles(theme);
  const tabContainerStyles = createTabContainerStyles(theme, isMobile);
  const buttonGroupStyles = createButtonGroupStyles(isMobile);
  const contentContainerStyles = createContentContainerStyles(theme);
  const contentHeaderStyles = createContentHeaderStyles(theme, isMobile);
  const contentTitleStyles = createContentTitleStyles(theme, isMobile);
  const contentBodyStyles = createContentBodyStyles(isMobile);
  const loadingSpinnerStyles = createLoadingSpinnerStyles(theme, activeTab);
  const loadingTextStyles = createLoadingTextStyles(theme);
  const emptyTextStyles = createEmptyTextStyles(theme);
  const emptyStateStyles = createEmptyStateStyles(isMobile);
  const contentIconStyles = createContentIconStyles(theme, activeTab, isMobile);
  
  // 위치 정보 없음 스타일
  const noLocationContainerStyles = createNoLocationContainerStyles(theme);
  const noLocationContentStyles = createNoLocationContentStyles(isMobile);
  const noLocationIconStyles = createNoLocationIconStyles(theme, isMobile);
  const noLocationTextStyles = createNoLocationTextStyles(theme, isMobile);
  const noLocationSubTextStyles = createNoLocationSubTextStyles(theme, isMobile);

  useEffect(() => {
    // location이 유효하지 않으면 API 호출하지 않음
    if (!isValidLocation(location)) {
      return;
    }

    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const [restaurantData, cafeData] = await Promise.all([
          places(location, '맛집'),
          places(location, '카페')
        ]);
        
        setRestaurants(restaurantData);
        setCafes(cafeData);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
        setRestaurants([]);
        setCafes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location]);

  // location이 유효하지 않은 경우 처리
  if (!isValidLocation(location)) {
    return (
      <Box sx={containerStyles}>
        <Box sx={innerContainerStyles}>
          <Paper elevation={0} sx={noLocationContainerStyles}>
            <Box sx={noLocationContentStyles}>
              <LocationOffIcon sx={noLocationIconStyles} />
              <Typography 
                variant={isMobile ? "h6" : "h5"}
                sx={noLocationTextStyles}
              >
                위치 정보를 불러오는 중입니다
              </Typography>
              <Typography 
                variant="body2"
                sx={noLocationSubTextStyles}
              >
                잠시만 기다려주세요...
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }

  const currentData = activeTab === '맛집' ? restaurants : cafes;

  return (
    <Box sx={containerStyles}>
      <Box sx={innerContainerStyles}>
        {/* 탭 메뉴 */}
        <Paper elevation={0} sx={tabContainerStyles}>
          <ButtonGroup 
            fullWidth 
            variant="text"
            sx={buttonGroupStyles}
          >
            {(['맛집', '카페'] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                startIcon={tab === '맛집' ? <RestaurantIcon /> : <LocalCafeIcon />}
                sx={createTabButtonStyles(theme, tab, activeTab)}
              >
                {tab}
              </Button>
            ))}
          </ButtonGroup>
        </Paper>

        {/* 콘텐츠 영역 */}
        <Paper elevation={0} sx={contentContainerStyles}>
          <Box sx={contentHeaderStyles}>
            {activeTab === '맛집' ? (
              <RestaurantIcon sx={contentIconStyles} />
            ) : (
              <LocalCafeIcon sx={contentIconStyles} />
            )}
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"}
              component="h2"
              sx={contentTitleStyles}
            >
              {location} 근처 {activeTab}
            </Typography>
          </Box>

          <Box sx={contentBodyStyles}>
            {loading ? (
              <Box sx={loadingContainerStyles}>
                <CircularProgress 
                  size={40}
                  sx={loadingSpinnerStyles}
                />
                <Typography 
                  variant="body1" 
                  sx={loadingTextStyles}
                >
                  {activeTab} 정보를 불러오는 중...
                </Typography>
              </Box>
            ) : (
              <>
                {currentData.length === 0 ? (
                  <Box sx={emptyStateStyles}>
                    <Typography 
                      variant="body1" 
                      sx={emptyTextStyles}
                    >
                      {location} 근처 {activeTab} 정보가 없습니다.
                    </Typography>
                  </Box>
                ) : (
                  currentData.map((place) => (
                    <RecommendPlaceCard 
                      key={place.id} 
                      place={place} 
                      activeTab={activeTab}
                    />
                  ))
                )}
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default RecommendResultInfo;