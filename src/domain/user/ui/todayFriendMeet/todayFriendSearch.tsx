import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { Friend } from '../../models/model';

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
      border: `2px solid ${theme.palette.custom.secondary}`,
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

const ClearButton = styled(IconButton)(({ theme }) => ({
  padding: '4px',
  color: 'rgba(0,0,0,0.4)',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.error.main,
    backgroundColor: 'rgba(244, 67, 54, 0.08)',
  },

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: '3px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: '2px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.1rem',
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
    borderColor: theme.palette.custom.secondary,
    backgroundColor: '#f8f9ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(108, 92, 231, 0.12)',
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
  color: theme.palette.custom.secondary,
  border: '1px solid rgba(108, 92, 231, 0.12)',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500,
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

const FriendInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  // 모바일에서 레이아웃 조정
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },

  // 아이폰 SE에서 더 컴팩트하게
  '@media (max-width: 375px)': {
    gap: theme.spacing(0.5),
  },
}));

const FriendDetails = styled(Box)({
  flex: 1,
});

const FriendLabel = styled(Typography)(({ theme }) => ({
  // 모바일에서 라벨 크기 조정
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.7rem',
  },
}));

// Props 인터페이스
interface FriendSearchProps {
  onFriendSelect: (friend: Friend) => void;
  placeholder?: string;
  maxResults?: number;
  friends: Friend[];
  selectedFriends: Friend[];
}

const TodayFriendSearch: React.FC<FriendSearchProps> = ({
  onFriendSelect,
  placeholder = '등록 하신 친구 이름을 검색해보세요',
  maxResults = 10,
  friends,
  selectedFriends,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Friend[]>([]);

  // 검색 기능
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = friends
      .filter((friend: Friend) =>
        friend.name.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, maxResults);

    setSearchResults(filtered);
  };

  // 검색어 초기화 함수
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
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
          startAdornment: (
            <SearchIcon
              sx={{
                mr: 1.5,
                color: 'action.active',
                // 모바일에서 아이콘 크기 조정
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            />
          ),
          endAdornment: searchQuery && ( // 검색어가 있을 때만 X 버튼 표시
            <ClearButton
              onClick={handleClearSearch}
              size="small"
              aria-label="검색어 지우기"
            >
              <ClearIcon />
            </ClearButton>
          ),
        }}
        sx={{
          mb: { xs: 2, sm: 3 }, // 모바일에서 여백 조정
        }}
      />

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <SearchResultsContainer>
          {searchResults.map((friend) => {
            return (
              <SearchResultCard
                key={friend.id}
                onClick={() => onFriendSelect(friend)}
              >
                <SearchCardContent>
                  <FriendInfoContainer>
                    <FriendDetails>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          fontSize: { xs: '1rem', sm: '1.1rem' }, // 모바일에서 폰트 크기 조정
                          lineHeight: 1.3,
                        }}
                      >
                        {friend.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.85rem' }, // 모바일에서 폰트 크기 조정
                          mt: 0.5,
                        }}
                      >
                        {friend.start_station}
                      </Typography>
                    </FriendDetails>
                    <FriendLabel variant="caption" color="text.secondary">
                      친구
                    </FriendLabel>
                  </FriendInfoContainer>
                </SearchCardContent>
              </SearchResultCard>
            );
          })}

          {/* 더 많은 결과가 있을 때 안내 */}
          {friends.filter((friend: Friend) =>
            friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).length > maxResults && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                mt: { xs: 1.5, sm: 2 }, // 모바일에서 여백 조정
                fontSize: { xs: '0.8rem', sm: '0.875rem' }, // 모바일에서 폰트 크기 조정
                px: 1, // 모바일에서 좌우 패딩 추가
              }}
            >
              더 많은 결과가 있습니다. 검색어를 더 구체적으로 입력해보세요.
            </Typography>
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
        </EmptyStateBox>
      )}
    </Box>
  );
};

export default TodayFriendSearch;
