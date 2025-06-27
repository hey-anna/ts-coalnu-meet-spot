import { Box, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { MemberSettingGroupModal } from '../memberSettingGroupModal/MemberSettingGroupModal';
import AddFriendsForm from '../addFriendsForm/addFriendsForm';

const MemberCardBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px dashed rgba(0,0,0,0.08)',
  borderRadius: '12px',
  padding: '16px 12px',
  textAlign: 'center',
  background: '#ffffff',
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(108, 92, 231, 0.15)',
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

export const MemberSettingAddArea = () => {
  const itemNames = ['그룹 추가하기', '친구 추가하기'];
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isFreindModalOpen, setIsFriendModalOpen] = useState(false);
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gridTemplateRows: '1fr 1fr',
        gap: 2,
      }}
    >
      {itemNames.map((name, idx) => (
        <MemberCardBox
          key={idx}
          onClick={() => {
            console.log(name);
            if (name === '그룹 추가하기') {
              setIsGroupModalOpen(true);
              setIsFriendModalOpen(false);
            } else {
              setIsFriendModalOpen(true);
              setIsGroupModalOpen(false);
            }
          }}
        >
          <Typography>{name}</Typography>
        </MemberCardBox>
      ))}

      {isGroupModalOpen && (
        <MemberSettingGroupModal onClose={() => setIsGroupModalOpen(false)} />
      )}

      {isFreindModalOpen && (
        <AddFriendsForm onClose={() => setIsFriendModalOpen(false)} />
      )}
    </Box>
  );
};
