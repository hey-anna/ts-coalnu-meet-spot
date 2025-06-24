import { Box } from '@mui/material';
import FriendLocationCard from '../../domain/user/ui/addFriendsLocation/addFriendsLocation';

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
      <FriendLocationCard />
    </Box>
  );
};

export default TestPage;
