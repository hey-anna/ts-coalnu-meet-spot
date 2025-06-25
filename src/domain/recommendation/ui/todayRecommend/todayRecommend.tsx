import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { getRandomStation } from "../../hooks/hook";
import theme from "../../../../styles/mui/theme";
import type { RECOMMEND_SUBWAY_STATIONS } from "../../models/model";
import { Box, Chip, Container, Typography } from "@mui/material";
import RecommendList from "./recommendList";

const containerStyle = {
  padding: '16px',
  maxWidth: '300px'
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
const loadingStyle = {
  textAlign: 'center',
  padding: '40px',
  color: '#666'
};


type SubwayStation = RECOMMEND_SUBWAY_STATIONS[0];

const todayRecommend = () => {
    const [currentStation, setCurrentStation] = useState<SubwayStation | null>(null);    
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          setLoading(true);
          const randomStation = getRandomStation();
          setCurrentStation(randomStation);
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
          <RecommendList randomStation={currentStation}/>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default todayRecommend;
