import { Box, Button, Tooltip, Typography } from '@mui/material';

export const AddFriendsGroupList = ({
  groups,
  setSelectedGroup,
  selectedGroup,
}: {
  groups: string[];
  setSelectedGroup: (groupName: string | null) => void;
  selectedGroup: string | null;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 4,
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          친구 그룹
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        sx={{
          maxHeight: 100,
          overflow: 'auto',
          flex: 4,
        }}
      >
        {groups.map((groupName, index) => {
          const displayName =
            groupName.length > 5 ? groupName.slice(0, 5) : groupName;

          return (
            <Tooltip key={`${index}-${groupName}`} title={displayName} arrow>
              <Button
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: 20,
                  height: 40,
                  width: '30%',
                  backgroundColor:
                    selectedGroup === groupName ? 'user.main' : undefined,
                  color: selectedGroup === groupName ? 'white ' : '#999',
                }}
                onClick={() => {
                  setSelectedGroup(groupName);
                }}
              >
                {displayName}
              </Button>
            </Tooltip>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
        <Typography variant="body2" color="text.primary" sx={{ flex: 1 }}>
          그룹을 선택하면 친구들을 쉽게 관리할 수 있어요
        </Typography>
      </Box>
    </Box>
  );
};
