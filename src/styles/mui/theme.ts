import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6c5ce7',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    warning: {
      main: '#ffc107',
    },
    error: {
      main: '#cc0000',
    },
    info: {
      main: '#0066cc',
    },
    custom: {
      secondary:'#d63384',
      bgTertiary: '#fafbfc',
      bgHover: '#f0f3ff',
      borderLight: '#e1e5e9',
      borderMedium: '#e9ecef',
      infoBg: '#e7f3ff',
      warningBg: '#fff3cd',
      errorBg: '#ffe7e7',
      ratingBg: '#fff3cd',
      restaurant: '#ff6b6b',     // 맛집 전용 색상
      cafe: '#667eea',          // 카페 전용 색상 
      restaurantLight: '#fadbd8', // 맛집 연한 배경
      cafeLight: '#d6eaf8',       // 카페 연한 배경
      success: '#28a745',       // 성공 상태
      successBg: '#d4edda',     // 성공 배경
      neutral: '#6c757d',       // 중성 색상
      shadowLight: 'rgba(0,0,0,0.08)',  // 가벼운 그림자
      shadowMedium: 'rgba(0,0,0,0.12)', // 중간 그림자
    },
    user: {
      main: '#764ba2',
    },
  },
  components: {},
});

export default theme;
