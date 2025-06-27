import type { Group } from '@/domain/user/models/model';
import { Box, Button, Typography } from '@mui/material';

export interface AddFriendsGroupListProps {
  groups: Group[];
  setSelectedGroup: (group: Group) => void;
  selectedGroup?: Group;
}

export const AddFriendsGroupList: React.FC<AddFriendsGroupListProps> = ({
  groups,
  setSelectedGroup,
  selectedGroup,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1,
      }}
    >
      <Typography
        variant="subtitle2"
        color="text.primary"
        sx={{ fontWeight: 600 }}
      >
        친구 그룹 목록
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 1.5,
        }}
      >
        {groups.map((group) => {
          const isSelected = selectedGroup?.id === group.id;
          return (
            <Button
              key={group.id}
              variant={isSelected ? 'contained' : 'outlined'}
              onClick={() => setSelectedGroup(group)}
              sx={{
                borderRadius: 20,
                height: 40,
                // selected 시 색상
                backgroundColor: isSelected ? 'primary.main' : 'transparent',
                color: isSelected ? '#fff' : 'text.primary',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: isSelected
                    ? 'primary.dark'
                    : 'rgba(102, 126, 234, 0.1)',
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: isSelected
                    ? '0 6px 20px rgba(108, 92, 231, 0.35)'
                    : undefined,
                },
              }}
            >
              {group.group_name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
