import AddFriendLocationCard from '@/domain/user/ui/addFriendsLocation/addFriendsLocation';
import { Box } from '@mui/material';

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
      <AddFriendLocationCard />
    </Box>
  );
};

export default TestPage;
