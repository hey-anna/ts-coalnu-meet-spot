import type { Dispatch, SetStateAction } from 'react';
import { Box, Button, Tooltip } from '@mui/material';

interface FriendGroupListProps {
  groups: string[];
  isCreatingGroup: boolean;
  setIsCreatingGroup: Dispatch<SetStateAction<boolean>>;
  selectedGroup: string | null;
  setSelectedGroup: Dispatch<SetStateAction<string | null>>;
}

export const GroupManagerGroupList = ({
  groups,
  isCreatingGroup,
  setIsCreatingGroup,
  selectedGroup,
  setSelectedGroup,
}: FriendGroupListProps) => {
  return (
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
      <Button
        variant="outlined"
        sx={{
          borderStyle: 'dashed',
          borderRadius: 20,
          color: isCreatingGroup ? 'white ' : '#999',
          height: 40,
          backgroundColor: isCreatingGroup ? 'user.main' : undefined,
          width: '30%',
        }}
        onClick={() => {
          setIsCreatingGroup((prev) => !prev);
          setSelectedGroup(null);
        }}
      >
        새 그룹
      </Button>

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
                setIsCreatingGroup(false);
                setSelectedGroup((prev) =>
                  prev === groupName ? null : groupName,
                );
              }}
            >
              {displayName}
            </Button>
          </Tooltip>
        );
      })}
    </Box>
  );
};
