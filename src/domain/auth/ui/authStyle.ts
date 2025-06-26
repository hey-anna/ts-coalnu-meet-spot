// authStyles.ts - Theme 기반 스타일
import { styled, Box, Button, Typography } from '@mui/material';

// 페이지 컨테이너
export const AuthPageContainer = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: theme.palette.background.default,
}));

// 폼 컨테이너
export const AuthFormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${theme.palette.custom.borderLight}`,
  transition: 'all 0.3s ease',
  
  // TextField 스타일
  '& .MuiTextField-root': {
    width: '100%',
  },
  
  '& .MuiTextField-root .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.custom.bgTertiary,
    transition: 'all 0.3s ease',
    
    '& fieldset': {
      borderColor: theme.palette.custom.borderMedium,
    },
    
    '&:hover': {
      backgroundColor: theme.palette.custom.bgHover,
      
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
    },
  },
  
  '& .MuiTextField-root .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
  
  '& .MuiTextField-root .MuiFormHelperText-root.Mui-error': {
    color: theme.palette.error.main,
    fontSize: '12px',
    marginTop: '4px',
  },
  
  // 반응형
  [theme.breakpoints.down('sm')]: {
    padding: '32px 24px',
    margin: '0 16px',
    maxWidth: 'none',
  },
  
  [theme.breakpoints.down(360)]: {
    padding: '24px 20px',
    margin: '0 12px',
  },
}));

// 타이틀
export const AuthTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px !important',
  fontWeight: '700 !important',
  textAlign: 'center',
  marginBottom: '8px !important',
  color: `${theme.palette.primary.main} !important`,
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px !important',
  },
  
  [theme.breakpoints.down(360)]: {
    fontSize: '22px !important',
  },
}));

// 버튼
export const AuthButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '14px 0',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  border: 'none',
  color: 'white',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  
  '&:hover': {
    backgroundColor: theme.palette.user.main,
    boxShadow: `0 2px 8px ${theme.palette.primary.main}50`, // 50은 투명도
  },
  
  '&:active': {
    transform: 'translateY(1px)',
  },
  
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
  
  // 로딩 상태
  '&.loading': {
    position: 'relative',
    color: 'transparent',
    
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '20px',
      height: '20px',
      margin: '-10px 0 0 -10px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  },
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

// 링크
export const AuthLink = styled(Typography)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  textDecoration: 'none !important',
  display: 'flex !important',
  alignItems: 'center !important',
  justifyContent: 'right !important',
  gap: '4px !important',
  fontWeight: '500 !important',
  fontSize: '14px !important',
  transition: 'all 0.3s ease !important',
  cursor: 'pointer !important',
  marginTop: '8px !important',
  
  '&:hover': {
    color: `${theme.palette.user.main} !important`,
    textDecoration: 'underline !important',
  },
}));

// 메시지 박스
export const AuthMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  textAlign: 'center',
  padding: '24px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.custom.borderMedium}`,
  backgroundColor: theme.palette.custom.bgTertiary,
  
  '&.success': {
    backgroundColor: '#d4edda',
    borderColor: '#4caf50',
    color: '#2e7d32',
  },
  
  '&.error': {
    backgroundColor: theme.palette.custom.errorBg,
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
}));