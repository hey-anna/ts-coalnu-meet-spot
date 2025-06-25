import { Box, Button, InputBase } from '@mui/material';

export const GroupManagerCreateGroup = ({
  setCreateGroupName,
  addGroup,
}: {
  setCreateGroupName: (groupName: string) => void;
  addGroup: () => void;
}) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      sx={{
        boxSizing: 'border-box',
        marginTop: 2,
        flex: 1,
        gap: 1,
      }}
    >
      <InputBase
        onChange={(e) => setCreateGroupName(e.target.value)}
        placeholder="추가할 그룹의 이름을 입력하세요"
        sx={{
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          px: 2,
          py: 2,
          border: '1px solid',
          borderColor: 'grey.300',
          fontSize: 14,
          '&::placeholder': {
            color: 'text.secondary',
          },
          '&:hover': {
            backgroundColor: 'grey.100',
          },
          minHeight: 40,
          maxHeight: 40,
          flex: 5,
        }}
      />
      <Button
        sx={{
          display: 'flex',
          flex: 1,
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          fontWeight: 'bold',
          borderRadius: 2,
          '&:hover': {
            backgroundImage:
              'linear-gradient(135deg, #5a63e0 0%, #6c3b92 100%)',
          },
        }}
        onClick={() => {
          addGroup();
        }}
      >
        그룹 추가
      </Button>
    </Box>
  );
};
