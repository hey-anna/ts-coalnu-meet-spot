import { useEffect, useState } from "react";
import places from "../../apis/api";
import {
  Box,
  Typography,
  Chip,
  Container
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { getRandomStation } from "../../hooks/hook";
import theme from "../../../../styles/mui/theme";
import type { RECOMMEND_SUBWAY_STATIONS } from "../../models/model";
import type { PlaceData } from "../../../../shared/config/config";
import RecommandListItem from "./recommandListItem";

const containerStyle = {
  padding: '16px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  maxWidth: '400px'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  border: '1px solid #f0f0f0'
};

const headerStyle = {
  marginBottom: '20px'
};

const headerTitleStyle = {
  fontSize: '16px',
  fontWeight: 600,
  color: '#333',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const placeCardStyle = {
  backgroundColor: '#f8f9ff',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '20px'
};

const stationNameStyle = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#6c5ce7',
  marginBottom: '6px'
};

const stationDescriptionStyle = {
  fontSize: '13px',
  color: '#666',
  marginBottom: '12px',
  lineHeight: 1.4
};

const tagsContainerStyle = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap'
};

const tagChipStyle = {
  backgroundColor: '#6c5ce7',
  color: '#fff',
  fontSize: '11px',
  height: '22px',
  borderRadius: '11px',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500
  }
};

const sectionStyle = {
  marginBottom: '24px'
};

const sectionTitleStyle = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '40px',
  color: '#666'
};

const emptyStyle = {
  fontSize: '13px',
  color: '#999',
  textAlign: 'center',
  padding: '20px 0'
};

type SubwayStation = RECOMMEND_SUBWAY_STATIONS[0];

const RecommandList = () => {
  const [currentStation, setCurrentStation] = useState<SubwayStation | null>(null);    
  const [restaurants, setRestaurants] = useState<PlaceData[]>([]);
  const [cafes, setCafes] = useState<PlaceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const randomStation = getRandomStation();
        setCurrentStation(randomStation);

        const [restaurantData, cafeData] = await Promise.all([
          places(randomStation.name, '맛집'),
          places(randomStation.name, '카페')
        ]);
        
        setRestaurants(restaurantData);
        setCafes(cafeData);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading || !currentStation) {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={containerStyle}>
          <Typography sx={loadingStyle}>로딩중...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={containerStyle}>
        <Box sx={cardStyle}>
          {/* 헤더 */}
          <Box sx={headerStyle}>
            <Typography sx={headerTitleStyle}>
              ⭐ 오늘의 추천 장소
            </Typography>
            
            {/* 추천 장소 카드 */}
            <Box sx={placeCardStyle}>
              <Typography sx={stationNameStyle}>
                {currentStation.name}
              </Typography>
              
              <Typography sx={stationDescriptionStyle}>
                {currentStation.description}
              </Typography>
              
              <Box sx={tagsContainerStyle}>
                {currentStation.tags.map((tag, index) => (
                  <Chip 
                    key={index}
                    label={tag} 
                    sx={tagChipStyle}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* 추천 맛집 섹션 */}
          <Box sx={sectionStyle}>
            <Typography sx={sectionTitleStyle}>
              🍽️ 추천 맛집
            </Typography>
            
            {restaurants.length > 0 ? (
              restaurants.slice(0, 3).map((restaurant, index) => (
                <RecommandListItem 
                  key={restaurant.id || index}
                  place={restaurant}
                />
              ))
            ) : (
              <Typography sx={emptyStyle}>
                맛집 정보가 없습니다
              </Typography>
            )}
          </Box>

          {/* 추천 카페 섹션 */}
          <Box sx={sectionStyle}>
            <Typography sx={sectionTitleStyle}>
              ☕ 추천 카페
            </Typography>
            
            {cafes.length > 0 ? (
              cafes.slice(0, 3).map((cafe, index) => (
                <RecommandListItem 
                  key={cafe.id || index}
                  place={cafe}
                />
              ))
            ) : (
              <Typography sx={emptyStyle}>
                카페 정보가 없습니다
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RecommandList;