import { MemberSettingWidget } from '@/domain/user/ui/memberSettingWidget/MemberSettingWidget';
import { Box } from '@mui/material';

// 주석

const TestPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        p: 2,
        boxSizing: 'border-box',
      }}
    >
      <MemberSettingWidget />
    </Box>
  );
};

export default TestPage;
