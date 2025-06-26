import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { RecommendSideBar } from '../../store/store';
import places from '../../apis/api';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  }
}));

const recommendResultSideBar: React.FC = () => {
  const { 
    data, 
    setRestaurants, 
    setCafes, 
    setLoadingRestaurants, 
    setLoadingCafes 
  } = RecommendSideBar();
  
  const [activeTab, setActiveTab] = useState(0);
  
  const { 
    selectedPlace, 
    restaurants = [], 
    cafes = [], 
    isLoadingRestaurants = false,
    isLoadingCafes = false 
  } = data;

  // 선택된 장소가 변경될 때마다 맛집/카페 검색
  useEffect(() => {
    if (selectedPlace) {
      searchRestaurants();
      searchCafes();
    }
  }, [selectedPlace]);

  const searchRestaurants = async () => {
    if (!selectedPlace) return;
    
    setLoadingRestaurants(true);
    try {
      const results = await places(selectedPlace.name, '맛집');
      setRestaurants(results);
    } catch (error) {
      console.error('맛집 검색 실패:', error);
      setRestaurants([]);
    } finally {
      setLoadingRestaurants(false);
    }
  };

  const searchCafes = async () => {
    if (!selectedPlace) return;
    
    setLoadingCafes(true);
    try {
      const results = await places(selectedPlace.name, '카페');
      setCafes(results);
    } catch (error) {
      console.error('카페 검색 실패:', error);
      setCafes([]);
    } finally {
      setLoadingCafes(false);
    }
  };

  const handlePlaceClick = (place: any) => {
    // 장소 클릭시 상세 정보 표시 또는 지도에 표시
    window.open(place.place_url, '_blank');
  };

  if (!selectedPlace) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          장소를 선택하면 주변 맛집과 카페를 보여드려요!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 선택된 장소 정보 */}
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" gutterBottom>
          {selectedPlace.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedPlace.address}
        </Typography>
        <Chip 
          label={selectedPlace.category || '장소'} 
          size="small" 
          sx={{ mt: 1 }} 
        />
      </Box>

      {/* 탭 */}
      <Tabs 
        value={activeTab} 
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: '1px solid #eee' }}
      >
        <Tab label={`맛집 (${restaurants.length})`} />
        <Tab label={`카페 (${cafes.length})`} />
      </Tabs>

      {/* 콘텐츠 영역 */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {/* 맛집 탭 */}
        {activeTab === 0 && (
          <Box>
            {isLoadingRestaurants ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <StyledCard key={restaurant.id || index} onClick={() => handlePlaceClick(restaurant)}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {restaurant.place_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {restaurant.category_name.split(' > ').pop()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {restaurant.address_name}
                    </Typography>
                    {restaurant.phone && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        📞 {restaurant.phone}
                      </Typography>
                    )}
                  </CardContent>
                </StyledCard>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography color="text.secondary">
                  주변 맛집을 찾을 수 없어요
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* 카페 탭 */}
        {activeTab === 1 && (
          <Box>
            {isLoadingCafes ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : cafes.length > 0 ? (
              cafes.map((cafe, index) => (
                <StyledCard key={cafe.id || index} onClick={() => handlePlaceClick(cafe)}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {cafe.place_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {cafe.category_name.split(' > ').pop()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cafe.address_name}
                    </Typography>
                    {cafe.phone && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        📞 {cafe.phone}
                      </Typography>
                    )}
                  </CardContent>
                </StyledCard>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography color="text.secondary">
                  주변 카페를 찾을 수 없어요
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default recommendResultSideBar;