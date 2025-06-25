import { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AddFriendsGroupForm from '../addFriendsGroupForm/addFriendsGroupForm';

export default function AddFriendLocationCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);

  // 주석

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'custom.borderLight',
        borderRadius: 2,
        p: 2,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        width: isMobile ? '100%' : 'auto',
        gap: 2,
        '&:hover': {
          backgroundColor: 'custom.bgHover',
        },
        minWidth: 300,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          친구 추가
        </Typography>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            backgroundColor: '#F54774',
            fontSize: 12,
          }}
        >
          <PeopleIcon fontSize="inherit" />
        </Avatar>
      </Stack>

      <Button
        onClick={() => setIsOpen(true)}
        fullWidth={true}
        variant="outlined"
        sx={{
          backgroundColor: '#667eea',
          border: '1px dashed',
          color: '#fff',
          borderColor: '#C39BF6',
          borderStyle: 'dashed',
          '&:hover': {
            backgroundColor: '#5a63e0',
          },
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 2,
        }}
      >
        '위치 추가 하기'
      </Button>

      {!isMobile && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '13px',
            backgroundColor: '#f8f9fa',
            padding: '8px 12px',
            borderRadius: '8px',
            marginTop: '4px',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          친구들의 위치를 추가하면
          <br />
          최적의 중간 지점을 찾아드려요!
        </Typography>
      )}

      {isOpen && <AddFriendsGroupForm onClose={() => setIsOpen(false)} />}
    </Box>
  );
}
