import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { getLineColor, STATION_CONFIG } from '../../../../shared/config/stationConfig';
import type { StationData, StationResponse } from '../../../../shared/models/station';

// Styled Components
const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    backgroundColor: '#f8f9fa',
    border: 'none',
    '& fieldset': {
      border: '1px solid rgba(0,0,0,0.06)',
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.primary.light}`,
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '14px 16px',
  },
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px',
      fontSize: '0.9rem',
    },
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: '0.85rem',
    },
  },
}));

const SearchResultCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  marginBottom: theme.spacing(1.5),
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: '#f8f9ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(108, 92, 231, 0.12)'
  },
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
    borderRadius: '10px',
    '&:hover': {
      transform: 'translateY(-1px)', // 모바일에서는 더 적은 움직임
      boxShadow: '0 4px 15px rgba(108, 92, 231, 0.1)',
    },
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    marginBottom: theme.spacing(0.8),
    borderRadius: '8px',
  },
}));

const SearchCardContent = styled(CardContent)(({ theme }) => ({
  padding: '16px 20px !important',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: '12px 16px !important',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: '10px 14px !important',
  },
}));

const LineChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: 22,
  borderRadius: '11px',
  backgroundColor: 'rgba(108, 92, 231, 0.08)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(108, 92, 231, 0.12)',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500
  },
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
    height: 20,
    borderRadius: '10px',
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.6rem',
    height: 18,
    borderRadius: '9px',
    '& .MuiChip-label': {
      padding: '0 5px',
    },
  },
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 2),
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.06)',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1.5),
    borderRadius: '10px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(2.5, 1),
    borderRadius: '8px',
  },
}));

const SearchResultsContainer = styled(Box)(({ theme }) => ({
  // 모바일에서 검색 결과 간격 조정
  [theme.breakpoints.down('sm')]: {
    '& > *:last-child': {
      marginBottom: 0,
    },
  },
}));

const StationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
  
  // 모바일에서 레이아웃 조정
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    marginBottom: theme.spacing(0.8),
    gap: theme.spacing(1),
  },
  
  // 아이폰 SE에서 더 컴팩트하게
  '@media (max-width: 375px)': {
    marginBottom: theme.spacing(0.6),
    gap: theme.spacing(0.8),
  },
}));

const StationName = styled(Typography)(({ theme }) => ({
  // 모바일에서 폰트 크기 조정
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem !important',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.95rem !important',
  },
}));

const StationDetails = styled(Typography)(({ theme }) => ({
  // 모바일에서 폰트 크기 조정
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem !important',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.75rem !important',
  },
}));

const MoreResultsText = styled(Typography)(({ theme }) => ({
  // 모바일에서 폰트 크기 및 여백 조정
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem !important',
    marginTop: theme.spacing(1.5) + ' !important',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.75rem !important',
    marginTop: theme.spacing(1) + ' !important',
  },
}));

// Props 인터페이스
interface StationSearchProps {
  onStationSelect: (stationName: string) => void;
  placeholder?: string;
  maxResults?: number;
}

const recommendStationSearch: React.FC<StationSearchProps> = ({
  onStationSelect,
  placeholder = "지하철역 이름을 검색해보세요",
  maxResults = 10
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StationData[]>([]);

  // 검색 기능
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // stationConfig의 DATA에서 검색
    const filtered = STATION_CONFIG.DATA.filter((station: StationData) =>
      station.station_nm.includes(query) ||
      station.line_num.includes(query) ||
      station.fr_code.includes(query)
    ).slice(0, maxResults); // 결과 개수 제한
    
    setSearchResults(filtered);
  };

  return (
    <Box>
      {/* 검색 입력 */}
      <SearchTextField
        fullWidth
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ 
            mr: 1.5, 
            color: 'action.active',
            // 모바일에서 아이콘 크기 조정
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }} />
        }}
        sx={{ 
          mb: { xs: 2, sm: 3 } // 모바일에서 여백 조정
        }}
      />

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <SearchResultsContainer>
          {searchResults.map((station) => (
            <SearchResultCard 
              key={`${station.station_cd}-${station.line_num}`}
              onClick={() => onStationSelect(station.station_nm)}
            >
              <SearchCardContent>
                <StationHeader>
                  <StationName variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', flex: 1 }}>
                    {station.station_nm}
                  </StationName>
                  <LineChip 
                    label={station.line_num}
                    size="small"
                    sx={{ 
                      backgroundColor: `${getLineColor(station.line_num)}15`,
                      color: getLineColor(station.line_num),
                      border: `1px solid ${getLineColor(station.line_num)}30`,
                      flexShrink: 0,
                    }}
                  />
                </StationHeader>
                <StationDetails variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  역코드: {station.station_cd} | 외부코드: {station.fr_code}
                </StationDetails>
              </SearchCardContent>
            </SearchResultCard>
          ))}
          
          {/* 더 많은 결과가 있을 때 안내 */}
          {STATION_CONFIG.DATA.filter((station: StationData) =>
            station.station_nm.includes(searchQuery) ||
            station.line_num.includes(searchQuery) ||
            station.fr_code.includes(searchQuery)
          ).length > maxResults && (
            <MoreResultsText variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              더 많은 결과가 있습니다. 검색어를 더 구체적으로 입력해보세요.
            </MoreResultsText>
          )}
        </SearchResultsContainer>
      )}

      {/* 검색했지만 결과가 없을 때 */}
      {searchQuery.trim() !== '' && searchResults.length === 0 && (
        <EmptyStateBox>
          <Typography 
            color="text.secondary" 
            sx={{ 
              fontSize: { xs: '0.85rem', sm: '0.95rem' }, // 모바일에서 폰트 크기 조정
              lineHeight: 1.5,
            }}
          >
            "{searchQuery}"에 대한 검색 결과가 없습니다.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mt: 1, 
              fontSize: { xs: '0.8rem', sm: '0.85rem' }, // 모바일에서 폰트 크기 조정
              lineHeight: 1.4,
            }}
          >
            역명, 호선명, 또는 역코드로 검색해보세요.
          </Typography>
        </EmptyStateBox>
      )}
    </Box>
  );
};

export default recommendStationSearch;