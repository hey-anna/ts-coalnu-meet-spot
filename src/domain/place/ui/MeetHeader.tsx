import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        py: 4,
        borderRadius: 2,
        mb: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🎯 최적 만남 장소
      </Typography>
      <Typography variant="subtitle1">
        친구들이 만나기 가장 좋은 장소를 찾았어요!
      </Typography>
    </Box>
  );
};

export default Header;
