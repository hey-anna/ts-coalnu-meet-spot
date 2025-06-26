import {
  Box,
  Typography,
} from '@mui/material';
import type { RECOMMEND_SUBWAY_STATIONS } from "../../models/model";
import RecommendListItem from "./recommendListItem";
import type { PlaceData } from '../../../../shared/config/config';
import { useEffect, useState } from 'react';
import places from '../../apis/api';

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

const emptyStyle = {
  fontSize: '13px',
  color: '#999',
  textAlign: 'center',
  padding: '20px 0'
};

type SubwayStation = RECOMMEND_SUBWAY_STATIONS[0];

const RecommendList = ({ randomStation }: { randomStation: SubwayStation }) => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<PlaceData[]>([]);
  const [cafes, setCafes] = useState<PlaceData[]>([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
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
  return (
    <>
      {/* 추천 맛집 섹션 */}
      <Box sx={sectionStyle}>
        <Typography sx={sectionTitleStyle}>
          🍽️ 추천 맛집
        </Typography>
        
        {restaurants.length > 0 ? (
          restaurants.slice(0, 3).map((restaurant, index) => (
            <RecommendListItem 
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
            <RecommendListItem 
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
    </>
  );
};

export default RecommendList;