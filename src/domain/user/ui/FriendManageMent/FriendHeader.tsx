import { Box, Button, Typography } from '@mui/material';
import {
  Add as AddIcon,
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import theme from '@/styles/mui/theme';
import { styled } from '@mui/material/styles';

// Styled Components
const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '100%',
  margin: `0 0 ${theme.spacing(4)} 0`,
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    margin: `0 0 ${theme.spacing(3)} 0`,
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    margin: `0 0 ${theme.spacing(2)} 0`,
  },
}));

const TitleContainer = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center',
    gap: theme.spacing(0.8),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '1.3rem',
    gap: theme.spacing(0.6),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(1.5),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: theme.spacing(1.2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2),
    fontSize: '0.9rem',
    minHeight: '44px', // 터치하기 쉬운 크기
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.2, 1.8),
    fontSize: '0.85rem',
    minHeight: '40px',
  },
}));

export const FriendHeader = ({ setGroupDialogOpen, setFriendDialogOpen }) => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <GroupIcon sx={{ 
          fontSize: { xs: '1.8rem', sm: '2.5rem' }, // 모바일에서 아이콘 크기 조정
          '@media (max-width: 375px)': { fontSize: '1.6rem' }
        }} />
        친구 그룹 관리
      </TitleContainer>
      <ButtonContainer>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setGroupDialogOpen(true)}
          fullWidth={false} // 모바일에서는 fullWidth가 자동 적용됨
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          그룹 생성
        </StyledButton>
        <StyledButton
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={() => setFriendDialogOpen(true)}
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          친구 추가
        </StyledButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};