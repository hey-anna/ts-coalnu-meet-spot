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
      bgTertiary: '#fafbfc',
      bgHover: '#f0f3ff',
      borderLight: '#e1e5e9',
      borderMedium: '#e9ecef',
      infoBg: '#e7f3ff',
      warningBg: '#fff3cd',
      errorBg: '#ffe7e7',
      ratingBg: '#fff3cd',
    },
    user: {
      main: '#764ba2',
    },
  },
  components: {},
});

export default theme;
