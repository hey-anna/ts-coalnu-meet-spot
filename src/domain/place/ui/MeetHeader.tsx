import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        py: 2, // 패딩 줄임
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
        🎯 최적 만남 장소
      </Typography>
      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
        친구들이 만나기 가장 좋은 장소를 찾았어요!
      </Typography>
    </Box>
  );
};

export default Header;
