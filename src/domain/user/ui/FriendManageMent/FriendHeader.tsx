import { Box, Button, Typography } from '@mui/material';
import {
  Add as AddIcon,
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import theme from '@/styles/mui/theme';

export const FriendHeader = ({ setGroupDialogOpen, setFriendDialogOpen }) => {
  return (
    <Box sx={headerStyle}>
      <Typography sx={titleStyle}>
        <GroupIcon fontSize="large" />
        친구 그룹 관리
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setGroupDialogOpen(true)}
        >
          그룹 생성
        </Button>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={() => setFriendDialogOpen(true)}
        >
          친구 추가
        </Button>
      </Box>
    </Box>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
  padding: 3,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};
