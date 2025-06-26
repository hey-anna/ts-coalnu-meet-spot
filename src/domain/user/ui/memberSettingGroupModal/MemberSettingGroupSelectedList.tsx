// MemberSettingGroupSelectedList.tsx
import { Box, Button, Chip, Paper, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { FriendInfo } from '../../models/model';

const SelectedStationsBox = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
}));

const SelectedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  margin: theme.spacing(0.4),
  borderRadius: '12px',
  height: 32,
  fontSize: '0.85rem',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '18px',
    '&:hover': {
      color: 'white',
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '14px',
  padding: theme.spacing(1.5, 3),
  fontSize: '0.95rem',
  fontWeight: 600,
  minWidth: 110,
  height: 48,
}));

export interface MemberSettingGroupSelectedListProps {
  selectedFriends: FriendInfo[];
  handleRemoveFriend: (freindName: string, friendPosition: string) => void;
  handleClearAllFriends: () => void;
}

export const MemberSettingGroupSelectedList: React.FC<
  MemberSettingGroupSelectedListProps
> = ({ selectedFriends, handleRemoveFriend, handleClearAllFriends }) => {
  if (!selectedFriends.length) return null;
  return (
    <SelectedStationsBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
          선택된 친구 목록
        </Typography>
        <ActionButton
          variant="outlined"
          size="small"
          onClick={handleClearAllFriends}
          sx={{
            minWidth: 'auto',
            px: 2,
            py: 0.5,
            fontSize: '0.875rem',
          }}
        >
          전체 삭제
        </ActionButton>
      </Box>
      <Box>
        {selectedFriends.map((selectedFriend) => (
          <SelectedChip
            key={selectedFriend.name}
            label={`🚇 ${selectedFriend.name}`}
            onDelete={() =>
              handleRemoveFriend(
                selectedFriend.name,
                selectedFriend.start_station,
              )
            }
            deleteIcon={<CloseIcon />}
          />
        ))}
      </Box>
    </SelectedStationsBox>
  );
};
