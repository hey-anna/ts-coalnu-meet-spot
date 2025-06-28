import React from 'react';
import { Box, Button, Container, styled, Typography, useTheme } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';

// 스타일 변수
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  py: { xs: 4, sm: 8 },
  px: { xs: 2, sm: 4 }
};

const errorNumberStyle = {
  fontSize: { xs: '3rem', sm: '4rem', md: '4rem' },
  fontWeight: 900,
  lineHeight: 1,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 4px 8px rgba(0,0,0,0.1)',
  mb: 2
};

const titleStyle = {
  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
  fontWeight: 700,
  color: '#333',
  mb: 2
};

const descriptionStyle = {
  fontSize: { xs: '0.8rem', sm: '1.125rem' },
  color: 'text.secondary',
  mb: 4,
  maxWidth: '600px',
  lineHeight: 1.6
};

const buttonContainerStyle = {
  display: 'flex',
  gap: 2,
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'center',
  alignItems: 'center'
};

const primaryButtonStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  px: 4,
  py: 1.5,
  borderRadius: 3,
  fontWeight: 600,
  fontSize: { xs: '0.875rem', sm: '1rem' },
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
    transform: 'translateY(-1px)'
  },
  transition: 'all 0.3s ease'
};

const secondaryButtonStyle = {
  color: 'primary.main',
  borderColor: 'primary.main',
  px: 4,
  py: 1.5,
  borderRadius: 3,
  fontWeight: 600,
  fontSize: { xs: '0.875rem', sm: '1rem' },
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'white',
    transform: 'translateY(-1px)'
  },
  transition: 'all 0.3s ease'
};

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end', // 하단 정렬
  cursor: 'pointer',
  gap: '12px',
  padding: '20px',
});

const LogoImage = styled('img')({
  height: '40px',
  width: 'auto',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '16px', // 크기 조금 줄임
  fontWeight: 600,
  color: theme.palette.primary.main,
  letterSpacing: '-0.3px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  transition: 'all 0.3s ease-in-out',
  textAlign: 'center',
  whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg" sx={containerStyle}>
      {/* 일러스트레이션 */}
    <LogoContainer onClick={handleGoHome}>
        <LogoImage src="/meetspot_logo_font.png" alt="MeetSpot Logo" />
        <LogoText>어디서 만날까?</LogoText>
    </LogoContainer>

      {/* 404 숫자 */}
      <Typography sx={errorNumberStyle}>
        404
      </Typography>

      {/* 제목 */}
      <Typography sx={titleStyle}>
        길을 잃으셨나요?
      </Typography>

      {/* 설명 */}
      <Typography sx={descriptionStyle}>
        죄송합니다. 찾으시는 페이지를 찾을 수 없습니다.<br />
        페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.<br />
        아래 버튼을 통해 다시 길을 찾아보세요!
      </Typography>

      {/* 버튼들 */}
      <Box sx={buttonContainerStyle}>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={handleGoHome}
          sx={primaryButtonStyle}
          size="large"
        >
          홈으로 가기
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={secondaryButtonStyle}
          size="large"
        >
          이전 페이지로
        </Button>
      </Box>

      {/* 추가 도움말 */}
      <Box sx={{ mt: 6, opacity: 0.7 }}>
        <Typography variant="body2" color="text.secondary">
          계속 문제가 발생한다면{' '}
          <Typography 
            component="span" 
            color="primary.main" 
            sx={{ 
              cursor: 'pointer',
              textDecoration: 'underline',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => window.location.reload()}
          >
            페이지를 새로고침
          </Typography>
          {' '}해보세요.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;