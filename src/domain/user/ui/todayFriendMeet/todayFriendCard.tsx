import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const FriendCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>(({ theme, selected }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${selected ? theme.palette.custom.secondary : 'rgba(0,0,0,0.08)'}`,
  borderRadius: '12px',
  textAlign: 'center',
  background: selected 
    ? `linear-gradient(135deg, ${theme.palette.custom.secondary} 0%, ${theme.palette.primary.dark} 100%)`
    : '#ffffff',
  color: selected ? 'white' : theme.palette.text.primary,
  boxShadow: selected 
    ? `0 4px 16px rgba(108, 92, 231, 0.25)` 
    : '0 1px 3px rgba(0,0,0,0.1)',
  
  // 직사각형 비율로 변경 (가로가 세로보다 길게)
  aspectRatio: '3 / 2', // 가로:세로 = 3:2 비율
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 6px',
  
  '&:hover': {
    borderColor: theme.palette.custom.secondary,
    transform: 'translateY(-2px)',
    boxShadow: selected 
      ? `0 6px 20px rgba(108, 92, 231, 0.35)`
      : `0 4px 12px rgba(108, 92, 231, 0.15)`
  },
  
  // 반응형 패딩 조정
  [theme.breakpoints.down('md')]: {
    padding: '6px 5px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '5px 4px',
  }
}));

const FriendName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.9rem',
  marginBottom: theme.spacing(0.5),
  lineHeight: 1.1,
  textAlign: 'center',
  wordBreak: 'keep-all', // 한글 단어 깨짐 방지
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap', // 한 줄로 표시
  
  // 반응형 폰트 크기
  [theme.breakpoints.down('md')]: {
    fontSize: '0.85rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(0.3),
  }
}));


const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  padding: 5,
  width: '100%',
  
  // 반응형 그리드 설정
  gridTemplateColumns: 'repeat(4, 1fr)', // 데스크톱: 4열
  gridTemplateRows: 'repeat(2, 1fr)', // 2행으로 고정 (4×2 = 8개)
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)', // 태블릿: 3열
    gridTemplateRows: 'repeat(3, 1fr)', // 3행 (3×3 = 9개, 8개만 표시)
    gap: theme.spacing(0.8),
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // 모바일: 2열
    gridTemplateRows: 'repeat(2, 1fr)', // 2행 (2×2 = 4개)
    gap: theme.spacing(0.6),
  },
  
  // 모든 카드가 같은 높이를 갖도록 보장
  '& > *': {
    height: '100%',
  }
}));

// Props 인터페이스
interface FriendCardProps {
  friendGroups: string[];
  selectedFriends: string[];
  onFriendSelect: (stationName: string) => void;
}

const todayFriendCard: React.FC<FriendCardProps> = ({
  friendGroups,
  selectedFriends,
  onFriendSelect
}) => {
  return (
    <GridContainer>
      {friendGroups.map((friendGroup) => (
        <FriendCard 
          key={friendGroup}
          selected={selectedFriends.includes(friendGroup)}
          onClick={() => onFriendSelect(friendGroup)}
        >
          <FriendName>
            {friendGroup}
          </FriendName>
        </FriendCard>
      ))}
    </GridContainer>
  );
};

export default todayFriendCard;