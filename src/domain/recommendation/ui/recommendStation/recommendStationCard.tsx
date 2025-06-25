import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { RECOMMEND_SUBWAY_STATIONS } from '../../models/model';

// Styled Components
const StationCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>(({ theme, selected }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${selected ? theme.palette.primary.main : 'rgba(0,0,0,0.08)'}`,
  borderRadius: '12px',
  padding: '16px 12px', // 기본 패딩
  textAlign: 'center',
  background: selected 
    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
    : '#ffffff',
  color: selected ? 'white' : theme.palette.text.primary,
  boxShadow: selected 
    ? `0 4px 16px rgba(108, 92, 231, 0.25)` 
    : '0 1px 3px rgba(0,0,0,0.1)',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: selected 
      ? `0 6px 20px rgba(108, 92, 231, 0.35)`
      : `0 4px 12px rgba(108, 92, 231, 0.15)`
  },
  // 모바일에서 더 작은 패딩
  [theme.breakpoints.down('sm')]: {
    padding: '12px 8px',
  }
}));

const StationName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(1.2),
  lineHeight: 1.3,
  // 모바일에서 더 작은 폰트
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
    marginBottom: theme.spacing(1),
  }
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.8),
  justifyContent: 'center',
  flexWrap: 'wrap',
  // 모바일에서 더 작은 간격
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.5),
  }
}));

const StationTag = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>(({ theme, selected }) => ({
  fontSize: '0.7rem',
  height: 20,
  borderRadius: '10px',
  backgroundColor: selected 
    ? 'rgba(255, 255, 255, 0.25)' 
    : 'rgba(108, 92, 231, 0.08)',
  color: selected ? 'white' : theme.palette.primary.main,
  border: 'none',
  '& .MuiChip-label': {
    padding: '0 6px',
    fontWeight: 500
  },
  // 모바일에서 더 작은 태그
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
    height: 18,
    '& .MuiChip-label': {
      padding: '0 5px',
    }
  }
}));

// Props 인터페이스
interface StationCardGridProps {
  stations: RECOMMEND_SUBWAY_STATIONS;
  selectedStations: string[];
  onStationSelect: (stationName: string) => void;
}

const recommendStationCard: React.FC<StationCardGridProps> = ({
  stations,
  selectedStations,
  onStationSelect
}) => {
  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',  // 모바일에서 2열
          sm: 'repeat(3, 1fr)',  // 태블릿에서 3열  
          md: 'repeat(4, 1fr)'   // 데스크톱에서 4열
        },
        gap: 1.5,
        padding: 0
      }}
    >
      {stations.map((station) => (
        <StationCard 
          key={station.name}
          selected={selectedStations.includes(station.name)}
          onClick={() => onStationSelect(station.name)}
        >
          <StationName>
            {station.name}
          </StationName>
          <TagsContainer>
            {station.tags.map((tag, index) => (
              <StationTag 
                key={index}
                label={tag}
                size="small"
                selected={selectedStations.includes(station.name)}
              />
            ))}
          </TagsContainer>
        </StationCard>
      ))}
    </Box>
  );
};
export default recommendStationCard;