import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
  type Theme,
  IconButton
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { PlaceData } from '../../models/model';

interface RecommendPlaceCardProps {
  place: PlaceData;
  activeTab: '맛집' | '카페';
}

// 스타일 변수들을 컴포넌트 외부에서 선언 - 이미지 참고한 깔끔한 디자인
const createCardStyles = (theme: Theme, isMobile: boolean) => ({
  mb: 1,
  borderRadius: 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    borderColor: theme.palette.primary.light,
    transform: 'translateY(-1px)',
  }
});

const createCardContentStyles = (isMobile: boolean) => ({
  p: isMobile ? 1.5 : 2.5,
  '&:last-child': { pb: isMobile ? 1.5 : 2.5 }
});

const headerContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  mb: 1
};

const leftSectionStyles = {
  flex: 1,
  minWidth: 0
};

const createTitleStyles = (theme: Theme, isMobile: boolean) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  mb: 0.5,
  fontSize: isMobile ? '1rem' : '1.1rem'
});

const categoryContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.8,
  mb: 1.2
};

const createIconStyles = (theme: Theme, activeTab: '맛집' | '카페', isMobile: boolean) => ({
  color: activeTab === '맛집' ? theme.palette.custom.restaurant : theme.palette.custom.cafe,
  fontSize: isMobile ? 18 : 20
});

const createCategoryTextStyles = (theme: Theme, isMobile: boolean) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
  fontSize: isMobile ? '0.8rem' : '0.9rem'
});

const ratingContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  flexShrink: 0
};

const createDescriptionStyles = (theme: Theme, isMobile: boolean) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  mb: 1.5,
  fontSize: isMobile ? '0.8rem' : '0.9rem',
  display: '-webkit-box',
  WebkitLineClamp: isMobile ? 1 : 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});


const createChipStyles = (theme: Theme, activeTab: '맛집' | '카페', isMobile: boolean) => ({
  backgroundColor: activeTab === '맛집' ? theme.palette.custom.restaurantLight : theme.palette.custom.cafeLight,
  color: activeTab === '맛집' ? theme.palette.custom.restaurant : theme.palette.custom.cafe,
  border: `1px solid ${activeTab === '맛집' ? theme.palette.custom.restaurant : theme.palette.custom.cafe}40`,
  fontWeight: 500,
  fontSize: isMobile ? '0.65rem' : '0.75rem',
  height: isMobile ? 20 : 24,
  '&:hover': {
    backgroundColor: activeTab === '맛집' ? theme.palette.custom.restaurant + '20' : theme.palette.custom.cafe + '20',
  }
});

const createArrowButtonStyles = (theme: Theme) => ({
  color: theme.palette.text.disabled,
  padding: 0.5,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  }
});

const RecommendPlaceCard: React.FC<RecommendPlaceCardProps> = ({ place, activeTab }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

const handlePlaceClick = () => {
    if (place.place_url) {
      window.open(place.place_url, '_blank', 'noopener,noreferrer');
    }
  };

  // 스타일 변수들 적용
  const cardStyles = createCardStyles(theme, isMobile);
  const cardContentStyles = createCardContentStyles(isMobile);
  const titleStyles = createTitleStyles(theme, isMobile);
  const iconStyles = createIconStyles(theme, activeTab, isMobile);
  const categoryTextStyles = createCategoryTextStyles(theme, isMobile);
  const descriptionStyles = createDescriptionStyles(theme, isMobile);
  const chipStyles = createChipStyles(theme, activeTab, isMobile);
  const arrowButtonStyles = createArrowButtonStyles(theme);

  return (
    <Card sx={cardStyles} onClick={handlePlaceClick}>
      <CardContent sx={cardContentStyles}>
        <Box sx={headerContainerStyles}>
          <Box sx={leftSectionStyles}>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"}
              component="h3"
              sx={titleStyles}
            >
              {place.place_name}
            </Typography>
            <Box sx={categoryContainerStyles}>
              {activeTab === '맛집' ? (
                <RestaurantIcon sx={iconStyles} />
              ) : (
                <LocalCafeIcon sx={iconStyles} />
              )}
              <Typography 
                variant="body2" 
                sx={categoryTextStyles}
              >
                {place.category_name}
              </Typography>
            </Box>
          </Box>
          <Box sx={ratingContainerStyles}>
            <Chip
              label={place.category_group_name}
              size="small"
              variant="outlined"
              sx={chipStyles}
            />
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={descriptionStyles}
        >
          {place.road_address_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendPlaceCard;