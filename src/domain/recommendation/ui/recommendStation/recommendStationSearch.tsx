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
import type { RECOMMEND_SUBWAY_STATIONS } from '../../models/model';

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

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.8),
  justifyContent: 'flex-start',
  flexWrap: 'wrap'
}));

const StationTag = styled(Chip)(({ theme }) => ({
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
  stations: RECOMMEND_SUBWAY_STATIONS;
  onStationSelect: (stationName: string) => void;
  placeholder?: string;
}

const StationSearch: React.FC<StationSearchProps> = ({
  stations,
  onStationSelect,
  placeholder = "지하철역 이름을 검색해보세요"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RECOMMEND_SUBWAY_STATIONS>([]);

  // 검색 기능
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = stations.filter(station =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.description.toLowerCase().includes(query.toLowerCase()) ||
      station.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
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
          startAdornment: <SearchIcon sx={{ mr: 1.5, color: 'action.active' }} />
        }}
        sx={{ mb: 3 }}
      />

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <Box>
          {searchResults.map((station) => (
            <SearchResultCard 
              key={station.name}
              onClick={() => onStationSelect(station.name)}
            >
              <SearchCardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1.1rem' }}>
                  {station.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.5 }}>
                  {station.description}
                </Typography>
                <TagsContainer>
                  {station.tags.map((tag, index) => (
                    <StationTag 
                      key={index}
                      label={tag}
                      size="small"
                    />
                  ))}
                </TagsContainer>
              </SearchCardContent>
            </SearchResultCard>
          ))}
        </Box>
      )}

      {/* 검색했지만 결과가 없을 때 */}
      {searchQuery.trim() !== '' && searchResults.length === 0 && (
        <EmptyStateBox>
          <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
            "{searchQuery}"에 대한 검색 결과가 없습니다.
          </Typography>
        </EmptyStateBox>
      )}
    </Box>
  );
};

export default StationSearch;