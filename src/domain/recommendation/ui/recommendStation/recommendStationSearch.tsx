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
import { STATION_CONFIG } from '../../../../shared/config/stationConfig';
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
  }
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
  }
}));

const SearchCardContent = styled(CardContent)({
  padding: '16px 20px !important'
});

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
  }
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 2),
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.06)'
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

  // 호선별 색상 매핑 (선택사항)
  const getLineColor = (lineNum: string) => {
    const colors: { [key: string]: string } = {
      '01호선': '#0052A4',
      '02호선': '#00A84D',
      '03호선': '#EF7C1C',
      '04호선': '#00A5DE',
      '05호선': '#996CAC',
      '06호선': '#CD7C2F',
      '07호선': '#747F00',
      '08호선': '#E6186C',
      '09호선': '#BB8336',
      '경의선': '#77C4A3',
      '수인분당선': '#FFCD12',
      '신분당선': '#D4003B',
      '공항철도': '#0090D2',
      'GTX-A': '#9E4FC7'
    };
    return colors[lineNum] || '#666666';
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
          startAdornment: <SearchIcon sx={{ mr: 1.5, color: 'action.active' }} />
        }}
        sx={{ mb: 3 }}
      />

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <Box>
          {searchResults.map((station) => (
            <SearchResultCard 
              key={`${station.station_cd}-${station.line_num}`}
              onClick={() => onStationSelect(station.station_nm)}
            >
              <SearchCardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                    {station.station_nm}
                  </Typography>
                  <LineChip 
                    label={station.line_num}
                    size="small"
                    sx={{ 
                      backgroundColor: `${getLineColor(station.line_num)}15`,
                      color: getLineColor(station.line_num),
                      border: `1px solid ${getLineColor(station.line_num)}30`
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  역코드: {station.station_cd} | 외부코드: {station.fr_code}
                </Typography>
              </SearchCardContent>
            </SearchResultCard>
          ))}
          
          {/* 더 많은 결과가 있을 때 안내 */}
          {STATION_CONFIG.DATA.filter((station: StationData) =>
            station.station_nm.includes(searchQuery) ||
            station.line_num.includes(searchQuery) ||
            station.fr_code.includes(searchQuery)
          ).length > maxResults && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              더 많은 결과가 있습니다. 검색어를 더 구체적으로 입력해보세요.
            </Typography>
          )}
        </Box>
      )}

      {/* 검색했지만 결과가 없을 때 */}
      {searchQuery.trim() !== '' && searchResults.length === 0 && (
        <EmptyStateBox>
          <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
            "{searchQuery}"에 대한 검색 결과가 없습니다.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>
            역명, 호선명, 또는 역코드로 검색해보세요.
          </Typography>
        </EmptyStateBox>
      )}
    </Box>
  );
};

export default recommendStationSearch;