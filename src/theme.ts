import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
        },
      },
    },
  },
});

export default theme;
